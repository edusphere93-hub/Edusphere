import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Award, Calendar, FileText, Trophy } from 'lucide-react';

export default function Results() {
  const { results } = useAppContext();

  // Basic stats
  const averageScore = results.length > 0 
    ? (results.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / results.length) * 100 
    : 0;

  return (
    <div className="w-full mt-4">
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Result Management</h1>
        <p className="text-slate-500 mt-2">Track student performance and identify areas for improvement.</p>
      </div>

      {/* Stats Cards (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"
         >
           <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
             <FileText className="h-6 w-6" />
           </div>
           <div>
             <p className="text-indigo-500 text-xs font-bold uppercase mb-1 tracking-wide">Total Quizzes</p>
             <p className="text-4xl font-black text-slate-800 tracking-tight italic">{results.length}</p>
           </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between"
         >
           <div className="bg-emerald-200/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
             <Trophy className="h-6 w-6" />
           </div>
           <div>
             <p className="text-emerald-600 text-xs font-bold uppercase mb-1 tracking-wide">Class Average</p>
             <p className="text-4xl font-black text-slate-800 tracking-tight italic">{averageScore.toFixed(1)}<span className="text-xl">%</span></p>
           </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-slate-800 p-6 rounded-3xl shadow-sm flex flex-col justify-between text-white relative overflow-hidden"
         >
           <div className="bg-slate-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-emerald-400 relative z-10">
             <Award className="h-6 w-6" />
           </div>
           <div className="relative z-10">
             <p className="text-indigo-300 text-xs font-bold uppercase mb-1 tracking-wide">Top Performer</p>
             <p className="text-4xl font-black tracking-tight italic text-white flex items-baseline">
               {results.length > 0 ? Math.max(...results.map(r => (r.score / r.total) * 100)).toFixed(0) : 0}
               <span className="text-xl ml-1">%</span>
             </p>
           </div>
           <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full"></div>
         </motion.div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto p-2">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Assessment Name
                </th>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Percentage
                </th>
                <th scope="col" className="px-6 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    <p className="text-lg font-medium">No results found.</p>
                    <p className="text-sm mt-1">Take a quiz to see your data here.</p>
                  </td>
                </tr>
              ) : (
                results.map((result) => {
                  const percentage = (result.score / result.total) * 100;
                  const passed = percentage >= 60;
                  
                  return (
                    <tr key={result.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="font-medium">{result.date}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-800">
                        {result.quizName}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-slate-600">
                        <span className="text-indigo-600">{result.score}</span> / {result.total}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                         <div className="flex items-center gap-3">
                           <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${passed ? 'bg-emerald-500' : 'bg-red-400'}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                           </div>
                           <span className="text-sm font-bold text-slate-700">{percentage.toFixed(0)}%</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                          passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600'
                        }`}>
                          {passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
