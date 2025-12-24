import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { BackButton } from '@/components/elements/back-button';
import { EditButton } from '@/components/elements/edit-button';
import { NoteActionLink } from '@/components/elements/note-action-link';
import { NoteLayout } from '@/components/layouts/note-layout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArchiveIcon, FolderIcon, StarIcon, TrashIcon } from 'lucide-react';

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
                                <Badge variant="outline" className="flex items-center gap-1.5">
                                    <FolderIcon className="size-3.5" />
                                    <span>{note.folder.name}</span>
                                </Badge>
                                <span className="hidden sm:inline">•</span>
                            </>
                        )}
                        <span>{formatDateTime(note.created_at)}</span>
                    </div>
                    <h1 className="text-2xl font-bold sm:text-3xl">{note.title}</h1>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {note.tags.map((tag) => (
                                    <Badge key={tag.id} variant="secondary">
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        )}
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
                    </div>
                </div>
                <Separator />
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-base leading-relaxed text-pretty whitespace-pre-wrap">
                        {note.content}
                    </p>
                </div>
            </div>
        </NoteLayout>
    );
};

export default Show;
