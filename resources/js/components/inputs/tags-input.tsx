import type { TTag } from '@/types/models';

import { useState } from 'react';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { TagForm } from '@/components/forms/tag-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon, PlusIcon, TagIcon, XIcon } from 'lucide-react';

export const TagsInput = ({
    value,
    tags,
    onChange,
}: {
    value: TTag[];
    tags?: TTag[];
    onChange?: (tags: TTag[]) => void;
}) => {
    const [open, setOpen] = useState(false);

    const handleTagToggle = (tag: TTag) => {
        const currentTags = value || [];
        const isSelected = currentTags.some((t) => t.id === tag.id);

        if (isSelected) {
            onChange(currentTags.filter((t) => t.id !== tag.id));
        } else {
            onChange([...currentTags, tag]);
        }
    };

    const handleRemoveTag = (tagId: string) => {
        onChange((value || []).filter((t) => t.id !== tagId));
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {value && value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => handleRemoveTag(tag.id)}
                            className="group relative"
                        >
                            <ColoredBadge type="tag" color={tag.color}>
                                {tag.name}
                                <XIcon className="size-3 opacity-70 transition-opacity group-hover:opacity-100" />
                            </ColoredBadge>
                        </button>
                    ))}
                </div>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto gap-1 border-0 bg-transparent p-0 hover:bg-transparent"
                    >
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <PlusIcon className="size-4" />
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Your Tags</Label>
                            <div className="selector-scrollbar grid gap-2 overflow-y-auto">
                                {tags.map((tag) => {
                                    const isSelected = (value || []).some((t) => t.id === tag.id);
                                    return (
                                        <button
                                            key={tag.id}
                                            type="button"
                                            onClick={() => handleTagToggle(tag)}
                                            className="flex items-center justify-between text-left transition-colors hover:bg-muted"
                                        >
                                            <ColoredBadge type="tag" color={tag.color}>
                                                <TagIcon className="size-4" />
                                                {tag.name}
                                            </ColoredBadge>
                                            {isSelected && (
                                                <CheckIcon className="size-4 text-primary" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <TagForm />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
