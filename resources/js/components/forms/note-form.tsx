import type { TFolder, TNote, TTag } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { useForm } from '@inertiajs/react';

import { CancelButton } from '@/components/elements/cancel-button';
import { InputError } from '@/components/elements/input-error';
import { NoteActionLink } from '@/components/elements/note-action-link';
import { SubmitButton } from '@/components/elements/submit-button';
import { ContentInput } from '@/components/inputs/content-input';
import { FolderInput } from '@/components/inputs/folder-input';
import { TagsInput } from '@/components/inputs/tags-input';
import { TitleInput } from '@/components/inputs/title-input';
import { ArchiveIcon, StarIcon, TrashIcon } from 'lucide-react';

export const NoteForm = ({
    note,
    folders,
    tags,
    onCancel,
}: {
    note?: TNote;
    folders: TFolder[];
    tags: TTag[];
    onCancel?: () => void;
}) => {
    const { errors, processing, data, setData, post, patch } = useForm<{
        title: string;
        content: string;
        folder_id: string;
        tags: string[];
    }>({
        title: note?.title || '',
        content: note?.content || '',
        folder_id: note?.folder_id || '',
        tags: note?.tags?.map((tag) => tag.id) || [],
    });

    const handleSubmit = () => {
        if (note) {
            patch(route('notes.update', note), {
                preserveScroll: true,
            });
        } else {
            post(route('notes.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="space-y-4">
            <InputError
                message={errors.title || errors.content || errors.folder_id || errors.tags}
            />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderInput
                    value={folders.find((f) => f.id === data.folder_id) || null}
                    onChange={(folder) => setData('folder_id', folder?.id || '')}
                    folders={folders}
                />
                {note && <span>{formatDateTime(note.created_at)}</span>}
            </div>
            <TitleInput
                placeholder="Enter note title"
                value={data.title}
                onChange={(value) => setData('title', value)}
                readOnly={readOnly}
                autoFocus={true}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                <TagsInput
                    value={data.tags.map((tag) => tags.find((t) => t.id === tag) as TTag)}
                    onChange={(tags) =>
                        setData(
                            'tags',
                            tags.map((t) => t.id),
                        )
                    }
                    tags={tags}
                />

                {note && (
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
                )}
            </div>
            <ContentInput
                placeholder="Write your note content here..."
                value={data.content}
                onChange={(value) => setData('content', value)}
            />
            <div className="flex flex-row items-center justify-end gap-4">
                {onCancel && <CancelButton onClick={onCancel} />}
                <SubmitButton onClick={handleSubmit} editing={!!note} processing={processing} />
            </div>
        </div>
    );
};
