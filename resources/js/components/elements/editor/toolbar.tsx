import {
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    ChangeAdmonitionType,
    CodeToggle,
    ConditionalContents,
    CreateLink,
    HighlightToggle,
    InsertImage,
    ListsToggle,
    StrikeThroughSupSubToggles,
    UndoRedo,
    type DirectiveNode,
    type EditorInFocus,
} from '@mdxeditor/editor';

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
    const node = editorInFocus?.rootNode;
    if (!node || node.getType() !== 'directive') {
        return false;
    }

    return ['note', 'tip', 'danger', 'info', 'caution'].includes(
        (node as DirectiveNode).getMdastNode().name,
    );
}

export const Toolbar = () => {
    return (
        <>
            <UndoRedo />
            <ConditionalContents
                options={[
                    {
                        when: whenInAdmonition,
                        contents: () => <ChangeAdmonitionType />,
                    },
                    {
                        fallback: () => <BlockTypeSelect />,
                    },
                ]}
            />
            <BoldItalicUnderlineToggles />
            <StrikeThroughSupSubToggles />
            <HighlightToggle />
            <CreateLink />
            <CodeToggle />
            <ListsToggle />
            <InsertImage />
        </>
    );
};
