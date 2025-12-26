import {
    codeBlockLanguages,
    defaultCodeBlockLanguage,
    imageAutocompleteSuggestions,
    imageUploadHandler,
    linkAutocompleteSuggestions,
    sandpackConfig,
} from './params';

import {
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    sandpackPlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';

import { cn } from '@/lib/utils';

import { MDXEditor } from '@mdxeditor/editor';
import { Toolbar } from './toolbar';

export const Editor = ({
    value,
    onChange,
    placeholder,
    className,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) => {
    return (
        <MDXEditor
            placeholder={placeholder}
            className={cn('full-demo-mdxeditor', className)}
            markdown={value}
            onChange={(value) => onChange(value)}
            contentEditableClassName="prose max-w-full font-sans"
            plugins={[
                // Basic Formatting
                headingsPlugin(),
                quotePlugin(),
                listsPlugin(),
                thematicBreakPlugin(),
                // Links
                linkPlugin(),
                linkDialogPlugin({ linkAutocompleteSuggestions }),
                // Images
                imagePlugin({ imageUploadHandler, imageAutocompleteSuggestions }),
                // Tables
                tablePlugin(),
                // Code blocks
                codeBlockPlugin({ defaultCodeBlockLanguage, codeBlockEditorDescriptors: [] }),
                codeMirrorPlugin({ codeBlockLanguages }),
                sandpackPlugin({ sandpackConfig }),
                diffSourcePlugin(),
                // Markdown shortcuts
                markdownShortcutPlugin(),

                // Toolbar
                toolbarPlugin({ toolbarContents: () => <Toolbar /> }),
            ]}
        />
    );
};
