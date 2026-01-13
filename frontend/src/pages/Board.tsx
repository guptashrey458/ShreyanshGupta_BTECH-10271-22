import { Header } from '@/components/Header';
import { KanbanBoard } from '@/components/KanbanBoard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { TaskDialog } from '@/components/TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import type { CreateTaskInput, UpdateTaskInput } from '@/types';

export default function Board() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { createTask } = useTasks();

  const handleCreateTask = (data: CreateTaskInput | UpdateTaskInput) => {
    if (!('id' in data)) {
      createTask.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">My Tasks</h2>
            <p className="text-muted-foreground mt-1">Organize and track your work</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
        
        <KanbanBoard />
      </main>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={null}
        defaultStatus="pending"
        onSubmit={handleCreateTask}
        isLoading={createTask.isPending}
      />
    </div>
  );
}
