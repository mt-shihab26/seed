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
    thematicBreakPlugin,
    toolbarPlugin,
} from '@mdxeditor/editor';

import { cn } from '@/lib/utils';

import { MDXEditor } from '@mdxeditor/editor';
import { Toolbar } from './toolbar';

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

                toolbarPlugin({ toolbarContents: () => <Toolbar /> }),
            ]}
        />
    );
};
