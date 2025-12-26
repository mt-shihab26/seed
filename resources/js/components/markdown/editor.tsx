import { toolbarPlugin } from '@mdxeditor/editor';

import { BaseEditor } from './base';
import { Toolbar } from './toolbar';

export const Editor = ({
    value,
    onChange,
    placeholder,
    className,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) => {
    return (
        <BaseEditor
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            plugins={[toolbarPlugin({ toolbarContents: () => <Toolbar /> })]}
        />
    );
};
