import type { TFolder, TNote, TTag } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { useForm } from '@inertiajs/react';

import { CancelButton } from '@/components/elements/cancel-button';
import { ColoredBadge } from '@/components/elements/colored-badge';
import { InputError } from '@/components/elements/input-error';
import { SubmitButton } from '@/components/elements/submit-button';
import { ContentInput } from '@/components/inputs/content-input';
import { TitleInput } from '@/components/inputs/title-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (note) {
                    patch(route('notes.update', note), {
                        preserveScroll: true,
                    });
                } else {
                    post(route('notes.store'), {
                        preserveScroll: true,
                    });
                }
            }}
            className="space-y-4"
        >
            <InputError
                message={errors.title || errors.content || errors.folder_id || errors.tags}
            />

            {note && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatDateTime(note.created_at)}</span>
                </div>
            )}

            <TitleInput
                placeholder="Enter note title"
                value={data.title}
                onChange={(value) => setData('title', value)}
                autoFocus={true}
            />

            <ContentInput
                placeholder="Write your note content here..."
                value={data.content}
                onChange={(value) => setData('content', value)}
                className="min-h-80"
            />

            <div className="space-y-3 border border-border bg-muted/30 p-4">
                <Label>Select folder to organize your note</Label>
                <RadioGroup
                    value={data.folder_id}
                    onValueChange={(folderId) => setData('folder_id', folderId)}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {folders.map((folder) => (
                            <div key={folder.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={folder.id} id={`folder-${folder.id}`} />
                                <Label
                                    htmlFor={`folder-${folder.id}`}
                                    className="flex flex-1 cursor-pointer items-center gap-2 font-normal"
                                >
                                    <ColoredBadge
                                        type="folder"
                                        color={folder.color}
                                        className="text-xs"
                                    >
                                        {folder.name}
                                    </ColoredBadge>
                                </Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-3 border border-border bg-muted/30 p-4">
                <Label>Select tags to organize your note</Label>
                <div className="grid grid-cols-4 gap-2">
                    {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`tag-${tag.id}`}
                                checked={data.tags.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                    setData(
                                        'tags',
                                        checked
                                            ? [...data.tags, tag.id]
                                            : data.tags.filter((id) => id !== tag.id),
                                    );
                                }}
                            />
                            <Label
                                htmlFor={`tag-${tag.id}`}
                                className="flex flex-1 cursor-pointer items-center gap-2 font-normal"
                            >
                                <ColoredBadge type="tag" color={tag.color} className="text-xs">
                                    {tag.name}
                                </ColoredBadge>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-4">
                {onCancel && <CancelButton onClick={onCancel} />}
                <SubmitButton editing={!!note} processing={processing} />
            </div>
        </form>
    );
};
