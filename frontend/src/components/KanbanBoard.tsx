import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useTasks } from '@/hooks/useTasks';
import type { Task, TaskStatus, CreateTaskInput, UpdateTaskInput } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { TaskDialog } from './TaskDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'pending', title: 'Pending' },
  { status: 'in-progress', title: 'In Progress' },
  { status: 'completed', title: 'Completed' },
];

export function KanbanBoard() {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('pending');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const tasksByStatus = columns.reduce((acc, col) => {
    acc[col.status] = tasks.filter((task) => task.status === col.status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as TaskStatus;
    updateTask.mutate({ id: draggableId, status: newStatus });
  };

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDefaultStatus(task.status);
    setDialogOpen(true);
  };

  const handleSubmitTask = (data: CreateTaskInput | UpdateTaskInput) => {
    if ('id' in data) {
      updateTask.mutate(data);
    } else {
      createTask.mutate(data);
    }
  };

  const handleDeleteTask = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteTask.mutate(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 h-full overflow-x-auto md:overflow-hidden pb-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              tasks={tasksByStatus[col.status]}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSubmit={handleSubmitTask}
        isLoading={createTask.isPending || updateTask.isPending}
      />

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
