import type { TTodo } from '@/types/models';

import { useUser } from '@/hooks/use-user';

import { BackButton } from '@/components/elements/back-button';
import { EditButton } from '@/components/elements/edit-button';
import { TodoForm } from '@/components/forms/todo-form';
import { NoteLayout } from '@/components/layouts/note-layout';

const Show = ({ todo }: { todo: TTodo }) => {
    const { user } = useUser();

    return (
        <NoteLayout
            title={todo.title}
            className="max-w-4xl"
            header={
                <div className="flex w-full items-center justify-between gap-4">
                    <BackButton href={route('todos.index')} largeLabel="Back to todos" />
                    <EditButton href={route('todos.edit', todo)} />
                </div>
            }
        >
            <TodoForm todo={todo} tags={user.tags} readOnly={true} />
        </NoteLayout>
    );
};

export default Show;
