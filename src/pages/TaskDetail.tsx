import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TaskEditorModal } from '@/components/TaskEditorModal';
import { mockTasks } from '@/lib/mockData';
import { Task } from '@/types/task';
import { format } from 'date-fns';

export const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const foundTask = mockTasks.find((t) => t.id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate('/tasks');
    }
  }, [id, navigate]);

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Task not found</p>
      </div>
    );
  }

  const handleToggle = () => {
    setTask({ ...task, completed: !task.completed });
  };

  const handleSave = (taskData: Partial<Task>) => {
    setTask({ ...task, ...taskData });
  };

  const handleDelete = () => {
    navigate('/tasks');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Task Details</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggle}
                className="mt-1"
                aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <div>
                <CardTitle className={task.completed ? 'line-through text-muted-foreground' : ''}>
                  {task.title}
                </CardTitle>
                {task.description && (
                  <p className="mt-2 text-muted-foreground">{task.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsEditorOpen(true)} aria-label="Edit task">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDelete} aria-label="Delete task">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Priority</p>
              <Badge variant="secondary" className="capitalize">
                {task.priority}
              </Badge>
            </div>

            {task.category && (
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Category</p>
                <Badge variant="outline">{task.category}</Badge>
              </div>
            )}

            {task.dueDate && (
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Due Date</p>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(task.dueDate), 'PPP')}</span>
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Status</p>
              <Badge variant={task.completed ? 'default' : 'secondary'} className={task.completed ? 'bg-success' : ''}>
                {task.completed ? 'Completed' : 'In Progress'}
              </Badge>
            </div>
          </div>

          {task.reminders.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Reminders</p>
              <div className="space-y-2">
                {task.reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center gap-2 rounded-lg border p-3"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(reminder.remindAt), 'PPP p')}</span>
                    {reminder.sent && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        Sent
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 text-sm text-muted-foreground">
            <p>Created: {format(new Date(task.createdAt), 'PPP')}</p>
            <p>Last updated: {format(new Date(task.updatedAt), 'PPP')}</p>
          </div>
        </CardContent>
      </Card>

      <TaskEditorModal
        task={task}
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};
