import { KanbanBoard } from '@/components/KanbanBoard';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskDialog } from '@/components/TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import type { CreateTaskInput, UpdateTaskInput } from '@/types';
import { Layout } from '@/components/Layout';
import { User } from '@/types';

export default function Board() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { createTask } = useTasks();

  const handleCreateTask = (data: CreateTaskInput | UpdateTaskInput) => {
    if (!('id' in data)) {
      createTask.mutate(data);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col h-[calc(100vh-64px)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">My Tasks</h2>
            <p className="text-white/50 mt-1">Manage your workflow and track progress</p>
          </div>
          <button 
            onClick={() => setDialogOpen(true)}
            className="group bg-white text-black font-bold h-10 px-6 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            New Task
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <KanbanBoard />
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={null}
        defaultStatus="pending"
        onSubmit={handleCreateTask}
        isLoading={createTask.isPending}
      />
    </Layout>
  );
}
