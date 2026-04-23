import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Mail, Lock, User as UserIcon, AlertCircle, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      setIsLoading(true);
      setError(null);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile
        await updateProfile(user, { displayName: name });
        
        // Save user into firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          role: 'student'
        });

        navigate('/profile');
      } catch (err: any) {
        console.error("Signup error:", err);
        if (err.code === 'auth/email-already-in-use') {
           setError("This email address is already registered. Please log in instead.");
        } else if (err.code === 'auth/weak-password') {
           setError("Password is too weak. Please use at least 6 characters.");
        } else if (err.message && err.message.toLowerCase().includes('permissions')) {
           setError("Database Error: Firestore Security Rules are blocking access. Please update them in your Firebase Console.");
        } else {
           setError(err.message || "Failed to create account");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-20 px-4 mt-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-md shadow-emerald-900/20">
             <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Create an account</h2>
          <p className="text-slate-500 mt-2">Start your journey today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Full Name</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <UserIcon className="h-5 w-5 text-slate-400" />
               </div>
               <input
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                 placeholder="John Doe"
                 required
               />
             </div>
          </div>
          
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
                 className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                 placeholder="name@example.com"
                 required
               />
             </div>
          </div>
          
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Password</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-slate-400" />
               </div>
               <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-700 font-medium placeholder:text-slate-400"
                 placeholder="••••••••"
                 required
               />
             </div>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-start gap-2 text-sm font-medium border border-red-100">
               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
               <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-xl shadow-emerald-500/20 disabled:opacity-70 transition-all flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Create Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
