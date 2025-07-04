import { InlineEditor } from 'ckeditor5';
// import 'ckeditor5/ckeditor5.css';
import 'ckeditor5/ckeditor5-editor.css';

import { editorConfig } from './editor-config.js';
import { editorConfig as editorConfigFixed } from './editor-config-fixed-alignment.js';

function initInlineEditor(element) {
    InlineEditor.create(element, editorConfig)
        .then(editor => {
            console.log('Inline Editor initialized:', editor, element);
        })
        .catch(err => {
            console.error(err);
        });
}

function initInlineEditorFixed(element) {
    InlineEditor.create(element, editorConfigFixed)
        .then(editor => {
            console.log('Inline Editor initialized:', editor, element);
        })
        .catch(err => {
            console.error(err);
        });
}

// Select the target node for the inline editor
const targetNode = document.querySelector('#editor');

// Initialize the inline editor on the target node
if (targetNode) {
    initInlineEditor(targetNode);
}

// Select all elements with the class 'editor'
const editors = document.querySelectorAll('.editor-fixed');

// Loop through each and initialize CKEditor
editors.forEach((element) => {
    initInlineEditorFixed(element);
});