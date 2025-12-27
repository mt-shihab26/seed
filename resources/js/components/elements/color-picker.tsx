import type { TColor } from '@/types/enums';

import { COLOR_ARRAY, getColorClasses } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CheckIcon } from 'lucide-react';

export const ColorPicker = ({
    value,
    onChange,
}: {
    value: TColor;
    onChange: (color: TColor) => void;
}) => {
    const [open, setOpen] = useState(false);

    const colorClasses = getColorClasses(value);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
                    <div className={`size-4 rounded ${colorClasses.bg}`} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="grid grid-cols-5 gap-2">
                    {COLOR_ARRAY.map((color) => {
                        const isSelected = value === color.name;
                        const colorClasses = getColorClasses(color.name);

                        return (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => {
                                    onChange(color.name);
                                    setOpen(false);
                                }}
                                className={cn(
                                    'relative flex size-10 items-center justify-center rounded-md border-2 transition-all',
                                    colorClasses.bg,
                                    isSelected
                                        ? 'scale-110 border-foreground ring-2 ring-ring ring-offset-2'
                                        : 'border-transparent hover:scale-105',
                                )}
                                aria-label={`Select ${color.label} color`}
                                aria-pressed={isSelected}
                            >
                                {isSelected && <CheckIcon className="size-5 text-white" />}
                            </button>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};
