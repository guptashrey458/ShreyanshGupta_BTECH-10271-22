import { ReactNode } from 'react';
import { Header } from './Header';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  showBackgroundElements?: boolean;
}

export function Layout({ children, showBackgroundElements = true }: LayoutProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  return (
    <div className="min-h-screen relative bg-cinematic-bg text-white font-sans selection:bg-cyan-glow selection:text-cinematic-bg flex flex-col">
      {/* Cinematic Background Elements - reusable across pages */}
      {showBackgroundElements && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-glow/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse duration-[7000ms]" />
        </div>
      )}

      {/* Header - only show on non-auth pages or if explicitly requested */}
      {!isAuthPage && <Header />}

      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
