import { DecoupledEditor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { editorConfig } from './editor-config.js';

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
const toolbarContainer = document.getElementById('toolbar');

console.log(targetNode);

if (targetNode) {
    initDecoupledEditor(targetNode, toolbarContainer);
}


