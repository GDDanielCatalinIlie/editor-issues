import { InlineEditor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { editorConfig } from './editor-config.js';

function initInlineEditor(element) {
    const config = editorConfig;

    if (window.frameElement && window.frameElement.hasAttribute('toolbar-wrap')) {
        console.log(window.frameElement)
        config.toolbar.shouldNotGroupWhenFull = false
    }

    InlineEditor.create(element, config)
        .then(editor => {
            console.log('Inline Editor initialized:', editor);
        })
        .catch(err => {
            console.error(err);
        });
}

// Select all elements with the class 'editor'
const editors = document.querySelectorAll('.editor');

// Loop through each and initialize CKEditor
editors.forEach((element) => {
    initInlineEditor(element);
});

