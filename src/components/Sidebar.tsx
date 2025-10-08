import { Home, CheckSquare, Calendar, MessageSquare, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: CheckSquare, label: 'All Tasks', path: '/tasks' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform md:sticky md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-2 p-4" aria-label="Main navigation">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-base hover:bg-secondary',
                  isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg bg-gradient-primary p-4 text-white">
            <h3 className="mb-1 text-sm font-semibold">Need Help?</h3>
            <p className="mb-3 text-xs opacity-90">
              Chat with our AI assistant for task suggestions
            </p>
            <NavLink
              to="/chat"
              className="inline-flex items-center gap-2 rounded-md bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur transition-base hover:bg-white/30"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Open Chat
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
