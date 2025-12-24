import type { TColor } from '@/types/enums';
import type { TFolder } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { ColorPicker } from '@/components/elements/color-picker';
import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, SaveIcon } from 'lucide-react';

export const FolderForm = ({ folder }: { folder?: TFolder }) => {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: folder?.name || '',
        color: (folder?.color || 'gray') as TColor,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (folder) {
                    patch(route('folders.update', folder), {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                        },
                    });
                } else {
                    post(route('folders.store'), {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                        },
                    });
                }
            }}
        >
            <div className="flex gap-2">
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder={folder ? 'Edit folder name' : 'Enter new folder name'}
                    className="h-7"
                />
                <ColorPicker value={data.color} onChange={(color) => setData('color', color)} />
                <Button variant="outline" type="submit" disabled={processing} size="sm">
                    {folder ? (
                        <>
                            <SaveIcon className="mr-2 size-4" />
                            {processing ? 'Saving...' : 'Save'}
                        </>
                    ) : (
                        <>
                            <PlusIcon className="mr-2 size-4" />
                            {processing ? 'Adding...' : 'Add'}
                        </>
                    )}
                </Button>
            </div>
            <InputError message={errors.name || errors.color} />
        </form>
    );
};
