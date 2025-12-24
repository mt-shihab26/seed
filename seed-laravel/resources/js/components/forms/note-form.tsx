import type { TFolder, TNote, TTag } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { InputError } from '@/components/elements/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FolderIcon, SaveIcon, XIcon } from 'lucide-react';

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
    const { errors, processing, data, setData } = useForm<{ title: string; content: string }>({
        title: note?.title || '',
        content: note?.content || '',
    });

    return (
        <div>
            <div>
                <div className="">
                    <InputError message={errors.title || errors.content} />
                    <Input
                        id="title"
                        name="title"
                        placeholder="Enter note title"
                        className="text-2xl font-bold sm:text-3xl"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        autoFocus
                        required
                    />
                    <Textarea
                        id="content"
                        name="content"
                        defaultValue={note?.content || ''}
                        placeholder="Write your note content here..."
                        rows={12}
                        required
                        className="resize-y"
                    />
                    <div className="space-y-3">
                        <Label htmlFor="folder_id">
                            Folder <span className="text-destructive">*</span>
                        </Label>
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
                    <div className="space-y-3">
                        <Label>Tags</Label>
                        <p className="text-sm text-muted-foreground">
                            Select tags to organize your note
                        </p>
                        {tags.length > 0 ? (
                            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {tags.map((tag) => {
                                        const isChecked =
                                            note?.tags?.some((noteTag) => noteTag.id === tag.id) ||
                                            false;
                                        return (
                                            <div
                                                key={tag.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={`tag-${tag.id}`}
                                                    name="tags[]"
                                                    value={tag.id}
                                                    defaultChecked={isChecked}
                                                />
                                                <Label
                                                    htmlFor={`tag-${tag.id}`}
                                                    className="flex flex-1 cursor-pointer items-center gap-2 font-normal"
                                                >
                                                    <Badge variant="secondary" className="text-xs">
                                                        {tag.name}
                                                    </Badge>
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    No tags available. Create tags in settings to organize your
                                    notes.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-between">
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
                </CardContent>
            </div>
        </div>
    );
};
