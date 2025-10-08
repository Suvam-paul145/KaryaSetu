import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggle?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onTaskClick?: (task: Task) => void;
  emptyMessage?: string;
}

export const TaskList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onTaskClick,
  emptyMessage = 'No tasks found',
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl">📝</span>
        </div>
        <p className="text-lg font-medium text-muted-foreground">{emptyMessage}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 animate-in">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={() => onTaskClick?.(task)}
        />
      ))}
    </div>
  );
};
