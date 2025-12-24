import { FolderIcon } from 'lucide-react';

import type { TNote } from '@/types/models';

import { formatDateTime } from '@/lib/format';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const Content = ({ note }: { note: TNote }) => {
    return (
        <Card>
            <CardHeader className="space-y-4 pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-3">
                        <h1 className="text-2xl leading-tight font-bold text-balance sm:text-3xl">
                            {note.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            {note.folder && (
                                <>
                                    <Badge variant="outline" className="flex items-center gap-1.5">
                                        <FolderIcon className="size-3.5" />
                                        <span>{note.folder.name}</span>
                                    </Badge>
                                    <span className="hidden sm:inline">•</span>
                                </>
                            )}
                            <span>{formatDateTime(note.created_at)}</span>
                            {note.updated_at !== note.created_at && (
                                <>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="text-xs">
                                        Updated {formatDateTime(note.updated_at)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {note.tags.map((tag) => (
                            <Badge key={tag.id} variant="secondary">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text-base leading-relaxed text-pretty whitespace-pre-wrap">
                        {note.content}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
