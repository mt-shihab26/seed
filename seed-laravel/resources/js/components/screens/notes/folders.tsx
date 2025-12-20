import type { TNote } from '@/types/models';

import { getFoldersFromNotes } from '@/lib/notes';
import { useNotesFilterStore } from '@/stores/notes-filter-store';

import { Button } from '@/components/ui/button';
import { Folder } from 'lucide-react';

export const Folders = ({ notes }: { notes: TNote[] }) => {
    const { selectedFolderID, toggleFolder } = useNotesFilterStore();

    const folders = getFoldersFromNotes(notes);

    return (
        <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Folder className="h-4 w-4" />
                Folders
            </h3>
            <div className="space-y-1">
                {folders.map((folder) => (
                    <Button
                        key={folder.id}
                        className="w-full justify-start"
                        onClick={() => toggleFolder(folder.id)}
                        variant={selectedFolderID === folder.id ? 'secondary' : 'ghost'}
                    >
                        {folder?.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};
