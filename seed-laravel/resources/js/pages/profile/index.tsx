import {
    ArrowLeft,
    Calendar,
    Mail,
    MapPin,
    Sprout,
    Upload,
} from 'lucide-react';

import { toast } from '@/lib/toast';
import { useState } from 'react';

import { UserNav } from '@/components/screens/notes/user-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';

export default function ProfilePage() {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState(
        'Passionate developer learning web frameworks through building projects.',
    );
    const [location, setLocation] = useState('San Francisco, CA');

    const handleSaveProfile = () => {
        toast('Profile updated', {
            description: 'Your profile has been saved successfully.',
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
                        Profile
                    </h1>
                    <p className="mt-2 text-pretty text-muted-foreground">
                        Manage your public profile information
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Profile Picture */}
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

                    {/* Profile Information */}
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="profile-name">Full Name</Label>
                                <Input
                                    id="profile-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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

                            {/* Account Stats */}
                            <div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-3">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-foreground">
                                        47
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Total Notes
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-foreground">
                                        8
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Favorites
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-foreground">
                                        12
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Folders
                                    </p>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="space-y-3 rounded-lg border border-border p-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        Email:
                                    </span>
                                    <span className="text-foreground">
                                        john@example.com
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        Joined:
                                    </span>
                                    <span className="text-foreground">
                                        January 2024
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button onClick={handleSaveProfile} size="lg">
                            Save Profile
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
