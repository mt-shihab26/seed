import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { PlusIcon, SaveIcon } from 'lucide-react';

export const SubmitButton = ({
    editing = false,
    processing = false,
    onClick,
    createLabel = 'Create Now',
    editingLabel = 'Save Changes',
    size = 'default',
}: {
    editing: boolean;
    processing: boolean;
    onClick?: () => void;
    createLabel?: string;
    editingLabel?: string;
    size?: 'default' | 'sm';
}) => {
    return (
        <Button size={size} type="submit" disabled={processing} onClick={onClick}>
            {processing ? (
                <Spinner className="size-4" />
            ) : editing ? (
                <SaveIcon className="size-4" />
            ) : (
                <PlusIcon className="size-4" />
            )}
            {editing ? editingLabel : createLabel}
        </Button>
    );
};
