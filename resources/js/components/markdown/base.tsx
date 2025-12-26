import type { RealmPlugin } from '@mdxeditor/editor';

import { basePlugins } from '@/lib/markdown';

import { MDXEditor } from '@mdxeditor/editor';

export const BaseEditor = ({
    value,
    onChange,
    placeholder,
    className,
    plugins = [],
    readOnly = false,
}: {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    plugins?: RealmPlugin[];
    readOnly?: boolean;
}) => {
    return (
        <MDXEditor
            readOnly={readOnly}
            placeholder={placeholder}
            className={className}
            markdown={value}
            onChange={(value) => onChange && onChange(value)}
            contentEditableClassName="prose dark:prose-invert"
            plugins={[...basePlugins(), ...plugins]}
        />
    );
};
