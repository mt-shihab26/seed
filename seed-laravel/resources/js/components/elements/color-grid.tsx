import type { TColor } from '@/types/enums';

import { COLOR_ARRAY, getColorClasses } from '@/lib/colors';
import { cn } from '@/lib/utils';

import { CheckIcon } from 'lucide-react';

export const ColorGrid = ({
    value,
    onChange,
    className,
}: {
    value: TColor;
    onChange: (color: TColor) => void;
    className?: string;
}) => {
    return (
        <div className={cn('grid grid-cols-5 gap-2', className)}>
            {COLOR_ARRAY.map((color) => {
                const isSelected = value === color.name;
                const colorClasses = getColorClasses(color.name);

                return (
                    <button
                        key={color.name}
                        type="button"
                        onClick={() => onChange(color.name)}
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
    );
};
