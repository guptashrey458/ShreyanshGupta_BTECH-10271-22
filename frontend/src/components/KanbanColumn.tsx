import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import type { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const statusStyles: Record<TaskStatus, { dot: string; bg: string; border: string }> = {
  'pending': {
    dot: 'bg-status-pending',
    bg: 'bg-status-pending-bg',
    border: 'border-status-pending/20',
  },
  'in-progress': {
    dot: 'bg-status-inprogress',
    bg: 'bg-status-inprogress-bg',
    border: 'border-status-inprogress/20',
  },
  'completed': {
    dot: 'bg-status-completed',
    bg: 'bg-status-completed-bg',
    border: 'border-status-completed/20',
  },
};

export function KanbanColumn({ status, title, tasks, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) {
  const styles = statusStyles[status];

  return (
    <div className="flex flex-col min-w-[300px] max-w-[350px] flex-1">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={cn("w-2.5 h-2.5 rounded-full", styles.dot)} />
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 rounded-xl p-3 transition-colors min-h-[200px]",
              styles.bg,
              styles.border,
              "border-2 border-dashed",
              snapshot.isDraggingOver && "border-primary/40 bg-primary/5"
            )}
          >
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
              {provided.placeholder}
            </div>
            
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <p className="text-sm">No tasks</p>
                <button
                  onClick={() => onAddTask(status)}
                  className="text-sm text-primary hover:underline mt-1"
                >
                  Add a task
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
