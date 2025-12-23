import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { SettingsLayout } from '@/components/layouts/settings-layout';

const Notification = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);

    return (
        <SettingsLayout title="Notification settings">
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about your notes
                            </p>
                        </div>
                        <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="auto-save">Auto-save</Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically save notes as you type
                            </p>
                        </div>
                        <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                    </div>
                </CardContent>
            </Card>
        </SettingsLayout>
    );
};

export default Notification;
