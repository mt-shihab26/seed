import { useUser } from '@/hooks/use-user';

import { BackButton } from '@/components/elements/back-button';
import { TodoForm } from '@/components/forms/todo-form';
import { NoteLayout } from '@/components/layouts/note-layout';

const Create = () => {
    const { user } = useUser();

    return (
        <NoteLayout
            title="Create New Todo"
            className="max-w-4xl"
            header={
                <div className="flex w-full items-center justify-between gap-4">
                    <BackButton href={route('todos.index')} largeLabel="Back to todos" />
                </div>
            }
        >
            <TodoForm folders={user.folders} tags={user.tags} />
        </NoteLayout>
    );
};

export default Create;
