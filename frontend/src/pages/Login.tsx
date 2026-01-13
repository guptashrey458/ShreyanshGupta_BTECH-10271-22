import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
    } 
    // Navigation is handled by auth state change in context or here if successful
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
          {/* Glass Card Background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl" />
          
          <div className="relative z-10 p-8">
              <div className="text-center mb-10">
              <Link to="/" className="inline-block mb-4">
                  <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 hover:to-cyan-glow transition-all duration-300">
                  TaskFlow
                  </span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
              <p className="text-white/40 text-sm">Sign in to continue your workflow</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                  <div className="space-y-2 group">
                  <label className="text-xs font-medium uppercase tracking-wider text-white/50 group-focus-within:text-cyan-glow transition-colors">Email</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="name@example.com"
                  />
                  </div>
                  
                  <div className="space-y-2 group">
                  <div className="flex justify-between items-center">
                      <label className="text-xs font-medium uppercase tracking-wider text-white/50 group-focus-within:text-cyan-glow transition-colors">Password</label>
                      <a href="#" className="text-xs text-white/30 hover:text-cyan-glow transition-colors">Forgot?</a>
                  </div>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="••••••••"
                  />
                  </div>
              </div>

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold h-12 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
              >
                  {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                  <>
                      Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                  )}
              </button>
              </form>

              <div className="mt-8 text-center">
              <p className="text-sm text-white/40">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white hover:text-cyan-glow font-medium transition-colors">
                  create one now
                  </Link>
              </p>
              </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
