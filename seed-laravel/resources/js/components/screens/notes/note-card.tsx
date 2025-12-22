import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArchiveIcon, EditIcon, FolderIcon, StarIcon, TrashIcon } from 'lucide-react';

export const NoteCard = ({ note }: { note: TNote }) => {
    return (
        <div className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-none transition-all hover:shadow-xs">
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
                <div className="flex gap-1">
                    <Button size="icon" variant="ghost">
                        <StarIcon
                            className={cn('size-4', {
                                'fill-primary text-primary': note.favorited_at,
                            })}
                        />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <ArchiveIcon
                            className={cn('size-4', {
                                'fill-primary text-primary': note.archived_at,
                            })}
                        />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <TrashIcon
                            className={cn('size-4', {
                                'fill-destructive text-destructive': note.deleted_at,
                            })}
                        />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <EditIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
