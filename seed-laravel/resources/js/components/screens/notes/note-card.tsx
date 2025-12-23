import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { ArchiveIcon, EditIcon, FolderIcon, StarIcon, TrashIcon } from 'lucide-react';
import { NoteActionLink } from './note-action-link';

export const NoteCard = ({ note }: { note: TNote }) => {
    return (
        <Link
            href={route('notes.show', note)}
            className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-none transition-all hover:shadow-xs"
        >
            {note.folder && (
                <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                    <FolderIcon className="size-3.5" />
                    <span>{note.folder.name}</span>
                </Badge>
            )}
            <h3 className="text-lg font-semibold text-balance text-card-foreground">
                {note.title}
            </h3>
            <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">
                {note.content}
            </p>
            {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            )}
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {formatDateTime(note.updated_at)}
                </span>
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
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
                    <NoteActionLink icon={EditIcon} href={route('notes.edit', note)} />
                </div>
            </div>
        </Link>
    );
};
