import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export const CancelButton = ({
    onClick,
    label = 'Cancel',
}: {
    onClick: () => void;
    label?: string;
}) => {
    return (
        <Button type="button" variant="outline" onClick={onClick}>
            <XIcon className="size-4" />
            {label}
        </Button>
    );
};
