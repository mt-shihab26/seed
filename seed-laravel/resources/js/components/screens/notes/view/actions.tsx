import type { TNote } from '@/types/models';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { ArchiveIcon, StarIcon, TrashIcon } from 'lucide-react';

import NoteController from '@/actions/App/Http/Controllers/NoteController';

export const Actions = ({ note }: { note: TNote }) => {
    return (
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
                            {note.favorited_at ? 'Remove from favorites' : 'Add to favorites'}
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
    );
};
