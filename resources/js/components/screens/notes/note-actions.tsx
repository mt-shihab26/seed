import type { TNote } from '@/types/models';

import { ActionLink } from '@/components/elements/action-link';
import { ArchiveIcon, EditIcon, StarIcon, TrashIcon } from 'lucide-react';

export const NoteActions = ({ note, hideEdit = false }: { note: TNote; hideEdit?: boolean }) => {
    return (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            <ActionLink
                icon={StarIcon}
                href={route('notes.toggle-favorite', note)}
                method="patch"
                active={!!note.favorited_at}
            />
            <ActionLink
                icon={ArchiveIcon}
                href={route('notes.toggle-archive', note)}
                method="patch"
                active={!!note.archived_at}
            />
            <ActionLink
                icon={TrashIcon}
                href={route('notes.destroy', note)}
                method="delete"
                active={!!note.deleted_at}
                variant="destructive"
            />
            {!hideEdit && <ActionLink icon={EditIcon} href={route('notes.edit', note)} />}
        </div>
    );
};
