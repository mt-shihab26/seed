import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Calendar, Mail, Upload } from 'lucide-react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { toast } from '@/lib/toast';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Link } from '@inertiajs/react';
import { Save } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { MapPin } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import AppLayout from '@/components/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;

    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState(
        'Passionate developer learning web frameworks through building projects.',
    );
    const [location, setLocation] = useState('San Francisco, CA');

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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                                <Avatar className="h-24 w-24 border-4 border-accent/20">
                                    <AvatarImage
                                        src="/placeholder.svg"
                                        alt={name}
                                    />
                                    <AvatarFallback className="bg-accent text-2xl text-accent-foreground">
                                        {name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                                        {name}
                                    </h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        john@example.com
                                    </p>
                                    <Button variant="outline" size="sm">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Photo
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="profile-bio">Bio</Label>
                                    <Textarea
                                        id="profile-bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        placeholder="Tell others about yourself..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="profile-location">
                                        Location
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="profile-location"
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(e.target.value)
                                            }
                                            className="pl-10"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                {/* Account Stats */}
                <div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-3">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">47</p>
                        <p className="text-sm text-muted-foreground">
                            Total Notes
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">8</p>
                        <p className="text-sm text-muted-foreground">
                            Favorites
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-sm text-muted-foreground">Folders</p>
                    </div>
                </div>

                {/* Account Details */}
                <div className="space-y-3 rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-foreground">
                            john@example.com
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Joined:</span>
                        <span className="text-foreground">January 2024</span>
                    </div>
                </div>

                <div className="space-y-6">
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

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
