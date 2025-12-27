import type { TNote } from '@/types/models';

import { useUser } from '@/hooks/use-user';

import { BackButton } from '@/components/elements/back-button';
import { NoteForm } from '@/components/forms/note-form';
import { NoteLayout } from '@/components/layouts/note-layout';

const Edit = ({ note }: { note: TNote }) => {
    const { user } = useUser();

    return (
        <NoteLayout
            title={`Edit: ${note.title}`}
            className="max-w-4xl"
            header={
                <div className="flex w-full items-center justify-between gap-4">
                    <BackButton href={route('notes.show', note)} largeLabel="Back to note" />
                </div>
            }
        >
            <NoteForm note={note} folders={user.folders} tags={user.tags} />
        </NoteLayout>
    );
};

export default Edit;
