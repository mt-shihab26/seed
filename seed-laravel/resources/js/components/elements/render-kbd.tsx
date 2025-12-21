import { formatKey } from '@/lib/shortcut';

import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Fragment } from 'react';

export const RenderKDB = ({ keys }: { keys: string[] }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <KbdGroup>
                {keys.map((key, index) => (
                    <Fragment key={key}>
                        {!!index && <span>+</span>}
                        <Kbd key={`${key}-${index}`}>{formatKey(key)}</Kbd>
                    </Fragment>
                ))}
            </KbdGroup>
        </div>
    );
};
