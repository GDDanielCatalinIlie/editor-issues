import { InlineEditor, DecoupledEditor } from 'ckeditor5';

import { editorConfig } from './editor-config.js';

import 'ckeditor5/ckeditor5.css';

function initCKEditor(element) {
    InlineEditor
        .create(element, editorConfig)
        .then(editor => {
            console.log('Editor initialized for:', element, editor);
        })
        .catch(error => {
            console.error('There was a problem initializing the editor:', error);
        });
}

function initDecoupledEditor(element, toolbarContainer) {
    DecoupledEditor.create(element, editorConfig)
        .then(editor => {
            console.log('Decoupled Editor initialized:', editor);
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        })
        .catch(err => {
            console.error(err);
        });
}

const iframe = document.getElementById('sectionFrame');
console.log('iframe:', iframe);

const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
const targetNode = iframeDoc.querySelector('#editor');
// const targetNode = document.querySelector('#editor');
const toolbarContainer = document.getElementById('toolbar');
console.log(targetNode);

if (targetNode) {
    // initCKEditor(targetNode);
    initDecoupledEditor(targetNode, toolbarContainer);
}


