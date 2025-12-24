import type { TFolder } from '@/types/models';

import { FolderForm } from '@/components/forms/folder-form';
import { ColoredBadge } from '@/components/elements/colored-badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const Folders = ({
    value,
    onChange,
    folders,
}: {
    value?: string;
    onChange: (value: string) => void;
    folders: TFolder[];
}) => {
    return (
        <div className="space-y-4 border border-border bg-muted/30 p-4">
            <Label>Select folder to organize your note</Label>
            <RadioGroup value={value} onValueChange={onChange}>
                <div className="grid grid-cols-2 gap-2">
                    {folders.map((folder) => (
                        <div key={folder.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={folder.id} id={`folder-${folder.id}`} />
                            <Label
                                htmlFor={`folder-${folder.id}`}
                                className="flex flex-1 cursor-pointer items-center gap-2 font-normal"
                            >
                                <ColoredBadge type="folder" color={folder.color} className="text-xs">
                                    {folder.name}
                                </ColoredBadge>
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
            <FolderForm />
        </div>
    );
};
