import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { PlusIcon, SaveIcon } from 'lucide-react';

export const SubmitButton = ({
    editing = false,
    processing = false,
    onClick,
}: {
    editing: boolean;
    processing: boolean;
    onClick?: () => void;
}) => {
    return (
        <Button type="submit" disabled={processing} onClick={onClick}>
            {processing ? (
                <Spinner className="size-4" />
            ) : editing ? (
                <SaveIcon className="size-4" />
            ) : (
                <PlusIcon className="size-4" />
            )}
            {editing ? 'Save Changes' : 'Create Now'}
        </Button>
    );
};
