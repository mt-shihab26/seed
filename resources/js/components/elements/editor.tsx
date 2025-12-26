import {
    codeBlockLanguages,
    defaultCodeBlockLanguage,
    imageAutocompleteSuggestions,
    imageUploadHandler,
    linkAutocompleteSuggestions,
    sandpackConfig,
} from '@/lib/editor';

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

import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    CodeToggle,
    CreateLink,
    HighlightToggle,
    InsertImage,
    InsertTable,
    ListsToggle,
    MDXEditor,
    StrikeThroughSupSubToggles,
    UndoRedo,
} from '@mdxeditor/editor';

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
            className={className}
            markdown={value}
            onChange={(value) => onChange(value)}
            contentEditableClassName="prose dark:prose-invert"
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
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            <StrikeThroughSupSubToggles />
                            <HighlightToggle />
                            <CreateLink />
                            <CodeToggle />
                            <ListsToggle />
                            <InsertImage />
                            <InsertTable />
                        </>
                    ),
                }),
            ]}
        />
    );
};
