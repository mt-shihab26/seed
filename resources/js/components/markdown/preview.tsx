import { BaseEditor } from './base';

export const Editor = ({ value, className }: { value: string; className?: string }) => {
    return <BaseEditor value={value} className={className} readOnly={true} />;
};
