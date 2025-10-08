import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskList } from '@/components/TaskList';
import { TaskEditorModal } from '@/components/TaskEditorModal';
import { mockTasks } from '@/lib/mockData';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const upcomingTasks = tasks
    .filter((t) => !t.completed && t.reminders.some((r) => !r.sent))
    .sort((a, b) => {
      const aNext = Math.min(...a.reminders.filter(r => !r.sent).map(r => new Date(r.remindAt).getTime()));
      const bNext = Math.min(...b.reminders.filter(r => !r.sent).map(r => new Date(r.remindAt).getTime()));
      return aNext - bNext;
    })
    .slice(0, 5);

  const todayTasks = tasks.filter(
    (t) =>
      !t.completed &&
      t.dueDate &&
      new Date(t.dueDate).toDateString() === new Date().toDateString()
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const highPriorityCount = tasks.filter((t) => !t.completed && t.priority === 'high').length;

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = (taskData: Partial<Task>) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        completed: false,
        reminders: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...taskData,
      } as Task;
      setTasks((prev) => [newTask, ...prev]);
    }
    setEditingTask(undefined);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview</p>
        </div>
        <Button onClick={() => setIsEditorOpen(true)} className="gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{completedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{highPriorityCount}</div>
          </CardContent>
        </Card>
      </div>

      {todayTasks.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Due Today</h2>
          <TaskList
            tasks={todayTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTaskClick={(task) => navigate(`/task/${task.id}`)}
          />
        </div>
      )}

      <div>
        <h2 className="mb-4 text-xl font-semibold">Upcoming Reminders</h2>
        <TaskList
          tasks={upcomingTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTaskClick={(task) => navigate(`/task/${task.id}`)}
          emptyMessage="No upcoming reminders"
        />
      </div>

      <TaskEditorModal
        task={editingTask}
        open={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingTask(undefined);
        }}
        onSave={handleSave}
      />
    </div>
  );
};
