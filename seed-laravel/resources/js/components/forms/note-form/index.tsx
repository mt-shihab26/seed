import type { TFolder, TNote, TTag } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { useForm } from '@inertiajs/react';

import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SaveIcon, XIcon } from 'lucide-react';
import { Folders } from './folders';
import { Tags } from './tags';

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
        tags: TTag[];
    }>({
        title: note?.title || '',
        content: note?.content || '',
        folder_id: note?.folder_id || '',
        tags: note?.tags || [],
    });

    return (
        <div className="space-y-4 pb-4">
            <InputError message={errors.title || errors.content} />
            {note && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatDateTime(note?.created_at)}</span>
                </div>
            )}
            <Textarea
                id="title"
                name="title"
                placeholder="Enter note title"
                className="h-auto! resize-y py-3! text-3xl! font-bold"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                autoFocus
                required
            />
            <Textarea
                id="content"
                name="content"
                placeholder="Write your note content here..."
                className="h-auto! resize-y text-base!"
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                required
            />

            <Folders
                value={data.folder_id}
                onChange={(value) => setData('folder_id', value)}
                folders={folders}
            />

            <Tags values={data.tags} onChange={(values) => setData('tags', values)} tags={tags} />

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
        </div>
    );
};
