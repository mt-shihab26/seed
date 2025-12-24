import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';
import {
    ArchiveIcon,
    ArrowLeftIcon,
    EditIcon,
    FolderIcon,
    StarIcon,
    TrashIcon,
} from 'lucide-react';

import { AppLayout } from '@/components/layouts/app-layout';

import NoteController from '@/actions/App/Http/Controllers/NoteController';

const Show = ({ note }: { note: TNote }) => {
    return (
        <AppLayout>
            <Head title={note.title} />
            <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden px-4 sm:px-6">
                <div className="flex-1 space-y-6 overflow-y-auto pb-6 pr-2.5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted">
                    {/* Header with back button */}
                    <div className="flex items-center justify-between gap-4 pt-6">
                        <Link
                            href={route('notes.index')}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeftIcon className="size-4" />
                            <span className="hidden sm:inline">Back to notes</span>
                            <span className="sm:hidden">Back</span>
                        </Link>
                        <div className="flex gap-2">
                            <Link href={route('notes.edit', note)}>
                                <Button size="sm" variant="outline">
                                    <EditIcon className="size-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Edit</span>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Note content card */}
                    <Card>
                        <CardHeader className="space-y-4 pb-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex-1 space-y-3">
                                    <h1 className="text-2xl font-bold leading-tight text-balance sm:text-3xl">
                                        {note.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                        {note.folder && (
                                            <>
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-1.5"
                                                >
                                                    <FolderIcon className="size-3.5" />
                                                    <span>{note.folder.name}</span>
                                                </Badge>
                                                <span className="hidden sm:inline">•</span>
                                            </>
                                        )}
                                        <span>{formatDateTime(note.created_at)}</span>
                                        {note.updated_at !== note.created_at && (
                                            <>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="text-xs">
                                                    Updated {formatDateTime(note.updated_at)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {note.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {note.tags.map((tag) => (
                                        <Badge key={tag.id} variant="secondary">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6">
                            <div className="prose prose-neutral max-w-none dark:prose-invert">
                                <p className="whitespace-pre-wrap text-base leading-relaxed text-pretty">
                                    {note.content}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions card */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Actions</h2>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid gap-2 sm:grid-cols-2">
                                <Link
                                    href={NoteController.toggleFavorite.url(note)}
                                    method="patch"
                                    as="button"
                                    className="w-full"
                                >
                                    <Button
                                        variant={note.favorited_at ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                    >
                                        <StarIcon
                                            className={`mr-2 size-4 ${note.favorited_at ? 'fill-current' : ''}`}
                                        />
                                        {note.favorited_at
                                            ? 'Remove from favorites'
                                            : 'Add to favorites'}
                                    </Button>
                                </Link>
                                <Link
                                    href={NoteController.toggleArchive.url(note)}
                                    method="patch"
                                    as="button"
                                    className="w-full"
                                >
                                    <Button variant="outline" className="w-full justify-start">
                                        <ArchiveIcon className="mr-2 size-4" />
                                        {note.archived_at ? 'Unarchive note' : 'Archive note'}
                                    </Button>
                                </Link>
                            </div>
                            <Separator />
                            <Link
                                href={NoteController.destroy.url(note)}
                                method="delete"
                                as="button"
                                className="w-full"
                            >
                                <Button variant="destructive" className="w-full justify-start">
                                    <TrashIcon className="mr-2 size-4" />
                                    Delete note
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AppLayout>
    );
};

export default Show;
