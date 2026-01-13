import { Kanban, CheckSquare } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/board" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow/20 to-cyan-500/10 border border-cyan-glow/20 text-cyan-400 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] group-hover:shadow-[0_0_20px_-3px_rgba(0,242,254,0.5)] transition-all duration-300">
            <div className="relative">
              <Kanban className="h-5 w-5" />
              <CheckSquare className="h-2.5 w-2.5 absolute -top-0.5 -right-0.5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-glow transition-colors duration-300">
              TaskFlow
            </h1>
            <span className="text-xs text-white/50 -mt-0.5 tracking-wider uppercase">Kanban Board</span>
          </div>
        </Link>
        <UserMenu />
      </div>
    </header>
  );
}
