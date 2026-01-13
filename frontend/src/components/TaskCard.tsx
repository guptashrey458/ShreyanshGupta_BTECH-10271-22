import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Trash2, Edit } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import type { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate) && task.status !== 'completed';
  const isDueToday = dueDate && isToday(dueDate);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-card rounded-lg p-4 shadow-card transition-all duration-200 cursor-grab active:cursor-grabbing group",
            snapshot.isDragging && "shadow-card-hover rotate-2 scale-105",
            "hover:shadow-card-hover animate-fade-in"
          )}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-medium text-card-foreground line-clamp-2 flex-1">
              {task.title}
            </h4>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          )}
          
          {dueDate && (
            <div
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium",
                isOverdue && "text-destructive",
                isDueToday && "text-status-pending",
                !isOverdue && !isDueToday && "text-muted-foreground"
              )}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {isOverdue && "Overdue: "}
                {isDueToday && "Due today"}
                {!isOverdue && !isDueToday && format(dueDate, 'MMM d, yyyy')}
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
