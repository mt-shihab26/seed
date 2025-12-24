import {
    ArchiveIcon,
    EditIcon,
    FolderIcon,
    PlusIcon,
    SettingsIcon,
    SproutIcon,
    StarIcon,
    TrashIcon,
} from 'lucide-react';

import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { IconLink } from '@/components/elements/icon-link';
import { NoteActionLink } from '@/components/elements/note-action-link';
import { NoteLayout } from '@/components/layouts/note-layout';
import { Link } from '@inertiajs/react';

const Index = ({ notes, title }: { notes: TNote[]; title: string }) => {
    return (
        <NoteLayout
            title={title}
            className="max-w-7xl"
            header={
                <div className="flex w-full items-center space-x-4">
                    <div className="flex w-full items-center space-x-4">
                        <div className="w-min">
                            <IconLink
                                href={route('settings.notes.show')}
                                icon={SettingsIcon}
                                variant="outline"
                            />
                        </div>
                        <div className="h-0.5 w-full bg-border" />
                    </div>
                    <div className="w-min text-xl font-bold text-nowrap">
                        {title} ({notes?.length || 0})
                    </div>
                    <div className="flex w-full items-center space-x-4">
                        <div className="h-0.5 w-full bg-border" />
                        <div className="w-min">
                            <IconLink href={route('notes.create')} icon={PlusIcon} />
                        </div>
                    </div>
                </div>
            }
        >
            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <SproutIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No notes found</h3>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {notes.map((note) => (
                        <Link
                            key={note.id}
                            href={route('notes.show', note)}
                            className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-none transition-all hover:shadow-xs"
                        >
                            {note.folder && (
                                <ColoredBadge
                                    type="folder"
                                    color={note.folder.color}
                                    className="flex items-center gap-1.5 text-xs"
                                >
                                    <FolderIcon className="size-3.5" />
                                    <span>{note.folder.name}</span>
                                </ColoredBadge>
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
                                        <ColoredBadge
                                            type="tag"
                                            key={tag.id}
                                            color={tag.color}
                                            className="text-xs"
                                        >
                                            {tag.name}
                                        </ColoredBadge>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    {formatDateTime(note.created_at)}
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
                                    <NoteActionLink
                                        icon={EditIcon}
                                        href={route('notes.edit', note)}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </NoteLayout>
    );
};

export default Index;
