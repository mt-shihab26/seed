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
    quotePlugin,
    sandpackPlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';

import { cn } from '@/lib/utils';

import { KitchenSinkToolbar, MDXEditor } from '@mdxeditor/editor';

export const Editor = ({
    value,
    diffValue,
    onChange,
    placeholder,
    className,
}: {
    value: string;
    diffValue: string;
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
                // Headings
                headingsPlugin(),
                // Quotes
                quotePlugin(),
                // Lists
                listsPlugin(),
                // Thematic Break (hr)
                thematicBreakPlugin(),
                // Links
                linkPlugin(),
                linkDialogPlugin({ linkAutocompleteSuggestions }),
                // Images
                imagePlugin({ imageUploadHandler, imageAutocompleteSuggestions }),
                // Tables
                tablePlugin(),
                // Code blocks
                codeBlockPlugin({ defaultCodeBlockLanguage }),
                sandpackPlugin({ sandpackConfig }),
                codeMirrorPlugin({ codeBlockLanguages }),

                // Diff/source mode
                diffSourcePlugin({ diffMarkdown: diffValue, viewMode: 'rich-text' }),

                //
                toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
            ]}
        />
    );
};
