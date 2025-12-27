import type { TColor } from '@/types/enums';
import type { TFolder } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { ColorPicker } from '@/components/elements/color-picker';
import { InputError } from '@/components/elements/input-error';
import { SubmitButton } from '@/components/elements/submit-button';
import { Input } from '@/components/ui/input';

export const FolderForm = ({ folder, onSuccess }: { folder?: TFolder; onSuccess?: () => void }) => {
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
                            onSuccess?.();
                        },
                    });
                } else {
                    post(route('folders.store'), {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                            onSuccess?.();
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
                <SubmitButton
                    editing={!!folder}
                    processing={processing}
                    size="sm"
                    editingLabel="Save"
                    createLabel="Add"
                />
            </div>
            <InputError message={errors.name || errors.color} />
        </form>
    );
};
