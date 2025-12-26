import type { RealmPlugin } from '@mdxeditor/editor';

import { basePlugins } from '@/lib/markdown';
import { cn } from '@/lib/utils';

import { MDXEditor } from '@mdxeditor/editor';

export const MDBase = ({
    value,
    onChange,
    placeholder,
    className,
    plugins = [],
    readOnly = false,
    autoFocus = false,
}: {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    plugins?: RealmPlugin[];
    readOnly?: boolean;
    autoFocus?: boolean;
}) => {
    return (
        <div>
            <MDXEditor
                placeholder={placeholder}
                className={cn('m-0! p-0!', className)}
                markdown={value}
                onChange={(value) => onChange && onChange(value)}
                contentEditableClassName="prose dark:prose-invert p-0!"
                plugins={[...basePlugins(), ...plugins]}
                readOnly={readOnly}
                autoFocus={autoFocus}
            />
        </div>
    );
};
