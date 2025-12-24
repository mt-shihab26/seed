import type { TNote } from '@/types/models';

import { AppLayout } from '@/components/layouts/app-layout';
import { Header } from '@/components/screens/notes/list/header';
import { NoNotesMessage } from '@/components/screens/notes/list/no-notes-message';
import { NoteCard } from '@/components/screens/notes/list/note-card';
import { Head } from '@inertiajs/react';

const Index = ({ notes, title }: { notes: TNote[]; title: string }) => {
    return (
        <AppLayout>
            <Head title={title} />
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-6 overflow-hidden">
                <Header count={notes?.length} title={title} />
                <div className="flex-1 space-y-6 overflow-y-auto pr-2.5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-muted">
                    {notes.length === 0 ? (
                        <NoNotesMessage />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {notes.map((note) => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
};

export default Index;
