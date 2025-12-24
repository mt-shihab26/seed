import type { TColor } from '@/types/enums';
import type { TFolder } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { ColorPicker } from '@/components/elements/color-picker';
import { ColoredBadge } from '@/components/elements/colored-badge';
import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusIcon } from 'lucide-react';

export const Folders = ({
    value,
    onChange,
    folders,
}: {
    value?: string;
    onChange: (value: string) => void;
    folders: TFolder[];
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: 'gray' as TColor,
    });

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
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('folders.store'), {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                        },
                    });
                }}
            >
                <div className="flex gap-2">
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter new folder name"
                        className="h-7"
                    />
                    <ColorPicker value={data.color} onChange={(color) => setData('color', color)} />
                    <Button type="submit" disabled={processing} size="sm">
                        <PlusIcon className="mr-2 size-4" />
                        {processing ? 'Adding...' : 'Add'}
                    </Button>
                </div>
                <InputError message={errors.name || errors.color} />
            </form>
        </div>
    );
};
