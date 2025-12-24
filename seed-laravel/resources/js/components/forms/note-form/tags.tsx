import type { TColor } from '@/types/enums';
import type { TTag } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { ColorPicker } from '@/components/elements/color-picker';
import { ColoredBadge } from '@/components/elements/colored-badge';
import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon } from 'lucide-react';

export const Tags = ({
    values,
    onChange,
    tags,
}: {
    values: TTag[];
    onChange: (values: TTag[]) => void;
    tags: TTag[];
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: 'gray' as TColor,
    });

    return (
        <div className="space-y-4 border border-border bg-muted/30 p-4">
            <Label>Select tags to organize your note</Label>
            <div className="grid grid-cols-4 gap-2">
                {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`tag-${tag.id}`}
                            name={`tag-${tag.id}`}
                            value={tag.id}
                            checked={values?.some((t) => t.id === tag.id)}
                            onCheckedChange={(checked) => {
                                onChange(
                                    checked
                                        ? [...values, tag]
                                        : values.filter((t) => t.id !== tag.id),
                                );
                            }}
                        />
                        <Label
                            htmlFor={`tag-${tag.id}`}
                            className="flex flex-1 cursor-pointer items-center gap-2 font-normal"
                        >
                            <ColoredBadge type="tag" color={tag.color} className="text-xs">
                                {tag.name}
                            </ColoredBadge>
                        </Label>
                    </div>
                ))}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('tags.store'), {
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
                        placeholder="Enter new tag name"
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
