import type { TFolder, TNote, TTag } from '@/types/models';

import { BackButton } from '@/components/elements/back-button';
import { NoteForm } from '@/components/forms/note-form';
import { NoteLayout } from '@/components/layouts/note-layout';

import NoteController from '@/actions/App/Http/Controllers/NoteController';

const Edit = ({ note, folders, tags }: { note: TNote; folders: TFolder[]; tags: TTag[] }) => {
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
            <NoteForm
                note={note}
                folders={folders}
                tags={tags}
                formProps={NoteController.update.form(note)}
                cancelHref={route('notes.show', note)}
                isEditing={true}
            />
        </NoteLayout>
    );
};

export default Edit;
