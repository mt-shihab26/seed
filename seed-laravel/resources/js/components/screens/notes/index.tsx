import type { TNote } from '@/types/models';

import { Header } from './header';
import { NoNotesMessage } from './no-notes-message';
import { NoteCard } from './note-card';

export const Notes = ({ notes, title }: { notes: TNote[]; title: string }) => {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-6 overflow-hidden">
            <Header count={notes?.length} title={title} />
            <div className="flex-1 space-y-6 overflow-y-auto pr-2.5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted">
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
    );
};
