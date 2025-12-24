import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';

export const Editor = ({
    id,
    name,
    value,
    onChange,
    placeholder,
    className,
    required,
}: {
    id: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
}) => {
    return (
        <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            className={cn('h-auto! resize-y py-3! text-base!', className)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
        />
    );
};
