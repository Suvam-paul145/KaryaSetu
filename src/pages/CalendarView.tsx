import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTasks } from '@/lib/mockData';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { TaskList } from '@/components/TaskList';
import { useNavigate } from 'react-router-dom';

export const CalendarView = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const tasksForDate = mockTasks.filter((task) => {
    if (!task.dueDate || !selectedDate) return false;
    return (
      new Date(task.dueDate).toDateString() === selectedDate.toDateString()
    );
  });

  const tasksWithDueDates = mockTasks.filter((t) => t.dueDate);

  const getDatesWithTasks = () => {
    return tasksWithDueDates.map((task) => new Date(task.dueDate!));
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">
          View your tasks by date
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasTasks: getDatesWithTasks(),
              }}
              modifiersStyles={{
                hasTasks: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
              {tasksForDate.length > 0 && (
                <Badge variant="secondary">{tasksForDate.length} tasks</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <TaskList
                tasks={tasksForDate}
                onTaskClick={(task) => navigate(`/task/${task.id}`)}
                emptyMessage="No tasks for this date"
              />
            ) : (
              <p className="text-center text-muted-foreground">
                Select a date to view tasks
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            tasks={tasksWithDueDates.slice(0, 10)}
            onTaskClick={(task) => navigate(`/task/${task.id}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
};
