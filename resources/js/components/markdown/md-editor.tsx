import { toolbarPlugin } from '@mdxeditor/editor';

import { MDBase } from './md-base';
import { MDToolbar } from './md-toolbar';

export const MDEditor = ({
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
            plugins={[toolbarPlugin({ toolbarContents: () => <MDToolbar /> })]}
            autoFocus={autoFocus}
        />
    );
};
