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

export const Toolbar = () => {
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
