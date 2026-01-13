import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Trash2, User, Save } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { Layout } from '@/components/Layout';
import { GlassCard } from '@/components/GlassCard';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, deleteAccount } = useAuth();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    const { error } = await updateProfile({ name: name.trim() });
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Profile updated successfully');
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const { error } = await deleteAccount();
    setIsDeleting(false);

    if (error) {
      toast.error(error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl px-4 py-8 mx-auto">
        <button
          onClick={() => navigate('/board')}
          className="flex items-center text-white/50 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Board
        </button>

        <div className="space-y-6">
          <GlassCard className="p-0">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <User className="w-6 h-6 text-cyan-glow" />
                Profile Settings
              </h2>
              <p className="text-white/50 mt-1">Manage your account information and preferences</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-white/50">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white/50 cursor-not-allowed"
                />
                <p className="text-xs text-white/30">Email cannot be changed</p>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-medium uppercase tracking-wider text-white/50 group-focus-within:text-cyan-glow transition-colors">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-glow/50 focus:ring-1 focus:ring-cyan-glow/50 transition-all duration-300"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit" 
                  disabled={isLoading}
                  className="bg-white text-black font-bold px-6 py-2.5 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6 border-red-500/20 bg-red-500/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
                <p className="text-white/50 text-sm mt-1">
                  Permanently delete your account and all associated data.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center gap-2 whitespace-nowrap font-medium">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-white/10 text-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/60">
                      This action cannot be undone. This will permanently delete your account and remove all your data including tasks.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 text-white hover:bg-red-700 border-none"
                    >
                      {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
}
