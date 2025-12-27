import type { TNote } from '@/types/models';

import { NoteActionLink } from '@/components/elements/note-action-link';
import { ArchiveIcon, StarIcon, TrashIcon } from 'lucide-react';

export const NoteActions = ({ note }: { note: TNote }) => {
    return (
        <div className="flex gap-1">
            <NoteActionLink
                icon={StarIcon}
                href={route('notes.toggle-favorite', note)}
                method="patch"
                active={!!note.favorited_at}
            />
            <NoteActionLink
                icon={ArchiveIcon}
                href={route('notes.toggle-archive', note)}
                method="patch"
                active={!!note.archived_at}
            />
            <NoteActionLink
                icon={TrashIcon}
                href={route('notes.destroy', note)}
                method="delete"
                active={!!note.deleted_at}
                variant="destructive"
            />
        </div>
    );
};
