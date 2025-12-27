import type { TFolder, TTag, TTodo } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { CancelButton } from '@/components/elements/cancel-button';
import { InputError } from '@/components/elements/input-error';
import { RenderDateTime } from '@/components/elements/render-date-time';
import { SubmitButton } from '@/components/elements/submit-button';
import { ContentInput } from '@/components/inputs/content-input';
import { FolderInput } from '@/components/inputs/folder-input';
import { TagsInput } from '@/components/inputs/tags-input';
import { TitleInput } from '@/components/inputs/title-input';
import { TodoActions } from '@/components/screens/todos/todo-actions';

export const TodoForm = ({
    todo,
    folders,
    tags,
    onCancel,
    readOnly = false,
}: {
    todo?: TTodo;
    folders?: TFolder[];
    tags?: TTag[];
    onCancel?: () => void;
    readOnly?: boolean;
}) => {
    const { errors, processing, data, setData, post, patch } = useForm<{
        title: string;
        description: string;
        folder_id: string;
        tags: string[];
    }>({
        title: todo?.title || '',
        description: todo?.description || '',
        folder_id: todo?.folder_id || '',
        tags: todo?.tags?.map((tag) => tag.id) || [],
    });

    return (
        <div className="space-y-4">
            {!readOnly && (
                <InputError
                    message={errors.title || errors.description || errors.folder_id || errors.tags}
                />
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderInput
                    value={todo?.folder || folders?.find((f) => f.id === data.folder_id) || null}
                    onChange={(folder) => setData('folder_id', folder?.id || '')}
                    folders={folders}
                    readOnly={readOnly}
                />
                {todo && <RenderDateTime value={todo.created_at} />}
            </div>
            <TitleInput
                placeholder="Enter todo title"
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
                {todo && <TodoActions todo={todo} hideEdit />}
            </div>
            <ContentInput
                placeholder="Write your todo description here..."
                value={data.description}
                onChange={(value) => setData('description', value)}
                readOnly={readOnly}
            />
            {!readOnly && (
                <div className="flex flex-row items-center justify-end gap-4">
                    {onCancel && <CancelButton onClick={onCancel} />}
                    <SubmitButton
                        onClick={() => {
                            if (todo) {
                                patch(route('todos.update', todo), { preserveScroll: true });
                            } else {
                                post(route('todos.store'), { preserveScroll: true });
                            }
                        }}
                        editing={!!todo}
                        processing={processing}
                        createLabel="Create Todo"
                    />
                </div>
            )}
        </div>
    );
};
