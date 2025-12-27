import type { TNote } from '@/types/models';

import { useUser } from '@/hooks/use-user';

import { BackButton } from '@/components/elements/back-button';
import { EditButton } from '@/components/elements/edit-button';
import { NoteForm } from '@/components/forms/note-form';
import { NoteLayout } from '@/components/layouts/note-layout';

const Show = ({ note }: { note: TNote }) => {
    const { user } = useUser();

    return (
        <NoteLayout
            title={note.title}
            className="max-w-4xl"
            header={
                <div className="flex w-full items-center justify-between gap-4">
                    <BackButton href={route('notes.index')} largeLabel="Back to notes" />
                    <EditButton href={route('notes.edit', note)} />
                </div>
            }
        >
            <NoteForm
                note={note}
                folders={user?.folders || []}
                tags={user?.tags || []}
                readOnly={true}
            />
        </NoteLayout>
    );
};

export default Show;
