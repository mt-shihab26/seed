import { Plus, Settings } from 'lucide-react';
import { IconLink } from './icon-link';

export const Header = ({ count = 0, title }: { count: number; title: string }) => {
    return (
        <div className="flex w-full items-center space-x-4">
            <div className="flex w-full items-center space-x-4">
                <div className="w-min">
                    <IconLink
                        href={route('settings.notes.show')}
                        icon={Settings}
                        variant="outline"
                    />
                </div>
                <div className="h-0.5 w-full bg-border" />
            </div>
            <div className="w-min text-xl font-bold text-nowrap">
                {title} ({count})
            </div>
            <div className="flex w-full items-center space-x-4">
                <div className="h-0.5 w-full bg-border" />
                <div className="w-min">
                    <IconLink href={route('notes.index')} icon={Plus} />
                </div>
            </div>
        </div>
    );
};
