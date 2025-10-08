# ToDo+Remind - Smart Task Management App

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. Features include task CRUD operations, reminder scheduling, AI chatbot integration, and calendar views.

## Features

- ✅ **Task Management**: Create, read, update, and delete tasks
- ⏰ **Smart Reminders**: Set multiple datetime reminders per task
- 🤖 **AI Chatbot**: Get task suggestions and management help
- 📅 **Calendar View**: Visualize tasks by date
- 🔐 **Authentication**: Secure login and registration
- 🎨 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Mobile-first, works on all devices
- ♿ **Accessible**: Keyboard navigable with ARIA labels

## Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: React hooks
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- A running backend API (see Backend API section)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-remind
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Backend API

This frontend expects a REST API with the following endpoints:

### Authentication

**POST /api/auth/register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "token": "jwt-token-here",
  "user": { "id": "1", "name": "John Doe", "email": "john@example.com" }
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Response: Same as register

### Tasks

**GET /api/tasks**
- Headers: `Authorization: Bearer <token>`
- Response: Array of tasks

**GET /api/tasks/:id**
- Headers: `Authorization: Bearer <token>`
- Response: Single task object

**POST /api/tasks**
```json
{
  "title": "Complete project",
  "description": "Finish the frontend",
  "priority": "high",
  "category": "Work",
  "reminders": [
    { "remindAt": "2024-01-15T09:00:00Z" }
  ],
  "dueDate": "2024-01-20T00:00:00Z"
}
```

**PUT /api/tasks/:id**
- Same payload as POST
- Updates existing task

**DELETE /api/tasks/:id**
- Deletes task

### Chat

**POST /api/chat**
```json
{
  "message": "Help me organize my tasks"
}
```
Response:
```json
{
  "id": "msg-123",
  "role": "assistant",
  "content": "I can help you with that...",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

**GET /api/chat/history**
- Returns conversation history

### Settings

**GET /api/settings**
- Returns user settings

**PUT /api/settings**
```json
{
  "timezone": "America/New_York",
  "notificationsEnabled": true,
  "emailNotifications": false
}
```

## Task Object Schema

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  reminders: Reminder[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  dueDate?: string;  // ISO 8601
}

interface Reminder {
  id: string;
  remindAt: string;  // ISO 8601
  sent: boolean;
}
```

## Mock Data Adapter

For local development without a backend, the app includes mock data in `src/lib/mockData.ts`. The API calls in `src/lib/api.ts` can be temporarily replaced with local state management.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests (when configured)

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:3000/api)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Semantic HTML structure
- Focus management
- Screen reader friendly

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions, please open an issue on GitHub.
