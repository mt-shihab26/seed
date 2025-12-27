import type { TNote } from '@/types/models';

import { router } from '@inertiajs/react';

import { BackButton } from '@/components/elements/back-button';
import { IconLink } from '@/components/elements/icon-link';
import { RenderDateTime } from '@/components/elements/render-date-time';
import { ContentInput } from '@/components/inputs/content-input';
import { FolderInput } from '@/components/inputs/folder-input';
import { TagsInput } from '@/components/inputs/tags-input';
import { TitleInput } from '@/components/inputs/title-input';
import { NoteLayout } from '@/components/layouts/note-layout';
import { NoteActions } from '@/components/screens/notes/note-actions';
import { PlusIcon, SproutIcon } from 'lucide-react';

const Index = ({
    notes,
    title,
    back = null,
}: {
    notes: TNote[];
    title: string;
    back: string | null;
}) => {
    return (
        <NoteLayout
            title={title}
            className="max-w-7xl"
            header={
                <div className="flex w-full items-center space-x-4">
                    <div className="flex w-full items-center space-x-4">
                        {back && (
                            <div className="w-min text-nowrap">
                                <BackButton href={back} largeLabel="Back to All Notes" />
                            </div>
                        )}
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
                        <div
                            key={note.id}
                            onClick={() => router.visit(route('notes.show', note))}
                            className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border border-border bg-background p-6 text-foreground shadow-none transition-all hover:shadow-xs"
                        >
                            {note.folder && <FolderInput value={note.folder} readOnly />}
                            <TitleInput value={note.title} readOnly />
                            <div className="flex-1">
                                <ContentInput value={note.content} readOnly excerpt />
                            </div>
                            <TagsInput value={note.tags} readOnly />
                            <div className="flex items-center justify-between">
                                <RenderDateTime value={note.created_at} />
                                <NoteActions note={note} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </NoteLayout>
    );
};

export default Index;
