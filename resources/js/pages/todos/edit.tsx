import type { TTodo } from '@/types/models';

import { useUser } from '@/hooks/use-user';

import { BackButton } from '@/components/elements/back-button';
import { TodoForm } from '@/components/forms/todo-form';
import { NoteLayout } from '@/components/layouts/note-layout';

const Edit = ({ todo }: { todo: TTodo }) => {
    const { user } = useUser();

    return (
        <NoteLayout
            title={`Edit: ${todo.title}`}
            className="max-w-4xl"
            header={
                <div className="flex w-full items-center justify-between gap-4">
                    <BackButton href={route('todos.show', todo)} largeLabel="Back to todo" />
                </div>
            }
        >
            <TodoForm todo={todo} folders={user.folders} tags={user.tags} />
        </NoteLayout>
    );
};

export default Edit;
