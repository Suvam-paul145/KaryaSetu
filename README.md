# Task Reminder App 📝

A full-stack task management application with Google authentication and smart reminder features.

## Contributing 🤝

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

Before contributing, please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.


## 🖼️ Project Preview

<div align="center" style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 12px; background-color: #f9fafb;">

<img src="frontend\images\webpage-view.png" alt="ToDo+Remind Webpage Preview" width="100%" style="border-radius: 10px;"/>

</div>


## Features ✨

- ✅ **Task Management**: Create, read, update, and delete tasks
- ⏰ **Smart Reminders**: Set multiple datetime reminders per task
- 🤖 **Agentic AI Chatbot**: Get task suggestions and management help
- 📅 **Calendar View**: Visualize tasks by date
- 🔐 **Authentication**: Secure login and registration
- 🎨 **Dark/Light Mode**: Toggle between themes
- 📱 **Responsive Design**: Mobile-first, works on all devices
- ♿ **Accessible**: Keyboard navigable with ARIA labels

## ⚙️ Tech Stack

***Frontend***  
-- React 18 + Vite, TypeScript, Tailwind CSS, shadcn/ui, React Router v6, Lucide React  

***Backend***  
-- Node.js, Express.js, TypeScript, JWT Authentication, Socket.io, OAuth 2.0

***Database***  
-- MongoDB, Mongoose

***Services***  
-- dotenv, Vercel(Deployment), Git & GitHub (Version Control)


  - **Framework**: React 18 with Vite
  - **Language**: TypeScript
  - **Styling**: Tailwind CSS
  - **UI Components**: shadcn/ui
  - **Routing**: React Router v6
  - **State Management**: React hooks
  - **Date Handling**: date-fns
  - **Icons**: Lucide React

## 🧭 Upcoming Goals

- **One-Gateway**: A single place to connect and manage all your task automations across different websites.  
- **AI-Automation**: Use AI to handle routine work like posting updates, sending emails, or scheduling meetings automatically.  
- **Web Automation Hub**: Automate actions on popular platforms like **LinkedIn, GitHub, YouTube, Instagram**, and more through smart APIs and browser automation.  
- **Smart Trigger System**: Set custom rules such as *“When I finish a task, post it on LinkedIn”* or *“When I upload a project, share it automatically.”*  
- **Auto-Sync Scheduler**: Keep your calendar, GitHub commits, and social posts automatically synced with your tasks.  
- **Cross-App Integration**: Connect your app with tools like **Notion**, **Slack**, **Google Calendar**, **Trello**, or **Zapier** for a full workflow setup.  
- **AI Personal Assistant**: Chat with an AI that helps you manage your day — from drafting posts to replying to messages or summarizing tasks.  
- **Workflow Builder (Visual UI)**: A simple drag-and-drop tool to create automation flows without writing any code.  
- **Multi-Platform Notifications**: Get your reminders on **WhatsApp**, **Telegram**, or **Email** — wherever you prefer.  
- **Secure Automation Layer**: All connections are protected using encryption and safe login methods like OAuth.  
- **Predictive Action Engine**: The AI learns your habits and suggests or completes routine tasks for you automatically.  
- **Insight & Analytics Dashboard**: See how automation saves you time with visual charts and productivity stats.  

## Project Structure 📂

```
Task-reminder/
├── frontend/                # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Shadcn UI components
│   │   │   └── ...        # Custom components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions & API
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
│
├── backend/                # Express + TypeScript backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   │   ├── db.ts     # MongoDB connection
│   │   │   └── passport.ts# OAuth configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── server.ts      # Express app entry
│   └── .env               # Environment variables
```


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
