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

import { href } from '@/lib/href';
import { getFilteredNotes, getFoldersFromNotes, getTagsFromNotes } from '@/lib/notes';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { AppLayout } from '@/components/layouts/app-layout';
import { NoteDialog } from '@/components/screens/notes/note-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head } from '@inertiajs/react';

const Index = ({ notes, selectedTagIds }: { notes: TNote[]; selectedTagIds: string[] | null }) => {
    const { url } = usePage();

    const [selectedFolderID, setSelectedFolderID] = useState<string | null>(null);
    const [selectedTagIDs, setSelectedTagIDs] = useState<string[] | null>(null);

    const folders = getFoldersFromNotes(notes);
    const tags = getTagsFromNotes(notes);
    const filteredNotes = getFilteredNotes(notes, { selectedFolderID, selectedTagIDs });

    const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [showTrashed, setShowTrashed] = useState(false);

    return (
        <AppLayout>
            <Head title="Notes" />
            <div className="min-h-screen bg-background">
                <div className="mx-auto flex max-w-7xl">
                    <aside className="hidden w-64 border-r border-border bg-card/50 p-6 lg:block">
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                                    <Folder className="h-4 w-4" />
                                    Folders
                                </h3>
                                <div className="space-y-1">
                                    {folders.map((folder) => (
                                        <Button
                                            key={folder?.id}
                                            className="w-full justify-start"
                                            variant={
                                                href.query.get(url, 'folder') === folder?.id
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            onClick={() =>
                                                router.visit(
                                                    href.query.update(url, 'folder', folder?.id),
                                                )
                                            }
                                        >
                                            {folder?.name}
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
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag.name}
                                            variant={
                                                selectedTagIds?.includes(tag.id)
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            className="cursor-pointer"
                                        >
                                            #{tag.name}
                                        </Badge>
                                    ))}
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
                                            <DropdownMenuItem key={folder?.name}>
                                                <Folder className="mr-2 h-4 w-4" />
                                                {folder?.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button>
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
                                        {note.favorited_at && (
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
                                                        key={tag.id}
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {tag.name}
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
                                                    }}
                                                >
                                                    <Star
                                                        className={`h-4 w-4 ${note.favorited_at ? 'fill-accent text-accent' : ''}`}
                                                    />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
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
                    onUpdate={() => {}}
                    onDelete={() => {}}
                    onToggleFavorite={() => {}}
                    onToggleArchive={() => {}}
                    folders={folders || []}
                />

                <NoteDialog
                    note={null}
                    open={isNewNoteDialogOpen}
                    onOpenChange={setIsNewNoteDialogOpen}
                    onCreate={() => {}}
                    folders={folders}
                />
            </div>
        </AppLayout>
    );
};

export default Index;
