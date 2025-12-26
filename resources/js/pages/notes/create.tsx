import type { TFolder, TTag } from '@/types/models';

import { BackButton } from '@/components/elements/back-button';
import { NoteForm } from '@/components/forms/note-form';
import { NoteLayout } from '@/components/layouts/note-layout';

const Create = ({ folders, tags }: { folders: TFolder[]; tags: TTag[] }) => {
    return (
        <NoteLayout
            title="Create New Note"
            className="max-w-4xl"
            header={
                <div className="flex w-full items-center justify-between gap-4">
                    <BackButton href={route('notes.index')} largeLabel="Back to notes" />
                </div>
            }
        >
            <NoteForm folders={folders} tags={tags} />
        </NoteLayout>
    );
};

export default Create;
