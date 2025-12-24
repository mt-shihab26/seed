import type { TTag } from '@/types/models';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const Tags = ({
    values,
    onChange,
    tags,
}: {
    values: TTag[];
    onChange: (values: TTag[]) => void;
    tags: TTag[];
}) => {
    return (
        <div className="space-y-2">
            <Label>Select tags to organize your note</Label>
            <div className="grid gap-3 space-y-3 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2">
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
        </div>
    );
};
