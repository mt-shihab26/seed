import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    CodeToggle,
    CreateLink,
    HighlightToggle,
    InsertImage,
    InsertTable,
    ListsToggle,
    StrikeThroughSupSubToggles,
    UndoRedo,
} from '@mdxeditor/editor';

import { toolbarPlugin } from '@mdxeditor/editor';

import { Markdown } from '@/components/elements/markdown';

const Toolbar = () => {
    return (
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
    );
};

const truncateContent = (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) {
        return content;
    }

    return content.slice(0, maxLength).trimEnd() + '...';
};

export const ContentInput = ({
    value,
    onChange,
    placeholder,
    className,
    readOnly,
    autoFocus,
    excerpt,
}: {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    autoFocus?: boolean;
    excerpt?: boolean;
}) => {
    const plugins = [];

    if (!readOnly) {
        plugins.push(toolbarPlugin({ toolbarContents: () => <Toolbar /> }));
    }

    return (
        <Markdown
            value={excerpt ? truncateContent(value) : value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            plugins={plugins}
            autoFocus={autoFocus}
            readOnly={readOnly}
        />
    );
};
