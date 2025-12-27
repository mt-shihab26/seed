import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { BackButton } from '@/components/elements/back-button';
import { ColoredBadge } from '@/components/elements/colored-badge';
import { EditButton } from '@/components/elements/edit-button';
import { ContentInput } from '@/components/inputs/content-input';
import { TagsInput } from '@/components/inputs/tags-input';
import { TitleInput } from '@/components/inputs/title-input';
import { NoteLayout } from '@/components/layouts/note-layout';
import { NoteActions } from '@/components/screens/notes/note-actions';
import { FolderIcon } from 'lucide-react';

const Show = ({ note }: { note: TNote }) => {
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
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {note.folder && (
                            <>
                                <ColoredBadge type="folder" color={note.folder.color}>
                                    <FolderIcon className="size-3.5" />
                                    <span>{note.folder.name}</span>
                                </ColoredBadge>
                            </>
                        )}
                        <span>{formatDateTime(note.created_at)}</span>
                    </div>
                    <TitleInput value={note.title} readOnly />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <TagsInput value={note.tags} readOnly />
                        <NoteActions note={note} />
                    </div>
                </div>
                <ContentInput value={note.content} readOnly={true} />
            </div>
        </NoteLayout>
    );
};

export default Show;
