import type { TNote } from '@/types/models';

import { getFilteredNotes, getFoldersFromNotes, getSelectedNote } from '@/lib/notes';
import { useNotesFilterStore } from '@/stores/notes-filter-store';
import { useState } from 'react';

import { AppLayout } from '@/components/layouts/app-layout';
import { Folders } from '@/components/screens/notes/folders';
import { NoteDialog } from '@/components/screens/notes/note-dialog';
import { Tags } from '@/components/screens/notes/tags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Archive, Edit, Plus, Sprout, Star, Trash2 } from 'lucide-react';

const Index = ({ notes }: { notes: TNote[] }) => {
    const { selectedFolderID, selectedTagIDs, searchQuery, selectedNoteID } = useNotesFilterStore();

    const folders = getFoldersFromNotes(notes);
    const filteredNotes = getFilteredNotes(notes, { selectedFolderID, selectedTagIDs });
    const selectedNote = getSelectedNote(notes, { selectedNoteID });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);

    return (
        <AppLayout>
            <Head title="Notes" />
            <div className="min-h-screen bg-background">
                <div className="mx-auto flex max-w-7xl">
                    <aside className="hidden w-64 border-r border-border bg-card/50 p-6 lg:block">
                        <div className="space-y-6">
                            <Folders notes={notes} />
                            <Tags notes={notes} />
                        </div>
                    </aside>
                    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex gap-2">
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
