import type { TFolder } from '@/types/models';

import { useState } from 'react';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { FolderForm } from '@/components/forms/folder-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon, ChevronDownIcon, FolderIcon } from 'lucide-react';

export const FolderInput = ({
    value,
    onChange,
    folders,
    readOnly = false,
}: {
    value: TFolder | null;
    onChange?: (folder: TFolder | null) => void;
    folders?: TFolder[];
    readOnly?: boolean;
}) => {
    const [open, setOpen] = useState(false);

    if (readOnly) {
        return value ? (
            <ColoredBadge type="folder" color={value.color}>
                <FolderIcon className="size-4" />
                {value.name}
            </ColoredBadge>
        ) : null;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto cursor-pointer gap-1 border-0 bg-transparent p-0 pr-1 hover:bg-transparent"
                >
                    {value ? (
                        <ColoredBadge type="folder" color={value.color}>
                            <FolderIcon className="size-4" />
                            {value.name}
                        </ColoredBadge>
                    ) : (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <FolderIcon className="size-4" />
                            Select folder
                        </span>
                    )}
                    <ChevronDownIcon className="size-4 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Your Folders</Label>
                        <div className="folder-selector-scrollbar grid gap-2 overflow-y-auto">
                            {folders?.map((folder) => (
                                <button
                                    key={folder.id}
                                    type="button"
                                    className="flex items-center justify-between text-left transition-colors hover:bg-muted"
                                    onClick={() => {
                                        if (!onChange) return;
                                        onChange(folder);
                                        setOpen(false);
                                    }}
                                >
                                    <ColoredBadge type="folder" color={folder.color}>
                                        <FolderIcon className="size-4" />
                                        {folder.name}
                                    </ColoredBadge>
                                    {value?.id === folder.id && (
                                        <CheckIcon className="size-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <FolderForm />
                </div>
            </PopoverContent>
        </Popover>
    );
};
