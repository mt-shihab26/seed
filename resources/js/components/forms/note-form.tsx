import type { TFolder, TNote, TTag } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { CancelButton } from '@/components/elements/cancel-button';
import { InputError } from '@/components/elements/input-error';
import { RenderDateTime } from '@/components/elements/render-date-time';
import { SubmitButton } from '@/components/elements/submit-button';
import { ContentInput } from '@/components/inputs/content-input';
import { FolderInput } from '@/components/inputs/folder-input';
import { TagsInput } from '@/components/inputs/tags-input';
import { TitleInput } from '@/components/inputs/title-input';
import { NoteActions } from '@/components/screens/notes/note-actions';

export const NoteForm = ({
    note,
    folders,
    tags,
    onCancel,
    readOnly = false,
}: {
    note?: TNote;
    folders?: TFolder[];
    tags?: TTag[];
    onCancel?: () => void;
    readOnly?: boolean;
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

    return (
        <div className="space-y-4">
            {!readOnly && (
                <InputError
                    message={errors.title || errors.content || errors.folder_id || errors.tags}
                />
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderInput
                    value={note?.folder || folders?.find((f) => f.id === data.folder_id) || null}
                    onChange={(folder) => setData('folder_id', folder?.id || '')}
                    folders={folders}
                    readOnly={readOnly}
                />
                {note && <RenderDateTime value={note.created_at} />}
            </div>
            <TitleInput
                placeholder="Enter note title"
                value={data.title}
                onChange={(value) => setData('title', value)}
                readOnly={readOnly}
                autoFocus={!readOnly}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                <TagsInput
                    value={data.tags.map((tag) => tags?.find((t) => t.id === tag) as TTag)}
                    onChange={(tags) =>
                        setData(
                            'tags',
                            tags.map((t) => t.id),
                        )
                    }
                    tags={tags}
                    readOnly={readOnly}
                />
                {note && <NoteActions note={note} hideEdit />}
            </div>
            <ContentInput
                placeholder="Write your note content here..."
                value={data.content}
                onChange={(value) => setData('content', value)}
                readOnly={readOnly}
            />
            {!readOnly && (
                <div className="flex flex-row items-center justify-end gap-4">
                    {onCancel && <CancelButton onClick={onCancel} />}
                    <SubmitButton
                        onClick={() => {
                            if (note) {
                                patch(route('notes.update', note), { preserveScroll: true });
                            } else {
                                post(route('notes.store'), { preserveScroll: true });
                            }
                        }}
                        editing={!!note}
                        processing={processing}
                        createLabel="Create Note"
                    />
                </div>
            )}
        </div>
    );
};
