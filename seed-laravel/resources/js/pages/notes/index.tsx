import {
    Archive,
    Edit,
    Filter,
    Folder,
    Plus,
    Search,
    Sprout,
    Star,
    Tag,
    Trash2,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TNote } from '@/types/models';

import { useState } from 'react';

import { NoteDialog } from '@/components/screens/notes/note-dialog';
import { UserNav } from '@/components/screens/notes/user-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';

const Index = () => {
    const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [showTrashed, setShowTrashed] = useState(false);

    const [notes, setNotes] = useState<TNote[]>([
        {
            id: '1',
            title: 'Understanding React Hooks',
            content:
                'useState and useEffect are fundamental hooks that every React developer should master...',
            created_at: '2024-01-15',
            updated_at: '2024-01-15',
            tags: ['react', 'javascript'],
            folder: 'Learning',
            favorited: true,
            archived: false,
            trashed: false,
        },
        {
            id: '2',
            title: 'Laravel Routing Basics',
            content:
                'Routes in Laravel are defined in the routes directory. The most common file is web.php...',
            created_at: '2024-01-14',
            updated_at: '2024-01-14',
            tags: ['laravel', 'php'],
            folder: 'Learning',
            favorited: false,
            archived: false,
            trashed: false,
        },
        {
            id: '3',
            title: 'Ruby on Rails MVC Pattern',
            content:
                'Rails follows the Model-View-Controller pattern strictly. Models handle data logic...',
            created_at: '2024-01-13',
            updated_at: '2024-01-13',
            tags: ['rails', 'ruby'],
            folder: 'Learning',
            favorited: false,
            archived: false,
            trashed: false,
        },
        {
            id: '4',
            title: 'Meeting Notes - Project Planning',
            content:
                'Discussed timeline, milestones, and team responsibilities for the upcoming quarter...',
            created_at: '2024-01-12',
            updated_at: '2024-01-12',
            tags: ['meeting', 'planning'],
            folder: 'Work',
            favorited: false,
            archived: false,
            trashed: false,
        },
    ]);

    const folders = Array.from(new Set(notes.map((note) => note.folder)));
    const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

    const filteredNotes = notes.filter((note) => {
        const matchesSearch =
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFolder = !selectedFolder || note.folder === selectedFolder;
        const matchesTags =
            selectedTags.length === 0 || selectedTags.some((tag) => note.tags.includes(tag));
        const matchesFavorite = !showFavorites || note.favorited;
        const matchesArchived = showArchived ? note.archived : !note.archived;
        const matchesTrashed = showTrashed ? note.trashed : !note.trashed;

        return (
            matchesSearch &&
            matchesFolder &&
            matchesTags &&
            matchesFavorite &&
            matchesArchived &&
            matchesTrashed
        );
    });

    const handleNoteClick = (note: TNote) => {
        setSelectedNote(note);
        setIsDialogOpen(true);
    };

    const handleUpdateNote = (updatedNote: TNote) => {
        setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
        setSelectedNote(updatedNote);
    };

    const handleCreateNote = (newNote: TNote) => {
        setNotes([newNote, ...notes]);
        setIsNewNoteDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        setNotes(notes.map((note) => (note.id === id ? { ...note, trashed: true } : note)));
    };

    const toggleFavorite = (id: string) => {
        setNotes(
            notes.map((note) => (note.id === id ? { ...note, favorited: !note.favorited } : note)),
        );
    };

    const toggleArchive = (id: string) => {
        setNotes(
            notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note)),
        );
    };

    const toggleTagFilter = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-card">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/notes" className="flex items-center gap-2">
                            <Sprout className="h-6 w-6 text-accent" />
                            <span className="text-xl font-semibold text-foreground">Seed</span>
                        </Link>
                        <UserNav />
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-7xl">
                <aside className="hidden w-64 border-r border-border bg-card/50 p-6 lg:block">
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Folder className="h-4 w-4" />
                                Folders
                            </h3>
                            <div className="space-y-1">
                                <Button
                                    variant={selectedFolder === null ? 'secondary' : 'ghost'}
                                    className="w-full justify-start"
                                    onClick={() => setSelectedFolder(null)}
                                >
                                    All Notes
                                </Button>
                                {folders.map((folder) => (
                                    <Button
                                        key={folder}
                                        variant={selectedFolder === folder ? 'secondary' : 'ghost'}
                                        className="w-full justify-start"
                                        onClick={() => setSelectedFolder(folder)}
                                    >
                                        {folder}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                                <Tag className="h-4 w-4" />
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                                        className="cursor-pointer"
                                        onClick={() => toggleTagFilter(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-foreground">
                                Quick Filters
                            </h3>
                            <div className="space-y-1">
                                <Button
                                    variant={showFavorites ? 'secondary' : 'ghost'}
                                    className="w-full justify-start"
                                    onClick={() => setShowFavorites(!showFavorites)}
                                >
                                    <Star className="mr-2 h-4 w-4" />
                                    Favorites
                                </Button>
                                <Button
                                    variant={showArchived ? 'secondary' : 'ghost'}
                                    className="w-full justify-start"
                                    onClick={() => setShowArchived(!showArchived)}
                                >
                                    <Archive className="mr-2 h-4 w-4" />
                                    Archived
                                </Button>
                                <Button
                                    variant={showTrashed ? 'secondary' : 'ghost'}
                                    className="w-full justify-start"
                                    onClick={() => setShowTrashed(!showTrashed)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Trash
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1 sm:max-w-md">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="lg:hidden">
                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuCheckboxItem
                                        checked={showFavorites}
                                        onCheckedChange={setShowFavorites}
                                    >
                                        <Star className="mr-2 h-4 w-4" />
                                        Favorites
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={showArchived}
                                        onCheckedChange={setShowArchived}
                                    >
                                        <Archive className="mr-2 h-4 w-4" />
                                        Archived
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={showTrashed}
                                        onCheckedChange={setShowTrashed}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Trash
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuSeparator />
                                    {folders.map((folder) => (
                                        <DropdownMenuItem
                                            key={folder}
                                            onClick={() => setSelectedFolder(folder)}
                                        >
                                            <Folder className="mr-2 h-4 w-4" />
                                            {folder}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={() => setIsNewNoteDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Note
                            </Button>
                        </div>
                    </div>

                    {filteredNotes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                <Sprout className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                                No notes found
                            </h3>
                            <p className="mb-6 text-muted-foreground">
                                {searchQuery
                                    ? 'Try adjusting your search query'
                                    : 'Start by creating your first note'}
                            </p>
                            {!searchQuery && (
                                <Button onClick={() => setIsNewNoteDialogOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Note
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredNotes.map((note) => (
                                <Card
                                    key={note.id}
                                    className="group relative cursor-pointer border-border bg-card p-6 transition-all hover:shadow-md"
                                    onClick={() => handleNoteClick(note)}
                                >
                                    {note.favorited && (
                                        <Star className="absolute top-4 right-4 h-4 w-4 fill-accent text-accent" />
                                    )}
                                    <h3 className="mb-2 text-lg font-semibold text-balance text-card-foreground">
                                        {note.title}
                                    </h3>
                                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                                        {note.content}
                                    </p>

                                    {note.tags.length > 0 && (
                                        <div className="mb-4 flex flex-wrap gap-1">
                                            {note.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(note.updated_at).toLocaleDateString()}
                                        </span>
                                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(note.id);
                                                }}
                                            >
                                                <Star
                                                    className={`h-4 w-4 ${note.favorited ? 'fill-accent text-accent' : ''}`}
                                                />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNoteClick(note);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleArchive(note.id);
                                                }}
                                            >
                                                <Archive className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(note.id);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <NoteDialog
                note={selectedNote}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onUpdate={handleUpdateNote}
                onDelete={handleDelete}
                onToggleFavorite={toggleFavorite}
                onToggleArchive={toggleArchive}
                folders={folders}
                allTags={allTags}
            />

            <NoteDialog
                note={null}
                open={isNewNoteDialogOpen}
                onOpenChange={setIsNewNoteDialogOpen}
                onCreate={handleCreateNote}
                folders={folders}
                allTags={allTags}
            />
        </div>
    );
};

export default Index;
