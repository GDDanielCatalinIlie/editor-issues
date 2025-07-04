import {
    Plugin,
    AlignmentEditing,
    AlignmentUI,
    Command,
    first,
} from 'ckeditor5';

/**
 * ExtendedAlignmentCommand
 *
 * This command adjusts block alignment by updating the model attribute "alignment"
 * for each selected block that supports it. It also refreshes its own value based on the
 * current selection and computed view styles.
 */
class ExtendedAlignmentCommand extends Command {
    refresh() {
        // If there's a pending requestAnimationFrame, cancel it.
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }

        const editor = this.editor;
        const view = editor.editing.view;
        
        // Retrieve the first selected block from the current selection.
        const firstBlock = first(editor.model.document.selection.getSelectedBlocks());
        const domConverter = editor.editing.view.domConverter;
        const viewElement = editor.editing.mapper.toViewElement(firstBlock);
        
        // The command is enabled if there is a block and it can accept an "alignment" attribute.
        this.isEnabled = !!firstBlock && this._canBeAligned(firstBlock);

        // If the block already has an alignment set, adopt that value.
        if (this.isEnabled && firstBlock.hasAttribute('alignment')) {
            this.value = firstBlock.getAttribute('alignment');
        } else {
            // Defer reading the computed style using requestAnimationFrame.
            // This ensures that DOM updates have been applied.
            this._rafId = requestAnimationFrame(() => {
                this._rafId = null;

                let domElement = null;

                if (viewElement) {
                    domElement = domConverter.mapViewToDom(viewElement);
                } else {
                    domElement = editor.editing.view.getDomRoot();
                }

                if (!domElement) {
                    return;
                }

                // Get computed text-align property from the DOM.
                const computedAlign = window.getComputedStyle(domElement).textAlign;
                const newValue = normalizeAlign(computedAlign, editor.locale);

                // If the computed alignment is different from the current value,
                // update the command value and notify any listeners.
                if (this.value !== newValue) {
                    this.value = newValue;
                    this.fire('change:value', newValue);
                }
            });
        }
    }

    /**
     * Executes the command to set the "alignment" attribute on all selected blocks.
     *
     * @param {Object} options - Options to signal the new alignment value.
     */
    execute(options = {}) {
        const model = this.editor.model;
        const selection = model.document.selection;
        const value = options.value;

        const domEditable = this.editor.editing.view.getDomRoot();
        const computedAlign = domEditable ? window.getComputedStyle(domEditable).textAlign : null;
        const inheritedAlign = normalizeAlign(computedAlign, this.editor.locale);

        model.change(writer => {
            // Apply the alignment attribute only if the block supports it.
            const blocks = Array.from(selection.getSelectedBlocks()).filter(block => this._canBeAligned(block));
            for (const block of blocks) {
                if (value === inheritedAlign) {
                    // Remove attribute if same as inherited
                    writer.removeAttribute('alignment', block);
                } else {
                    writer.setAttribute('alignment', value, block);
                }
            }
        });
    }


    /**
     * Checks whether a model block can be aligned
     * (i.e. if it supports the "alignment" attribute in the schema).
     *
     * @param {module:engine/model/element~Element} block
     * @returns {Boolean}
     */
    _canBeAligned(block) {
        return this.editor.model.schema.checkAttribute(block, 'alignment');
    }
}

/**
 * ExtendedAlignment registers a custom alignment command and converters for upcasting and downcasting.
 *
 * It extends CKEditor5 by explicitly:
 * - Mapping model "alignment" attribute changes to the corresponding view inline style.
 * - Enforcing the correct value on paste or any content with inline "text-align" style.
 */
export default class ExtendedAlignment extends Plugin {
    // Define required plugins.
    static get requires() {
        return [AlignmentEditing, AlignmentUI];
    }

    static get pluginName() {
        return 'Alignment';
    }

    init() {
        const editor = this.editor;
        const conversion = editor.conversion;
        const schema = editor.model.schema;

        // Allow alignment attribute on all blocks.
        schema.extend('$block', { allowAttributes: 'alignment' });
        editor.model.schema.setAttributeProperties('alignment', { isFormatting: true });

        /**
         * Downcast Converter:
         * In the downcast pipeline, the "alignment" attribute from the model is mapped
         * to an inline style on a view element.
         */
        conversion.for('downcast').attributeToAttribute({
            model: 'alignment',
            view: (modelValue) => {
                return {
                    key: 'style',
                    value: {
                        'text-align': modelValue
                    }
                };
            },
            converterPriority: 'highest'
        });

        /**
         * Upcast Converter:
         * In the upcast pipeline, any element with a "text-align" inline style is mapped back
         * to a model "alignment" attribute. This ensures that pasted content with a text-align
         * style (even if "left") properly updates the model.
         */
        conversion.for('upcast').elementToAttribute({
            view: {
                styles: {
                    'text-align': /.+/
                }
            },
            model: {
                key: 'alignment',
                value: viewElement => {
                    const align = viewElement.getStyle('text-align');

                    return normalizeAlign(align, this.editor.locale);
                }

            }
        });

        // Register the custom alignment command.
        const alignmentCommand = new ExtendedAlignmentCommand(this.editor);
        editor.commands.add('alignment', alignmentCommand);
    }
}

/**
 * Normalize the computed alignment.
 * Converts 'start' and 'end' values to 'left' or 'right'
 * according to the editor's language direction.
 * @param {String} align - The alignment value to normalize.
 * @returns {String} - Normalized alignment value ('left', 'right', 'center', 'justify').
 */
const normalizeAlign = (align, locale) => {
    if (align === 'start') {
        return locale.contentLanguageDirection === 'rtl' ? 'right' : 'left';
    }
    if (align === 'end') {
        return locale.contentLanguageDirection === 'rtl' ? 'left' : 'right';
    }
    return align;
};
