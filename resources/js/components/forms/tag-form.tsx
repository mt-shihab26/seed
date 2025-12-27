import type { TColor } from '@/types/enums';
import type { TTag } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { ColorPicker } from '@/components/elements/color-picker';
import { InputError } from '@/components/elements/input-error';
import { SubmitButton } from '@/components/elements/submit-button';
import { Input } from '@/components/ui/input';

export const TagForm = ({ tag, onSuccess }: { tag?: TTag; onSuccess?: () => void }) => {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: tag?.name || '',
        color: (tag?.color || 'gray') as TColor,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (tag) {
                    patch(route('tags.update', tag), {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                            onSuccess?.();
                        },
                    });
                } else {
                    post(route('tags.store'), {
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
                    placeholder={tag ? 'Edit tag name' : 'Enter new tag name'}
                    className="h-7"
                />
                <ColorPicker value={data.color} onChange={(color) => setData('color', color)} />
                <SubmitButton
                    editing={!!tag}
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
