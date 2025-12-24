import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { BackButton } from '@/components/elements/back-button';
import { NoteLayout } from '@/components/layouts/note-layout';
import { NoteActionLink } from '@/components/screens/notes/list/note-action-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { ArchiveIcon, EditIcon, FolderIcon, StarIcon, TrashIcon } from 'lucide-react';

const Show = ({ note }: { note: TNote }) => {
    return (
        <NoteLayout
            title={note.title}
            header={
                <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4">
                    <BackButton href={route('notes.index')} largeLabel="Back to notes" />
                    <div className="flex gap-2">
                        <Link href={route('notes.edit', note)}>
                            <Button size="sm" variant="outline">
                                <EditIcon className="size-4 sm:mr-2" />
                                <span className="hidden sm:inline">Edit</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            }
        >
            <div className="mx-auto max-w-4xl py-1">
                <Card>
                    <CardHeader className="space-y-4 pb-4">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 space-y-3">
                                <h1 className="text-2xl leading-tight font-bold text-balance sm:text-3xl">
                                    {note.title}
                                </h1>
                            </div>
                        </div>
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
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-base leading-relaxed text-pretty whitespace-pre-wrap">
                                {note.content}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </NoteLayout>
    );
};

export default Show;
