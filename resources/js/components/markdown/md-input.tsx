import { MDBase } from './md-base';

export const MDInput = ({
    value,
    onChange,
    placeholder,
    className,
    autoFocus,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    autoFocus?: boolean;
}) => {
    return (
        <MDBase
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            autoFocus={autoFocus}
        />
    );
};
