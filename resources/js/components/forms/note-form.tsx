import type { TFolder, TNote, TTag } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { useForm } from '@inertiajs/react';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { InputError } from '@/components/elements/input-error';
import { ContentInput } from '@/components/inputs/content-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SaveIcon, XIcon } from 'lucide-react';
import { TitleInput } from '../inputs/title-input';

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
    const { errors, processing, data, setData } = useForm<{
        title: string;
        content: string;
        folder_id: string;
        tag_ids: string[];
    }>({
        title: note?.title || '',
        content: note?.content || '',
        folder_id: note?.folder_id || '',
        tag_ids: note?.tags?.map((tag) => tag.id) || [],
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="space-y-4"
        >
            <InputError message={errors.title || errors.content} />

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
                readOnly={true}
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
                                checked={data.tag_ids.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                    setData(
                                        'tag_ids',
                                        checked
                                            ? [...data.tag_ids, tag.id]
                                            : data.tag_ids.filter((id) => id !== tag.id),
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

            <div className="flex flex-row justify-between gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="w-full sm:w-auto"
                >
                    <XIcon className="mr-2 size-4" />
                    Cancel
                </Button>

                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                    <SaveIcon className="mr-2 size-4" />
                    {processing
                        ? note
                            ? 'Saving...'
                            : 'Creating...'
                        : note
                          ? 'Save Changes'
                          : 'Create Note'}
                </Button>
            </div>
        </form>
    );
};
