import type { TNote } from '@/types/models';

import { BackButton } from '@/components/elements/back-button';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';

export const Header = ({ note }: { note: TNote }) => {
    return (
        <div className="flex items-center justify-between gap-4 pt-6">
            <BackButton href={route('notes.index')} largeLabel="Back to notes" />
            <div className="flex gap-2">
                <Link href={route('notes.edit', note)}>
                    <Button size="sm" variant="outline">
                        <EditIcon className="size-4 sm:mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
