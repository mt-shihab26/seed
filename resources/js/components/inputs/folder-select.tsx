import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { TFolder } from '@/types/models';

import { ColoredBadge } from '@/components/elements/colored-badge';

export const FolderSelect = ({
    value,
    onChange,
    folders,
}: {
    value: TFolder | null;
    onChange: (folder: TFolder | null) => void;
    folders: TFolder[];
}) => {
    return (
        <Select
            value={value?.id}
            onValueChange={(folderId) => onChange(folders.find((f) => f.id === folderId) || null)}
        >
            <SelectTrigger className="h-auto! border-0! bg-transparent! p-0! pr-1! focus:outline-none! focus-visible:ring-0! focus-visible:ring-offset-0!">
                <SelectValue placeholder="Select a folder" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Folders</SelectLabel>
                    {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                            <ColoredBadge type="folder" color={folder.color}>
                                {folder.name}
                            </ColoredBadge>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
