import { Task } from '@/types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review project proposal',
    description: 'Go through the Q4 project proposal and provide feedback',
    completed: false,
    priority: 'high',
    category: 'Work',
    reminders: [
      {
        id: 'r1',
        remindAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        sent: false,
      },
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables',
    completed: false,
    priority: 'medium',
    category: 'Personal',
    reminders: [
      {
        id: 'r2',
        remindAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        sent: false,
      },
    ],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Complete tax filing',
    description: 'Gather documents and submit tax return',
    completed: true,
    priority: 'high',
    category: 'Finance',
    reminders: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Schedule dentist appointment',
    description: 'Regular checkup',
    completed: false,
    priority: 'low',
    category: 'Health',
    reminders: [
      {
        id: 'r3',
        remindAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        sent: false,
      },
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Prepare presentation',
    description: 'Slides for team meeting on Friday',
    completed: false,
    priority: 'high',
    category: 'Work',
    reminders: [
      {
        id: 'r4',
        remindAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        sent: false,
      },
      {
        id: 'r5',
        remindAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        sent: false,
      },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
