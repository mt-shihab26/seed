import type { TFolder, TNote, TTag } from '@/types/models';

import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

import { NoteForm } from '@/components/screens/notes/form/note-form';

import { AppLayout } from '@/components/layouts/app-layout';

import NoteController from '@/actions/App/Http/Controllers/NoteController';

const Edit = ({ note, folders, tags }: { note: TNote; folders: TFolder[]; tags: TTag[] }) => {
    return (
        <AppLayout>
            <Head title={`Edit: ${note.title}`} />
            <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-4 sm:px-6">
                <div className="flex-1 space-y-6 overflow-y-auto pr-2.5 pb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted">
                    {/* Header with back button */}
                    <div className="flex items-center justify-between gap-4 pt-6">
                        <Link
                            href={route('notes.show', note)}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeftIcon className="size-4" />
                            <span className="hidden sm:inline">Back to note</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                    </div>

                    {/* Edit form */}
                    <NoteForm
                        note={note}
                        folders={folders}
                        tags={tags}
                        formAction={NoteController.update.form(note)}
                        cancelHref={route('notes.show', note)}
                        isEditing={true}
                    />
                </div>
            </main>
        </AppLayout>
    );
};

export default Edit;
