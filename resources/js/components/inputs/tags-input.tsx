import type { TTag } from '@/types/models';

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
    readOnly = false,
}: {
    value: TTag[];
    tags?: TTag[];
    onChange?: (tags: TTag[]) => void;
    readOnly?: boolean;
}) => {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {value && value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((tag) => (
                        <div key={tag.id}>
                            {readOnly ? (
                                <ColoredBadge type="tag" color={tag.color}>
                                    <TagIcon className="size-4" />
                                    {tag.name}
                                </ColoredBadge>
                            ) : (
                                <button
                                    type="button"
                                    className="group relative"
                                    onClick={() => {
                                        if (!onChange) return;
                                        onChange((value || []).filter((t) => t.id !== tag.id));
                                    }}
                                >
                                    <ColoredBadge type="tag" color={tag.color}>
                                        <TagIcon className="size-4" />
                                        {tag.name}
                                        <XIcon className="size-3 opacity-70 transition-opacity group-hover:opacity-100" />
                                    </ColoredBadge>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!readOnly && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto gap-1 border-0 bg-transparent p-0 hover:bg-transparent"
                        >
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <PlusIcon className="size-4" />{' '}
                                {value.length === 0 && <span>Add Tag</span>}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Your Tags</Label>
                                <div className="selector-scrollbar grid gap-2 overflow-y-auto">
                                    {tags?.map((tag) => {
                                        const isSelected = (value || []).some(
                                            (t) => t.id === tag.id,
                                        );
                                        return (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                onClick={() => {
                                                    if (!onChange) return;

                                                    const currentTags = value || [];
                                                    const isSelected = currentTags.some(
                                                        (t) => t.id === tag.id,
                                                    );

                                                    if (isSelected) {
                                                        onChange(
                                                            currentTags.filter(
                                                                (t) => t.id !== tag.id,
                                                            ),
                                                        );
                                                    } else {
                                                        onChange([...currentTags, tag]);
                                                    }
                                                }}
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
            )}
        </div>
    );
};
