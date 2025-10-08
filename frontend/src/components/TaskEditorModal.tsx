import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Task, Reminder } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskEditorModalProps {
  task?: Task;
  open: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
}

export const TaskEditorModal = ({ task, open, onClose, onSave }: TaskEditorModalProps) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    reminders: [],
    dueDate: undefined,
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        reminders: [],
        dueDate: undefined,
      });
    }
  }, [task, open]);

  const addReminder = () => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      remindAt: new Date().toISOString(),
      sent: false,
    };
    setFormData((prev) => ({
      ...prev,
      reminders: [...(prev.reminders || []), newReminder],
    }));
  };

  const removeReminder = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      reminders: prev.reminders?.filter((r) => r.id !== id) || [],
    }));
  };

  const updateReminder = (id: string, date: Date) => {
    setFormData((prev) => ({
      ...prev,
      reminders: prev.reminders?.map((r) =>
        r.id === id ? { ...r, remindAt: date.toISOString() } : r
      ) || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: 'low' | 'medium' | 'high') =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Work, Personal"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !formData.dueDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? format(new Date(formData.dueDate), 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                  onSelect={(date) => setFormData({ ...formData, dueDate: date?.toISOString() })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Reminders</Label>
              <Button type="button" variant="outline" size="sm" onClick={addReminder}>
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </div>
            {formData.reminders && formData.reminders.length > 0 ? (
              <div className="space-y-2">
                {formData.reminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(new Date(reminder.remindAt), 'PPP p')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(reminder.remindAt)}
                          onSelect={(date) => date && updateReminder(reminder.id, date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReminder(reminder.id)}
                      aria-label="Remove reminder"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reminders set</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
