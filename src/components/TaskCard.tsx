import { useState } from 'react';
import { Clock, AlertCircle, CheckCircle2, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggle?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-accent/20 text-accent-foreground',
  high: 'bg-destructive/20 text-destructive-foreground',
};

export const TaskCard = ({ task, onToggle, onEdit, onDelete, onClick }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const nextReminder = task.reminders
    .filter(r => !r.sent && new Date(r.remindAt) > new Date())
    .sort((a, b) => new Date(a.remindAt).getTime() - new Date(b.remindAt).getTime())[0];

  return (
    <Card
      className={cn(
        'group relative cursor-pointer overflow-hidden p-4 transition-base hover-lift',
        task.completed && 'opacity-60'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle?.(task.id)}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                'font-medium transition-base',
                task.completed && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </h3>

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100',
                    isHovered && 'opacity-100'
                  )}
                  aria-label="Task actions"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(task)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete?.(task.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>

            {task.category && (
              <Badge variant="outline" className="text-xs">
                {task.category}
              </Badge>
            )}

            {nextReminder && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{format(new Date(nextReminder.remindAt), 'MMM d, h:mm a')}</span>
              </div>
            )}

            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {new Date(task.dueDate) < new Date() && !task.completed ? (
                  <>
                    <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                    <span className="text-destructive">Overdue</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Due {format(new Date(task.dueDate), 'MMM d')}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
