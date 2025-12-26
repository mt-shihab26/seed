import {
    codeBlockLanguages,
    defaultCodeBlockLanguage,
    imageAutocompleteSuggestions,
    imageUploadHandler,
    linkAutocompleteSuggestions,
} from './params';

import {
    codeBlockPlugin,
    codeMirrorPlugin,
    directivesPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';

import { cn } from '@/lib/utils';

import { AdmonitionDirectiveDescriptor, MDXEditor } from '@mdxeditor/editor';
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
                // Code blocks
                codeBlockPlugin({ defaultCodeBlockLanguage, codeBlockEditorDescriptors: [] }),
                codeMirrorPlugin({ codeBlockLanguages }),
                // Admonitions/Directives
                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                // Markdown shortcuts
                markdownShortcutPlugin(),
                // Toolbar
                toolbarPlugin({ toolbarContents: () => <Toolbar /> }),
            ]}
        />
    );
};
