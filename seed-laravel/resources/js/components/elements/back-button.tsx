import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

export const BackButton = ({
    href,
    largeLabel,
    smallLabel = 'Back',
}: {
    href: string;
    largeLabel: string;
    smallLabel?: string;
}) => {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
            <ArrowLeftIcon className="size-4" />
            <span className="sm:hidden">{smallLabel}</span>
            <span className="hidden sm:inline">{largeLabel}</span>
        </Link>
    );
};
