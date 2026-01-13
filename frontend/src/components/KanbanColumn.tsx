import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import type { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const statusConfig: Record<TaskStatus, { color: string; border: string; glow: string }> = {
  'pending': {
    color: 'text-yellow-400',
    border: 'border-t-yellow-400',
    glow: 'shadow-yellow-400/20'
  },
  'in-progress': {
    color: 'text-cyan-400',
    border: 'border-t-cyan-400',
    glow: 'shadow-cyan-400/20'
  },
  'completed': {
    color: 'text-green-400',
    border: 'border-t-green-400',
    glow: 'shadow-green-400/20'
  },
};

export function KanbanColumn({ status, title, tasks, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) {
  const config = statusConfig[status];

  return (
    <div className="flex flex-col flex-1 min-w-[300px] md:min-w-[320px] h-full max-h-full">
      <GlassCard className={cn(
        "flex flex-col h-full max-h-full border-t-4", 
        config.border
      )}>
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-gray-900/50 backdrop-blur-xl z-20">
          <div className="flex items-center gap-2">
            <h3 className={cn("font-bold tracking-tight", config.color)}>{title}</h3>
            <span className="flex items-center justify-center bg-white/10 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[24px]">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => onAddTask(status)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Droppable Area */}
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "flex-1 p-3 overflow-y-auto custom-scrollbar transition-colors",
                snapshot.isDraggingOver && "bg-white/5"
              )}
            >
              <div className="flex flex-col gap-3 min-h-[100px]">
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
                <div className="flex flex-col items-center justify-center h-48 text-white/20 border-2 border-dashed border-white/5 rounded-xl mt-2">
                  <p className="text-sm font-medium">No tasks yet</p>
                  <button
                    onClick={() => onAddTask(status)}
                    className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline mt-1 transition-colors"
                  >
                    Add a task
                  </button>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </GlassCard>
    </div>
  );
}
