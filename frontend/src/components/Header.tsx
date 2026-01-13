import { Kanban, CheckSquare } from 'lucide-react';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <div className="relative">
              <Kanban className="h-5 w-5" />
              <CheckSquare className="h-2.5 w-2.5 absolute -top-0.5 -right-0.5 text-green-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <span className="text-xs text-muted-foreground -mt-1">Kanban Board</span>
          </div>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
