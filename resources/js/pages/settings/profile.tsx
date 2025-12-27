import type { TShared } from '@/types/props';

import { formatInitials } from '@/lib/format';
import { toast } from '@/lib/toast';
import { usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Form, Link } from '@inertiajs/react';
import { CalendarIcon, MapPin, Save } from 'lucide-react';

import { DeleteUser } from '@/components/elements/delete-user';
import { HeadingSmall } from '@/components/elements/heading-small';
import { InputError } from '@/components/elements/input-error';

import { SettingLayout } from '@/components/layouts/setting-layout';

const Profile = ({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) => {
    const { props } = usePage<TShared>();

    const handleSaveSettings = () => {
        toast('Settings saved', {
            description: 'Your preferences have been updated successfully.',
        });
    };

    return (
        <SettingLayout title="Profile settings">
            <div className="space-y-6">
                <HeadingSmall
                    title="Profile information"
                    description="Update your name and email address"
                />
                <div>
                    <Avatar className="size-40 border-4 border-accent/20">
                        <AvatarImage
                            src={props.auth.user?.avatar || ''}
                            alt={props.auth.user?.name}
                        />
                        <AvatarFallback className="bg-accent text-2xl text-accent-foreground">
                            {formatInitials(props.auth.user?.name)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <Form
                    action={route('settings.profile.update')}
                    method="patch"
                    className="space-y-6"
                    options={{ preserveScroll: true }}
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={props.auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={props.auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profile-bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={props.auth.user.bio || ''}
                                    rows={4}
                                    placeholder="Tell others about yourself..."
                                    autoComplete="off"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profile-location">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="location"
                                        name="location"
                                        defaultValue={props.auth.user.location || ''}
                                        className="pl-10"
                                        placeholder="City, Country"
                                        autoComplete="address-level2"
                                    />
                                </div>
                            </div>
                            {mustVerifyEmail && props.auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email
                                            address.
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="flex items-center gap-4">
                                <Button disabled={processing} data-test="update-profile-button">
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Management</CardTitle>
                        <CardDescription>Export or delete your data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">Export Notes</p>
                                <p className="text-sm text-muted-foreground">
                                    Download all your notes as JSON
                                </p>
                            </div>
                            <Button variant="outline">Export</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">Delete Account</p>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete your account and all data
                                </p>
                            </div>
                            <Button variant="destructive">Delete</Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button onClick={handleSaveSettings} size="lg">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="space-y-3 rounded-lg border border-border p-4">
                <div className="flex items-center gap-3 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="text-foreground">January 2024</span>
                </div>
            </div>

            <DeleteUser />
        </SettingLayout>
    );
};

export default Profile;
