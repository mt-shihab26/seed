import {
    Archive,
    Copy,
    Download,
    Edit,
    Eye,
    FileEdit,
    Folder,
    MoreVertical,
    Save,
    Share2,
    Star,
    TagIcon,
    Trash2,
    X,
} from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TNote } from '@/types/models';

import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface NoteDialogProps {
    note: TNote | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate?: (note: TNote) => void;
    onCreate?: (note: TNote) => void;
    onDelete?: (id: string) => void;
    onToggleFavorite?: (id: string) => void;
    onToggleArchive?: (id: string) => void;
    folders: string[];
    allTags: string[];
}

export function NoteDialog({
    note,
    open,
    onOpenChange,
    onUpdate,
    onCreate,
    onDelete,
    onToggleFavorite,
    onToggleArchive,
    folders,
    allTags,
}: NoteDialogProps) {
    const isNewNote = note === null;
    const [isEditing, setIsEditing] = useState(isNewNote);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedTags, setEditedTags] = useState<string[]>([]);
    const [editedFolder, setEditedFolder] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

    useEffect(() => {
        if (open) {
            if (isNewNote) {
                setEditedTitle('');
                setEditedContent('');
                setEditedTags([]);
                setEditedFolder(folders[0] || '');
                setIsEditing(true);
                setActiveTab('write');
            } else if (note) {
                setEditedTitle(note.title);
                setEditedContent(note.content);
                setEditedTags(note.tags);
                setEditedFolder(note.folder);
                setIsEditing(false);
            }
        }
    }, [open, note, isNewNote, folders]);

    const handleEditStart = () => {
        if (note) {
            setEditedTitle(note.title);
            setEditedContent(note.content);
            setEditedTags(note.tags);
            setEditedFolder(note.folder);
        }
        setIsEditing(true);
    };

    const handleSave = () => {
        if (isNewNote && onCreate) {
            const newNote: TNote = {
                id: Date.now().toString(),
                title: editedTitle || 'Untitled Note',
                content: editedContent,
                tags: editedTags,
                folder: editedFolder || folders[0] || 'General',
                favorited_at: false,
                archived_at: false,
                trashed: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            onCreate(newNote);
            onOpenChange(false);
        } else if (note && onUpdate) {
            onUpdate({
                ...note,
                title: editedTitle,
                content: editedContent,
                tags: editedTags,
                folder: editedFolder,
                updated_at: new Date().toISOString(),
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        if (isNewNote) {
            onOpenChange(false);
        } else {
            setIsEditing(false);
            setActiveTab('write');
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !editedTags.includes(tagInput.trim())) {
            setEditedTags([...editedTags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setEditedTags(editedTags.filter((tag) => tag !== tagToRemove));
    };

    const handleExport = () => {
        if (!note) return;
        const blob = new Blob([`# ${note.title}\n\n${note.content}`], {
            type: 'text/markdown',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title.replace(/\s+/g, '-').toLowerCase()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
        if (note) {
            navigator.clipboard.writeText(note.content);
        }
    };

    const wordCount = (isEditing ? editedContent : note?.content || '').trim().split(/\s+/).length;
    const charCount = (isEditing ? editedContent : note?.content || '').length;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden">
                <DialogHeader className="flex-shrink-0">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            {isEditing || isNewNote ? (
                                <Input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="border-none px-0 text-2xl font-semibold focus-visible:ring-0"
                                    placeholder="Note title"
                                />
                            ) : (
                                <DialogTitle className="pr-8 text-2xl font-semibold">
                                    {note?.title}
                                </DialogTitle>
                            )}
                            <DialogDescription className="mt-2 flex items-center gap-3 text-sm">
                                {isNewNote ? (
                                    <span>New note</span>
                                ) : (
                                    <>
                                        <span>
                                            Updated{' '}
                                            {new Date(note?.updated_at || '').toLocaleDateString()}
                                        </span>
                                        {!isEditing && (
                                            <>
                                                <span>•</span>
                                                <span>{wordCount} words</span>
                                                <span>•</span>
                                                <span>{charCount} characters</span>
                                            </>
                                        )}
                                    </>
                                )}
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {isEditing || isNewNote ? (
                                <>
                                    <Button onClick={handleSave} size="sm">
                                        <Save className="mr-2 h-4 w-4" />
                                        {isNewNote ? 'Create' : 'Save'}
                                    </Button>
                                    <Button onClick={handleCancel} variant="ghost" size="sm">
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={handleEditStart} variant="outline" size="sm">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => note && onToggleFavorite?.(note.id)}
                                            >
                                                <Star
                                                    className={`mr-2 h-4 w-4 ${note?.favorited_at ? 'fill-current' : ''}`}
                                                />
                                                {note?.favorited_at
                                                    ? 'Remove from favorites'
                                                    : 'Add to favorites'}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => note && onToggleArchive?.(note.id)}
                                            >
                                                <Archive className="mr-2 h-4 w-4" />
                                                {note?.archived_at ? 'Unarchive' : 'Archive'}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleExport}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Export as Markdown
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleCopy}>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Copy content
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Share note
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    if (note && onDelete) {
                                                        onDelete(note.id);
                                                        onOpenChange(false);
                                                    }
                                                }}
                                                className="text-destructive"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Move to trash
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto">
                    {isEditing || isNewNote ? (
                        <div className="space-y-6 py-4">
                            <Tabs
                                value={activeTab}
                                onValueChange={(v) => setActiveTab(v as 'write' | 'preview')}
                            >
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="write">
                                        <FileEdit className="mr-2 h-4 w-4" />
                                        Write
                                    </TabsTrigger>
                                    <TabsTrigger value="preview">
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="write" className="mt-4">
                                    <Textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        placeholder="Start writing your note..."
                                        className="min-h-[400px] resize-none font-mono text-sm leading-relaxed"
                                    />
                                    <div className="mt-2 text-xs text-muted-foreground">
                                        {editedContent.trim().split(/\s+/).length} words •{' '}
                                        {editedContent.length} characters
                                    </div>
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4">
                                    <div className="min-h-[400px] rounded-md border border-border bg-muted/30 p-4">
                                        <div className="prose prose-sm dark:prose-invert max-w-none">
                                            {editedContent.split('\n').map((line, i) => (
                                                <p key={i} className="leading-relaxed">
                                                    {line || <br />}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Folder className="h-4 w-4" />
                                        Folder
                                    </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start bg-transparent"
                                            >
                                                {editedFolder || 'Select folder'}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            {folders.map((folder) => (
                                                <DropdownMenuItem
                                                    key={folder}
                                                    onClick={() => setEditedFolder(folder)}
                                                >
                                                    {folder}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <TagIcon className="h-4 w-4" />
                                        Tags
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' &&
                                                (e.preventDefault(), handleAddTag())
                                            }
                                            placeholder="Add tag..."
                                        />
                                        <Button onClick={handleAddTag} variant="secondary">
                                            Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {editedTags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <button
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="ml-1 hover:text-destructive"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 py-4">
                            {(note?.tags.length || note?.folder) && (
                                <div className="flex flex-wrap items-center gap-4">
                                    {note.folder && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Folder className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                {note.folder}
                                            </span>
                                        </div>
                                    )}
                                    {note.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {note.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                {note?.content.split('\n').map((line, i) => (
                                    <p key={i} className="leading-relaxed text-foreground">
                                        {line || <br />}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
