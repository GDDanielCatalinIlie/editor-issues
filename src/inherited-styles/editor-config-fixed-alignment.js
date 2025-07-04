import {
    // Alignment,
    Autoformat,
    Bold,
    Essentials,
    Font,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    Italic,
    Paragraph,
    Strikethrough,
    Underline
} from 'ckeditor5';

import ExtendedAlignment from './ExtendedAlignment.js';

const LICENSE_KEY = 'GPL';

const editorConfig = {
    toolbar: {
        items: [
            'undo',
            'redo',
            '|',
            'bold', 'italic', 'underline', 'strikethrough',
            '|',
            'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
            '|',
            'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
            '|',
            'heading',
        ],
        shouldNotGroupWhenFull: false
    },
    plugins: [
        // Alignment,
        ExtendedAlignment, // Custom alignment plugin
        Autoformat,
        Bold,
        Font,
        Essentials,
        GeneralHtmlSupport,
        Heading,
        HorizontalLine,
        Italic,
        Paragraph,
        Strikethrough,
        Underline
    ],
    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3'
            },
            {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4'
            },
            {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5'
            },
            {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6'
            }
        ]
    },
    licenseKey: LICENSE_KEY,
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    fontSize: {
        options: [
            'default',
            12, 18, 20, 24, 26,
        ],
        supportAllValues: true
    },
};

export { editorConfig };