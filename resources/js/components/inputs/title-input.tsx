import { cn } from '@/lib/utils';

import { Markdown } from '@/components/elements/markdown';

export const TitleInput = ({
    value,
    onChange,
    placeholder,
    className,
    readOnly,
    autoFocus,
}: {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    autoFocus?: boolean;
}) => {
    return (
        <Markdown
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn('font-bold prose-p:text-3xl', className)}
            readOnly={readOnly}
            autoFocus={autoFocus}
        />
    );
};
