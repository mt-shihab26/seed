import type { TFolder, TNote, TTag } from '@/types/models';

import { formatDateTime } from '@/lib/format';
import { useForm } from '@inertiajs/react';

import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FolderIcon, SaveIcon, XIcon } from 'lucide-react';
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
        tags: TTag[];
    }>({
        title: note?.title || '',
        content: note?.content || '',
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

            <div className="space-y-3">
                <div className="relative">
                    <FolderIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                        id="folder_id"
                        name="folder_id"
                        defaultValue={note?.folder_id || ''}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background py-2 pr-3 pl-10 text-base ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                        <option value="">Select a folder</option>
                        {folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

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
