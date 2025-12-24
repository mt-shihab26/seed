import { PencilIcon, PlusIcon, TagIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import type { TTag } from '@/types/models';

import { destroy, store, update } from '@/actions/App/Http/Controllers/TagController';

import { ColorGrid } from '@/components/elements/color-grid';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SettingLayout } from '@/components/layouts/setting-layout';
import { getColorClasses } from '@/lib/colors';
import type { TColor } from '@/types/enums';
import { router, useForm } from '@inertiajs/react';

const Tags = ({ tags }: { tags: TTag[] }) => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingTag, setEditingTag] = useState<TTag | null>(null);

    const handleEdit = (tag: TTag) => {
        setEditingTag(tag);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (tag: TTag) => {
        if (confirm(`Are you sure you want to delete "${tag.name}"?`)) {
            router.delete(destroy.url(tag), {
                preserveScroll: true,
            });
        }
    };

    return (
        <SettingLayout title="Tags">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Manage your tags and their colors
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <PlusIcon className="mr-2 size-4" />
                        New Tag
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tags.map((tag) => {
                        const colorClasses = getColorClasses(tag.color);
                        return (
                            <div
                                key={tag.id}
                                className="group relative flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-sm"
                            >
                                <div
                                    className={`flex size-10 shrink-0 items-center justify-center rounded-md ${colorClasses.bg}`}
                                >
                                    <TagIcon className="size-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-medium">{tag.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {tag.notes_count || 0} notes
                                    </p>
                                </div>
                                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => handleEdit(tag)}
                                    >
                                        <PencilIcon className="size-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => handleDelete(tag)}
                                    >
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {tags.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                        <TagIcon className="mb-4 size-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-semibold">No tags yet</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Create your first tag to categorize your notes
                        </p>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                            <PlusIcon className="mr-2 size-4" />
                            Create Tag
                        </Button>
                    </div>
                )}
            </div>

            <CreateTagDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
            <EditTagDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                tag={editingTag}
            />
        </SettingLayout>
    );
};

function CreateTagDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: 'gray' as TColor,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Create Tag</DialogTitle>
                        <DialogDescription>
                            Add a new tag to categorize your notes
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter tag name"
                                autoFocus
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label>Color</Label>
                            <ColorGrid
                                value={data.color}
                                onChange={(color) => setData('color', color)}
                            />
                            {errors.color && (
                                <p className="mt-1 text-sm text-destructive">{errors.color}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function EditTagDialog({
    open,
    onOpenChange,
    tag,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tag: TTag | null;
}) {
    const { data, setData, patch, processing, errors } = useForm({
        name: tag?.name || '',
        color: (tag?.color || 'gray') as TColor,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tag) return;

        patch(update.url(tag), {
            preserveScroll: true,
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    };

    if (!tag) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                        <DialogDescription>Update tag name and color</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter tag name"
                                autoFocus
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label>Color</Label>
                            <ColorGrid
                                value={data.color}
                                onChange={(color) => setData('color', color)}
                            />
                            {errors.color && (
                                <p className="mt-1 text-sm text-destructive">{errors.color}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Tags;
