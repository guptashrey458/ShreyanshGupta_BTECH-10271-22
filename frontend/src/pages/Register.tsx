import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) return;

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email.trim(), password, name.trim());
    setIsLoading(false);

    if (error) {
      if (error.message.includes('already exists')) {
        toast.error('An account with this email already exists');
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success('Account created successfully!');
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
          
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 hover:to-cyan-glow transition-all duration-300">
                  TaskFlow
                  </span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h1>
              <p className="text-white/40 text-sm">Join thousands of productive users today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2 group">
                  <label className="text-xs font-medium uppercase tracking-wider text-white/50 group-focus-within:text-cyan-glow transition-colors">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-xs font-medium uppercase tracking-wider text-white/50 group-focus-within:text-cyan-glow transition-colors">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-xs font-medium uppercase tracking-wider text-white/50 group-focus-within:text-cyan-glow transition-colors">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <p className="text-xs text-white/30 text-right">Min 6 chars</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black font-bold h-12 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/40">
                Already have an account?{' '}
                <Link to="/login" className="text-white hover:text-cyan-glow font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
