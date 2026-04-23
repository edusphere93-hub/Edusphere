import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { collection, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '../lib/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { ShieldAlert, Users, Trash2, UserPlus, Loader2, AlertCircle } from 'lucide-react';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add User Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!user || user.email !== 'edusphere93@gmail.com') {
      navigate('/');
      return;
    }

    let unsubscribe: () => void;
    // Debounce to prevent React 18 Strict Mode Firestore internal assertion crashes
    const t = setTimeout(() => {
      unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        const u: UserProfile[] = [];
        snapshot.forEach(doc => {
          u.push(doc.data() as UserProfile);
        });
        setUsersList(u);
        setLoading(false);
      }, (err) => {
        console.error("Users list fetch error:", err);
        setError("Missing permissions: Your Firestore rules are blocking this request. Please update your Rules in the Firebase Console.");
        setLoading(false);
      });
    }, 50);

    return () => {
      clearTimeout(t);
      if (unsubscribe) unsubscribe();
    };
  }, [user, navigate]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) return;

    setIsAdding(true);
    setError('');
    
    try {
      // 1. Initialize a secondary Firebase instance so we don't log the admin out!
      const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
      const secondaryAuth = getAuth(secondaryApp);

      // 2. Create the user in Firebase Auth via secondary app
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newEmail, newPassword);
      const newUser = userCredential.user;

      // 3. Set display name
      await updateProfile(newUser, { displayName: newName });

      // 4. Add the user to our Firestore Users collection
      await setDoc(doc(db, 'users', newUser.uid), {
        uid: newUser.uid,
        name: newName,
        email: newEmail,
        createdAt: new Date().toISOString(),
        role: 'student'
      });

      // 5. Cleanup the secondary instance
      await signOut(secondaryAuth);
      
      // Reset form
      setNewName('');
      setNewEmail('');
      setNewPassword('');

    } catch (err: any) {
      console.error("Add user error:", err);
      if (err.code === 'auth/email-already-in-use') {
         setError("This email address is already registered in the system.");
      } else if (err.code === 'auth/weak-password') {
         setError("Password must be at least 6 characters.");
      } else {
         setError(err.message || "Failed to add user.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this user from the database?\n\nNote: For complete Firebase Auth deletion, you must delete them from the Firebase Console.");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'users', uid));
    } catch (err: any) {
      console.error("Delete user error:", err);
      setError("Failed to delete user doc: " + err.message);
    }
  };

  if (!user || user.email !== 'edusphere93@gmail.com') return null;

  return (
    <div className="w-full mt-8 max-w-6xl mx-auto space-y-8">
      
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-indigo-300" />
            Admin Dashboard
          </h1>
          <p className="text-indigo-200 mt-2">Manage all registered users in EduSphere.</p>
        </div>
        <div className="hidden sm:flex bg-white/20 p-4 rounded-2xl items-center gap-4 border border-white/10 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-bold text-xl shadow-sm">
            {usersList.length}
          </div>
          <div>
            <div className="text-sm text-indigo-100 font-bold uppercase tracking-wider">Total Users</div>
            <div className="text-xs text-indigo-200">Across Database</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl flex items-start gap-3 border border-red-200">
           <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
           <div>
             <span className="font-bold">Error Occurred</span>
             <p className="text-sm mt-1">{error}</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD USER FORM */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-fit">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Add New User</h2>
          </div>

          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <input 
                type="text" required value={newName} onChange={e => setNewName(e.target.value)}
                className="w-full mt-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                placeholder="Student Name"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
              <input 
                type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)}
                className="w-full mt-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                placeholder="student@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <input 
                type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                className="w-full mt-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                placeholder="Min 6 characters"
                minLength={6}
              />
            </div>
            <button 
              type="submit" disabled={isAdding}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_0_0_#3730a3] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-4 h-4" /> Create User</>}
            </button>
          </form>
        </div>

        {/* USERS LIST TABLE */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">User Directory</h2>
            </div>
          </div>
          
          <div className="overflow-x-auto p-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-600" />
                <p>Loading database records...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider py-3 px-4">User</th>
                    <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider py-3 px-4">Role</th>
                    <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider py-3 px-4">Joined</th>
                    <th className="text-right text-xs font-bold text-slate-400 uppercase tracking-wider py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">No users found.</td>
                    </tr>
                  ) : (
                    usersList.map(u => (
                      <tr key={u.uid} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{u.name}</p>
                          <p className="text-sm text-slate-500">{u.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'} text-xs font-bold px-2 py-1 rounded-md uppercase`}>
                            {u.role || 'Student'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 font-medium">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {u.email !== 'edusphere93@gmail.com' && (
                            <button 
                              onClick={() => handleDeleteUser(u.uid)}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-500 hover:text-white flex items-center justify-center ml-auto transition-colors"
                              title="Delete User Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
