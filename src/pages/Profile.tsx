import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { UserCircle, Target, Award, BrainCircuit, Activity, CalendarDays } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function Profile() {
  const { user, isAuthenticated, results } = useAppContext();

  // Redirect if not logged in
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  const {
    totalQuizzes,
    averageScore,
    weakness,
    strength,
    progressData,
    overallAccuracy
  } = useMemo(() => {
    if (!results || results.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        weakness: 'Not enough data',
        strength: 'Not enough data',
        progressData: [],
        overallAccuracy: 0
      };
    }

    const totalQuizzes = results.length;
    let totalScore = 0;
    let totalQuestions = 0;
    
    // Group by Subject
    const subjectStats: Record<string, { score: number, total: number }> = {};
    const chartData = [...results].reverse().map((r, idx) => {
      // Extract Subject from QuizName (e.g. "Maths Assessment" -> "Maths")
      const subject = r.quizName.replace(' Assessment', '');
      
      if (!subjectStats[subject]) {
        subjectStats[subject] = { score: 0, total: 0 };
      }
      subjectStats[subject].score += r.score;
      subjectStats[subject].total += r.total;
      
      totalScore += r.score;
      totalQuestions += r.total;

      const acc = Math.round((r.score / r.total) * 100);

      return {
        name: `Quiz ${idx + 1}`,
        date: r.date,
        accuracy: acc,
        subject: subject
      };
    });

    const averageScore = Math.round((totalScore / totalQuestions) * 100) || 0;
    const overallAccuracy = averageScore;

    let weakness = 'None';
    let strength = 'None';
    let minAcc = 200;
    let maxAcc = -1;

    Object.entries(subjectStats).forEach(([subject, stats]) => {
      const acc = Math.round((stats.score / stats.total) * 100);
      if (acc < minAcc) {
        minAcc = acc;
        weakness = subject;
      }
      if (acc > maxAcc) {
        maxAcc = acc;
        strength = subject;
      }
    });

    return {
      totalQuizzes,
      averageScore,
      weakness,
      strength,
      progressData: chartData,
      overallAccuracy
    };

  }, [results]);

  // Mock attendance data for visual completeness as requested relative to generic user
  const mockAttendanceValue = 92;

  return (
    <div className="w-full mt-4 pb-12">
      {/* Header Profile Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
             {user?.displayName ? (
                <span className="text-4xl font-black">{user.displayName.charAt(0).toUpperCase()}</span>
             ) : (
                <UserCircle className="w-16 h-16" />
             )}
          </div>
          <div className="text-center md:text-left pt-2">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{user?.displayName || 'Student Profile'}</h1>
            <p className="text-slate-500 font-medium text-lg">{user?.email}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
               <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide">Active Student</span>
               <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wide">Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Target className="w-5 h-5" /></div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Quizzes Taken</p>
          </div>
          <p className="text-4xl font-black text-slate-800">{totalQuizzes}</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600"><Award className="w-5 h-5" /></div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Average Score</p>
          </div>
          <p className="text-4xl font-black text-slate-800">{overallAccuracy}<span className="text-2xl text-slate-400">%</span></p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><BrainCircuit className="w-5 h-5" /></div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Top Weakness</p>
          </div>
          <p className="text-2xl font-black text-amber-600 leading-tight">{weakness}</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-blue-50 rounded-xl text-blue-500"><CalendarDays className="w-5 h-5" /></div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Attendance</p>
          </div>
          <p className="text-4xl font-black text-slate-800">{mockAttendanceValue}<span className="text-2xl text-slate-400">%</span></p>
        </motion.div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-6">
        <div className="flex items-center gap-3 mb-8">
           <Activity className="w-6 h-6 text-indigo-600" />
           <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Learning Progress</h2>
        </div>
        
        {progressData.length > 0 ? (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3'}}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 w-full flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
             <Activity className="w-12 h-12 text-slate-300 mb-4" />
             <p className="text-slate-500 font-medium">Take some quizzes to see your progress chart!</p>
          </div>
        )}
      </div>
      
      {/* Recent Activity List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
         <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">Recent Activity</h2>
         {results.length > 0 ? (
            <div className="space-y-4">
              {results.slice(0, 5).map((r, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                       {r.quizName.charAt(0)}
                     </div>
                     <div>
                       <p className="font-bold text-slate-800">{r.quizName}</p>
                       <p className="text-xs font-bold text-slate-400">{r.date}</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-slate-800">{r.score} <span className="text-sm font-medium text-slate-400">/ {r.total}</span></p>
                    <p className="text-xs font-bold text-emerald-600">{Math.round((r.score/r.total)*100)}% Accuracy</p>
                  </div>
                </div>
              ))}
            </div>
         ) : (
            <p className="text-slate-500 font-medium text-center py-8">No recent activity found.</p>
         )}
      </div>
    </div>
  );
}
