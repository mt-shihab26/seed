import type { TTodo } from '@/types/models';

import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';

import { BackButton } from '@/components/elements/back-button';
import { ColoredBadge } from '@/components/elements/colored-badge';
import { IconLink } from '@/components/elements/icon-link';
import { NoteLayout } from '@/components/layouts/note-layout';
import { TodoActions } from '@/components/screens/todos/todo-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusIcon, SproutIcon } from 'lucide-react';

const Index = ({
    todos,
    title,
    back = null,
}: {
    todos: TTodo[];
    title: string;
    back: string | null;
}) => {
    return (
        <NoteLayout
            title={title}
            className="max-w-7xl"
            header={
                <div className="flex w-full items-center space-x-4">
                    <div className="flex w-full items-center space-x-4">
                        {back && (
                            <div className="w-min text-nowrap">
                                <BackButton href={back} largeLabel="Back to All Todos" />
                            </div>
                        )}
                        <div className="h-0.5 w-full bg-border" />
                    </div>
                    <div className="w-min text-xl font-bold text-nowrap">
                        {title} ({todos?.length || 0})
                    </div>
                    <div className="flex w-full items-center space-x-4">
                        <div className="h-0.5 w-full bg-border" />
                        <div className="w-min">
                            <IconLink href={route('todos.create')} icon={PlusIcon} />
                        </div>
                    </div>
                </div>
            }
        >
            {todos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <SproutIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No todos found</h3>
                </div>
            ) : (
                <div className="space-y-1">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:border-border hover:bg-accent/50"
                        >
                            <Checkbox
                                checked={!!todo.completed_at}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.patch(
                                        route('todos.toggle-complete', todo),
                                        {},
                                        { preserveScroll: true },
                                    );
                                }}
                                className="shrink-0"
                            />

                            <div
                                onClick={() => router.visit(route('todos.show', todo))}
                                className="flex min-w-0 flex-1 cursor-pointer items-center gap-2"
                            >
                                <span
                                    className={cn(
                                        'truncate text-sm',
                                        todo.completed_at && 'text-muted-foreground line-through',
                                    )}
                                >
                                    {todo.title}
                                </span>

                                {todo.folder && (
                                    <ColoredBadge
                                        type="folder"
                                        color={todo.folder.color}
                                        className="shrink-0 text-xs"
                                    >
                                        {todo.folder.name}
                                    </ColoredBadge>
                                )}

                                {todo.tags && todo.tags.length > 0 && (
                                    <div className="flex shrink-0 gap-1">
                                        {todo.tags.map((tag) => (
                                            <ColoredBadge
                                                key={tag.id}
                                                type="tag"
                                                color={tag.color}
                                                className="text-xs"
                                            >
                                                {tag.name}
                                            </ColoredBadge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="ml-auto shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                                <TodoActions todo={todo} hideEdit />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </NoteLayout>
    );
};

export default Index;
