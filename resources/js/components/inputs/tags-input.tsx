import type { TTag } from '@/types/models';

import { ColoredBadge } from '@/components/elements/colored-badge';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export const TagsInput = ({
    value,
    tags,
    onChange,
}: {
    value?: TTag[];
    tags: TTag[];
    onChange: (tags: TTag[]) => void;
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            {value && value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <ColoredBadge type="tag" key={tag.id} color={tag.color}>
                            {tag.name}
                        </ColoredBadge>
                    ))}
                </div>
            )}
            <Button>
                <PlusIcon className="size-4" />
            </Button>
        </div>
    );
};
