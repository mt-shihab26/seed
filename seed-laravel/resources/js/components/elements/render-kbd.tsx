import { formatKey } from '@/lib/shortcut';

import { Kbd, KbdGroup } from '@/components/ui/kbd';

export const RenderKDB = ({ keys }: { keys: string[] }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <KbdGroup>
                {keys.map((key, index) => (
                    <>
                        {!!index && <span>+</span>}
                        <Kbd key={`${key}-${index}`}>{formatKey(key)}</Kbd>
                    </>
                ))}
            </KbdGroup>
        </div>
    );
};
