import type { TNote } from '@/types/models';

import { Header } from './header';
import { NoNotesMessage } from './no-notes-message';
import { NoteCard } from './note-card';

export const Notes = ({ notes, title }: { notes: TNote[]; title: string }) => {
    return (
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-4">
            <Header count={notes?.length} title={title} />
            {notes.length === 0 ? (
                <NoNotesMessage />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            )}
        </main>
    );
};
