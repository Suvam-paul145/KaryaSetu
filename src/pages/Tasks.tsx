import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskList } from '@/components/TaskList';
import { TaskEditorModal } from '@/components/TaskEditorModal';
import { mockTasks } from '@/lib/mockData';
import { Task } from '@/types/task';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

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
          <h1 className="text-3xl font-bold">All Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsEditorOpen(true)} className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTasks.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({tasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <TaskList
            tasks={activeTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTaskClick={(task) => navigate(`/task/${task.id}`)}
            emptyMessage="No active tasks"
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <TaskList
            tasks={completedTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTaskClick={(task) => navigate(`/task/${task.id}`)}
            emptyMessage="No completed tasks"
          />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTaskClick={(task) => navigate(`/task/${task.id}`)}
          />
        </TabsContent>
      </Tabs>

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
