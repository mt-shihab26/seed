import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { toast } from '@/lib/toast';
import { useState } from 'react';

import { UserNav } from '@/components/screens/notes/user-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Save, Sprout } from 'lucide-react';

export default function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(true);
    const [compactView, setCompactView] = useState(false);
    const [defaultFolder, setDefaultFolder] = useState('Learning');

    const handleSaveSettings = () => {
        toast('Settings saved', {
            description: 'Your preferences have been updated successfully.',
        });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/notes" className="flex items-center gap-2">
                            <Sprout className="h-6 w-6 text-accent" />
                            <span className="text-xl font-semibold text-foreground">
                                Seed
                            </span>
                        </Link>
                        <UserNav />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link href="/notes">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Notes
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground">
                        Settings
                    </h1>
                    <p className="mt-2 text-pretty text-muted-foreground">
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Account Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>
                                Update your account details and personal
                                information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    placeholder="Tell us about yourself"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>
                                Manage your password and security preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">
                                    Current Password
                                </Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">
                                    New Password
                                </Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">
                                    Confirm New Password
                                </Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Configure how you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-notifications">
                                        Email Notifications
                                    </Label>
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
                                <Switch
                                    id="auto-save"
                                    checked={autoSave}
                                    onCheckedChange={setAutoSave}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Display Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Preferences</CardTitle>
                            <CardDescription>
                                Customize how your notes are displayed
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="compact-view">
                                        Compact View
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show more notes per page
                                    </p>
                                </div>
                                <Switch
                                    id="compact-view"
                                    checked={compactView}
                                    onCheckedChange={setCompactView}
                                />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label htmlFor="default-folder">
                                    Default Folder
                                </Label>
                                <Select
                                    value={defaultFolder}
                                    onValueChange={setDefaultFolder}
                                >
                                    <SelectTrigger id="default-folder">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Learning">
                                            Learning
                                        </SelectItem>
                                        <SelectItem value="Work">
                                            Work
                                        </SelectItem>
                                        <SelectItem value="Personal">
                                            Personal
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Export & Data */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                            <CardDescription>
                                Export or delete your data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">
                                        Export Notes
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Download all your notes as JSON
                                    </p>
                                </div>
                                <Button variant="outline">Export</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">
                                        Delete Account
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Permanently delete your account and all
                                        data
                                    </p>
                                </div>
                                <Button variant="destructive">Delete</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} size="lg">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
