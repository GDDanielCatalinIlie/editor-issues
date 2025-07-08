import {
    Alignment,
    Autoformat,
    AutoLink,
    Bold,
    Emoji,
    Essentials, // It includes: AccessibilityHelp, Clipboard, Enter, SelectAll, ShiftEnter, Typing, Undo.
    Font,
    GeneralHtmlSupport,
    Heading,
    Italic,
    Link,
    List,
    ListProperties,
    Mention,
    Paragraph,
    PasteFromOffice,
    Strikethrough,
    Underline,
} from 'ckeditor5';

const LICENSE_KEY = 'GPL';

const editorConfig = {
    toolbar: {
        items: [
            'bold', 'italic', 'underline', 'strikethrough',
            '|',
            'numberedList', 'bulletedList',
            '|',
            'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
            '|',
            'fontColor', 'fontBackgroundColor',
            '|',
            'heading', 'fontFamily', 'fontSize',
            '|',
            'link', 'emoji',
        ],
        shouldNotGroupWhenFull: true
    },
    plugins: [
        Alignment,
        Autoformat,
        AutoLink,
        Bold,
        Emoji,
        Essentials, // It includes: AccessibilityHelp, Clipboard, Enter, SelectAll, ShiftEnter, Typing, Undo.
        Font,
        GeneralHtmlSupport,
        Heading,
        Italic,
        Link,
        List,
        ListProperties,
        Mention,
        Paragraph,
        PasteFromOffice,
        Strikethrough,
        Underline,
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
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
};

export { editorConfig };