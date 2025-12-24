import { FolderIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import type { TFolder } from '@/types/models';

import { destroy, store, update } from '@/actions/App/Http/Controllers/FolderController';

import { ColorPicker } from '@/components/elements/color-picker';
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
import type { TColor } from '@/types/models';
import { Form, router } from '@inertiajs/react';

const Folders = ({ folders }: { folders: TFolder[] }) => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingFolder, setEditingFolder] = useState<TFolder | null>(null);

    const handleEdit = (folder: TFolder) => {
        setEditingFolder(folder);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (folder: TFolder) => {
        if (confirm(`Are you sure you want to delete "${folder.name}"?`)) {
            router.delete(destroy.url(folder), {
                preserveScroll: true,
            });
        }
    };

    return (
        <SettingLayout title="Folders">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Manage your folders and their colors
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <PlusIcon className="mr-2 size-4" />
                        New Folder
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {folders.map((folder) => {
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
                                        onClick={() => handleEdit(folder)}
                                    >
                                        <PencilIcon className="size-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => handleDelete(folder)}
                                    >
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {folders.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                        <FolderIcon className="mb-4 size-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-semibold">No folders yet</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Create your first folder to organize your notes
                        </p>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                            <PlusIcon className="mr-2 size-4" />
                            Create Folder
                        </Button>
                    </div>
                )}
            </div>

            <CreateFolderDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
            <EditFolderDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                folder={editingFolder}
            />
        </SettingLayout>
    );
};

function CreateFolderDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <Form
                    {...store.form()}
                    onSuccess={() => onOpenChange(false)}
                    resetOnSuccess
                    className="space-y-4"
                >
                    {({ data, setData, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Create Folder</DialogTitle>
                                <DialogDescription>
                                    Add a new folder to organize your notes
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name || ''}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter folder name"
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>Color</Label>
                                    <ColorPicker
                                        value={(data.color as TColor) || 'gray'}
                                        onChange={(color) => setData('color', color)}
                                    />
                                    {errors.color && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.color}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function EditFolderDialog({
    open,
    onOpenChange,
    folder,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    folder: TFolder | null;
}) {
    if (!folder) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <Form
                    {...update.form(folder)}
                    method="patch"
                    onSuccess={() => onOpenChange(false)}
                    className="space-y-4"
                >
                    {({ data, setData, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Edit Folder</DialogTitle>
                                <DialogDescription>Update folder name and color</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={folder.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter folder name"
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>Color</Label>
                                    <ColorPicker
                                        value={(data.color as TColor) || folder.color}
                                        onChange={(color) => setData('color', color)}
                                    />
                                    {errors.color && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.color}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default Folders;
