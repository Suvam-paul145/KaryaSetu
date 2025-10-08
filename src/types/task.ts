export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  reminders: Reminder[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface Reminder {
  id: string;
  remindAt: string;
  sent: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface UserSettings {
  timezone: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  theme: 'light' | 'dark';
}
