import { formatDateTime } from '@/lib/format';

export const RenderDateTime = ({ value }: { value: string | null }) => {
    return <span className="text-xs text-muted-foreground">{formatDateTime(value)}</span>;
};
