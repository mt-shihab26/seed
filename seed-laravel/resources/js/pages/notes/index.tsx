import type { TNote } from '@/types/models';

import { NoteLayout } from '@/components/layouts/note-layout';
import { Header } from '@/components/screens/notes/list/header';
import { NoNotesMessage } from '@/components/screens/notes/list/no-notes-message';
import { NoteCard } from '@/components/screens/notes/list/note-card';

const Index = ({ notes, title }: { notes: TNote[]; title: string }) => {
    return (
        <NoteLayout title={title} header={<Header count={notes?.length} title={title} />}>
            {notes.length === 0 ? (
                <NoNotesMessage />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            )}
        </NoteLayout>
    );
};

export default Index;
