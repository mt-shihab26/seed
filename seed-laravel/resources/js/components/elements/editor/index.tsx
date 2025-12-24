import {
    imageAutocompleteSuggestions,
    imageUploadHandler,
    linkAutocompleteSuggestions,
} from './params';

import {
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';

import { cn } from '@/lib/utils';

import { KitchenSinkToolbar, MDXEditor } from '@mdxeditor/editor';

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
                // Tables
                tablePlugin(),
                //
                toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
            ]}
        />
    );
};
