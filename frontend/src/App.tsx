import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import Board from './pages/Board';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing'; // Import Landing
import { Loader2 } from 'lucide-react';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cinematic-bg">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-glow" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to Landing instead of Login directly
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cinematic-bg">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-glow" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/board" replace />; // Redirect to Board if logged in
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
