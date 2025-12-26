import { MDBase } from '@/components/markdown/md-base';

export const TitleInput = ({
    value,
    onChange,
    placeholder,
    className,
    readOnly,
    autoFocus,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    autoFocus?: boolean;
}) => {
    return (
        <MDBase
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            readOnly={readOnly}
            autoFocus={autoFocus}
        />
    );
};
