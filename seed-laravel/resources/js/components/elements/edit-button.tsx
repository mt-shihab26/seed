import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';

export const EditButton = ({ href }: { href: string }) => {
    return (
        <div className="flex gap-2">
            <Link href={href}>
                <Button size="sm" variant="outline">
                    <EditIcon className="size-4 sm:mr-2" />
                    <span className="hidden sm:inline">Edit</span>
                </Button>
            </Link>
        </div>
    );
};
