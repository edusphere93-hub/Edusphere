import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/profile');
      } catch (err: any) {
        console.error("Login Error:", err);
        setError(err.message || 'Failed to sign in.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-20 px-4 mt-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-md shadow-indigo-900/20">
             <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back</h2>
          <p className="text-slate-500 mt-2">Log in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Email address</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Mail className="h-5 w-5 text-slate-400" />
               </div>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                 placeholder="name@example.com"
                 required
               />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-1">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
               <a href="#" className="font-bold text-indigo-600 hover:text-indigo-500 text-xs transition-colors">Forgot password?</a>
            </div>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-slate-400" />
               </div>
               <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                 placeholder="••••••••"
                 required
               />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-start gap-2 text-sm font-medium border border-red-100">
               <AlertCircle className="w-5 h-5 shrink-0" />
               <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl shadow-xl shadow-indigo-900/20 transition-all flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
               <>
                 Sign In
                 <ArrowRight className="h-4 w-4" />
               </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
            Start Free Trial
          </Link>
        </p>
      </div>
    </div>
  );
}
