import type { TFolder } from '@/types/models';

import { useUser } from '@/hooks/use-user';
import { getColorClasses } from '@/lib/colors';
import { router } from '@inertiajs/react';
import { useState } from 'react';

import { ConfirmDelete } from '@/components/elements/confirm-delete';
import { FolderForm } from '@/components/forms/folder-form';
import { SettingLayout } from '@/components/layouts/setting-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FolderIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

const Folders = () => {
    const { folders } = useUser().user;

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<TFolder | null>(null);
    const [deleteOpen, setDeleteOpen] = useState<TFolder | null>(null);

    return (
        <SettingLayout title="Folders">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Manage your folders and their colors
                    </p>
                    <Button onClick={() => setCreateOpen(true)}>
                        <PlusIcon className="mr-2 size-4" />
                        New Folder
                    </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {folders?.map((folder) => {
                        const colorClasses = getColorClasses(folder.color);
                        return (
                            <div
                                key={folder.id}
                                className="group relative flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-sm"
                            >
                                <div
                                    className={`flex size-10 shrink-0 items-center justify-center rounded-md ${colorClasses.bg}`}
                                >
                                    <FolderIcon className="size-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-medium">{folder.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {folder.notes_count || 0} notes
                                    </p>
                                </div>
                                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setEditOpen(folder)}
                                    >
                                        <PencilIcon className="size-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => setDeleteOpen(folder)}
                                    >
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {folders?.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                        <FolderIcon className="mb-4 size-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-semibold">No folders yet</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Create your first folder to organize your notes
                        </p>
                        <Button onClick={() => setCreateOpen(true)}>
                            <PlusIcon className="mr-2 size-4" />
                            Create Folder
                        </Button>
                    </div>
                )}
            </div>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Note</DialogTitle>
                    </DialogHeader>
                    <FolderForm onSuccess={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={!!editOpen} onOpenChange={(open) => !open && setEditOpen(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit The Note</DialogTitle>
                    </DialogHeader>
                    {editOpen && (
                        <FolderForm folder={editOpen} onSuccess={() => setEditOpen(null)} />
                    )}
                </DialogContent>
            </Dialog>
            {deleteOpen && (
                <ConfirmDelete
                    open={!!deleteOpen}
                    onChange={(open) => !open && setDeleteOpen(null)}
                    title="Delete Folder"
                    description={`Are you sure you want to delete "${deleteOpen.name}"? This action cannot be undone.`}
                    onConfirm={() =>
                        router.delete(route('folders.destroy', deleteOpen), {
                            preserveScroll: true,
                        })
                    }
                />
            )}
        </SettingLayout>
    );
};

export default Folders;
