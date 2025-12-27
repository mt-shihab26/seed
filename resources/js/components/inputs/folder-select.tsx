import { useState } from 'react';

import type { TFolder } from '@/types/models';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { FolderForm } from '@/components/forms/folder-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { CheckIcon, FolderIcon } from 'lucide-react';

export const FolderSelect = ({
    value,
    onChange,
    folders,
}: {
    value: TFolder | null;
    onChange: (folder: TFolder | null) => void;
    folders: TFolder[];
}) => {
    const [open, setOpen] = useState(false);

    const handleFolderSelect = (folder: TFolder) => {
        onChange(folder);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto border-0 bg-transparent p-0 pr-1 hover:bg-transparent"
                >
                    {value ? (
                        <ColoredBadge type="folder" color={value.color}>
                            {value.name}
                        </ColoredBadge>
                    ) : (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <FolderIcon className="size-4" />
                            Select folder
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Your Folders</Label>
                        <div className="grid max-h-60 gap-2 overflow-y-auto">
                            {folders.map((folder) => (
                                <button
                                    key={folder.id}
                                    type="button"
                                    onClick={() => handleFolderSelect(folder)}
                                    className="flex items-center justify-between rounded-md border border-border p-2 text-left transition-colors hover:bg-muted"
                                >
                                    <ColoredBadge type="folder" color={folder.color}>
                                        {folder.name}
                                    </ColoredBadge>
                                    {value?.id === folder.id && (
                                        <CheckIcon className="size-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <FolderForm />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
