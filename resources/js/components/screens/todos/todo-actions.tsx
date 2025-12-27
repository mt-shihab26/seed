import type { TTodo } from '@/types/models';

import { ActionLink } from '@/components/elements/action-link';
import { ArchiveIcon, CheckIcon, EditIcon, StarIcon, TrashIcon } from 'lucide-react';

export const TodoActions = ({ todo, hideEdit = false }: { todo: TTodo; hideEdit?: boolean }) => {
    return (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            <ActionLink
                icon={CheckIcon}
                href={route('todos.toggle-complete', todo)}
                method="patch"
                active={!!todo.completed_at}
            />
            <ActionLink
                icon={StarIcon}
                href={route('todos.toggle-favorite', todo)}
                method="patch"
                active={!!todo.favorited_at}
            />
            <ActionLink
                icon={ArchiveIcon}
                href={route('todos.toggle-archive', todo)}
                method="patch"
                active={!!todo.archived_at}
            />
            <ActionLink
                icon={TrashIcon}
                href={route('todos.destroy', todo)}
                method="delete"
                active={!!todo.deleted_at}
                variant="destructive"
            />
            {!hideEdit && <ActionLink icon={EditIcon} href={route('todos.edit', todo)} />}
        </div>
    );
};
