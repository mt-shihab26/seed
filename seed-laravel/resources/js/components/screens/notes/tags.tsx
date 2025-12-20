import { Tag } from 'lucide-react';

import type { TNote } from '@/types/models';

import { getTagsFromNotes } from '@/lib/notes';
import { useNotesFilterStore } from '@/stores/notes-filter-store';

import { Badge } from '@/components/ui/badge';

export const Tags = ({ notes }: { notes: TNote[] }) => {
    const { selectedTagIDs, toggleTag } = useNotesFilterStore();

    const tags = getTagsFromNotes(notes);

    return (
        <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Tag className="h-4 w-4" />
                Tags
            </h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge
                        key={tag.name}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag.id)}
                        variant={selectedTagIDs?.includes(tag.id) ? 'default' : 'outline'}
                    >
                        #{tag.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
};
