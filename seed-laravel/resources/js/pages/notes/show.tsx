import type { TNote } from '@/types/models';

import { AppLayout } from '@/components/layouts/app-layout';
import { NoteLayout } from '@/components/layouts/note-layout';
import { Header } from '@/components/screens/notes/view/header';
import { Head } from '@inertiajs/react';

const Show = ({ note }: { note: TNote }) => {
    return (
        <AppLayout>
            <Head title={note.title} />
            <NoteLayout title={note.title} header={<Header note={note} />}>
                Hello
            </NoteLayout>
        </AppLayout>
    );
};

export default Show;
