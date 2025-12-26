import { MDBase } from './md-base';

export const Preview = ({ value, className }: { value: string; className?: string }) => {
    return <MDBase value={value} className={className} readOnly={true} />;
};
