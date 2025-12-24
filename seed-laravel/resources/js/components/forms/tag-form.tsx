import type { TColor } from '@/types/enums';
import type { TTag } from '@/types/models';

import { useForm } from '@inertiajs/react';

import { ColorPicker } from '@/components/elements/color-picker';
import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, SaveIcon } from 'lucide-react';

export const TagForm = ({ tag }: { tag?: TTag }) => {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: tag?.name || '',
        color: (tag?.color || 'gray') as TColor,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (tag) {
                    patch(route('tags.update'), {
                        preserveScroll: true,
                        onSuccess: () => {
                            reset();
                        },
                    });
                } else {
                    post(route('tags.store'), {
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
                    placeholder={tag ? 'Edit tag name' : 'Enter new tag name'}
                    className="h-7"
                />
                <ColorPicker value={data.color} onChange={(color) => setData('color', color)} />
                <Button type="submit" disabled={processing} size="sm">
                    {tag ? (
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
