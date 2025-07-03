import { InlineEditor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { editorConfig } from './editor-config.js';

function initInlineEditor(element) {
    InlineEditor.create(element, editorConfig)
        .then(editor => {
            console.log('Inline Editor initialized:', editor);
        })
        .catch(err => {
            console.error(err);
        });
}

const targetNode = document.querySelector('#editor');

console.log('targetNode:',targetNode);

if (targetNode) {
    initInlineEditor(targetNode);
}


