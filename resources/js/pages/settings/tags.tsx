import type { TTag } from '@/types/models';

import { useUser } from '@/hooks/use-user';
import { getColorClasses } from '@/lib/colors';
import { router } from '@inertiajs/react';
import { useState } from 'react';

import { ConfirmDelete } from '@/components/elements/confirm-delete';
import { TagForm } from '@/components/forms/tag-form';
import { SettingLayout } from '@/components/layouts/setting-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PencilIcon, PlusIcon, TagIcon, TrashIcon } from 'lucide-react';

const Tags = () => {
    const { user } = useUser();
    const { tags } = user;

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<TTag | null>(null);
    const [deleteOpen, setDeleteOpen] = useState<TTag | null>(null);

    return (
        <SettingLayout title="Tags">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Manage your tags and their colors
                    </p>
                    <Button onClick={() => setCreateOpen(true)}>
                        <PlusIcon className="mr-2 size-4" />
                        New Tag
                    </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tags?.map((tag) => {
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
                                        onClick={() => setEditOpen(tag)}
                                    >
                                        <PencilIcon className="size-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setDeleteOpen(tag)}
                                    >
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {tags?.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                        <TagIcon className="mb-4 size-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-semibold">No tags yet</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Create your first tag to categorize your notes
                        </p>
                        <Button onClick={() => setCreateOpen(true)}>
                            <PlusIcon className="mr-2 size-4" />
                            Create Tag
                        </Button>
                    </div>
                )}
            </div>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Tag</DialogTitle>
                    </DialogHeader>
                    <TagForm onSuccess={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={!!editOpen} onOpenChange={(open) => !open && setEditOpen(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                    </DialogHeader>
                    {editOpen && <TagForm tag={editOpen} onSuccess={() => setEditOpen(null)} />}
                </DialogContent>
            </Dialog>
            {deleteOpen && (
                <ConfirmDelete
                    open={!!deleteOpen}
                    onChange={(open) => !open && setDeleteOpen(null)}
                    title="Delete Tag"
                    description={`Are you sure you want to delete "${deleteOpen.name}"? This action cannot be undone.`}
                    onConfirm={() =>
                        router.delete(route('tags.destroy', deleteOpen), {
                            preserveScroll: true,
                        })
                    }
                />
            )}
        </SettingLayout>
    );
};

export default Tags;
