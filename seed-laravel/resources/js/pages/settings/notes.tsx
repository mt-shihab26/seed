import { Calendar } from 'lucide-react';

import { SettingLayout } from '@/components/layouts/setting-layout';

const Notes = () => {
    return (
        <SettingLayout title="Notes settings">
            <div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-3">
                <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">47</p>
                    <p className="text-sm text-muted-foreground">Total Notes</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-sm text-muted-foreground">Folders</p>
                </div>
            </div>
            <div className="space-y-3 rounded-lg border border-border p-4">
                <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="text-foreground">January 2024</span>
                </div>
            </div>
        </SettingLayout>
    );
};

export default Notes;
