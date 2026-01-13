import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Trash2, Edit, AlertCircle } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import type { Task } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
        <motion.div
           layoutId={task.id}
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           transition={{ duration: 0.2 }}
        >
            <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
                "group relative bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-sm transition-all duration-300",
                "hover:border-white/20 hover:shadow-lg hover:shadow-black/50 hover:scale-[1.02]",
                snapshot.isDragging && "shadow-2xl ring-1 ring-cyan-500/50 scale-105 rotate-2 z-50 bg-gray-900/90",
                isOverdue && "border-red-500/30 bg-red-500/5"
            )}
            style={provided.draggableProps.style}
            >
            <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className={cn(
                    "font-medium text-white/90 line-clamp-2 leading-relaxed text-sm",
                    task.status === 'completed' && "line-through text-white/40"
                )}>
                {task.title}
                </h4>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 bg-black/60 backdrop-blur-sm rounded-lg p-1">
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                    }}
                    className="p-1.5 rounded-md hover:bg-cyan-500/20 text-white/60 hover:text-cyan-400 transition-colors"
                >
                    <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                    }}
                    className="p-1.5 rounded-md hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
                </div>
            </div>
            
            {task.description && (
                <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed font-light">
                {task.description}
                </p>
            )}
            
            {dueDate && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <div
                    className={cn(
                        "flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full",
                        isOverdue && "bg-red-500/10 text-red-400 border border-red-500/20",
                        isDueToday && "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
                        !isOverdue && !isDueToday && "bg-white/5 text-white/40 border border-white/5"
                    )}
                    >
                    {isOverdue ? <AlertCircle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                    <span>
                        {isOverdue && "Overdue"}
                        {isDueToday && "Due Today"}
                        {!isOverdue && !isDueToday && format(dueDate, 'MMM d')}
                    </span>
                    </div>
                </div>
            )}
            </div>
        </motion.div>
      )}
    </Draggable>
  );
}
