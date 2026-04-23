import { useState } from 'react';
import { useAppContext, StudentAttendance } from '../context/AppContext';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Attendance() {
  const { students, attendanceRecords, saveAttendance } = useAppContext();
  
  // Format today's date for defaults
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Initialize today's records if they don't exist in local state 
  const [currentDraft, setCurrentDraft] = useState<StudentAttendance[]>(() => {
    if (attendanceRecords[selectedDate]) {
      return attendanceRecords[selectedDate];
    }
    return students.map(s => ({ id: s.id, name: s.name, status: null }));
  });

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    if (attendanceRecords[newDate]) {
      setCurrentDraft(attendanceRecords[newDate]);
    } else {
      setCurrentDraft(students.map(s => ({ id: s.id, name: s.name, status: null })));
    }
  };

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setCurrentDraft(prev => prev.map(record => 
      record.id === studentId ? { ...record, status } : record
    ));
  };

  const handleSave = () => {
    saveAttendance(selectedDate, currentDraft);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  // Stats
  const presentCount = currentDraft.filter(r => r.status === 'Present').length;
  const absentCount = currentDraft.filter(r => r.status === 'Absent').length;
  const lateCount = currentDraft.filter(r => r.status === 'Late').length;
  const totalMarked = presentCount + absentCount + lateCount;

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 gap-4 px-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Attendance Management</h1>
          <p className="text-slate-500 mt-2">Mark and track student attendance records.</p>
        </div>
        
        <div className="flex flex-col gap-1.5 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm">
           <label htmlFor="date-select" className="text-xs font-bold text-slate-400 uppercase tracking-wide px-1">Select Date</label>
           <input 
             id="date-select"
             type="date" 
             value={selectedDate}
             onChange={handleDateChange}
             className="border-none bg-slate-50 rounded-xl px-4 py-2 font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
           />
        </div>
      </div>

      {/* Summary Banner (Bento blocks) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-5 flex flex-col justify-between">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Total Marked</p>
          <p className="text-3xl font-black text-slate-800 mt-2">{totalMarked} <span className="text-lg text-slate-400 font-medium tracking-normal">/ {students.length}</span></p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 shadow-sm rounded-3xl p-5 flex flex-col justify-between">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-wide">Present</p>
          <p className="text-3xl font-black text-emerald-700 mt-2">{presentCount}</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 shadow-sm rounded-3xl p-5 flex flex-col justify-between">
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-wide">Late</p>
          <p className="text-3xl font-black text-indigo-700 mt-2">{lateCount}</p>
        </div>
        <div className="bg-red-50 border border-red-100 shadow-sm rounded-3xl p-5 flex flex-col justify-between">
          <p className="text-red-600 text-xs font-bold uppercase tracking-wide">Absent</p>
          <p className="text-3xl font-black text-red-700 mt-2">{absentCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        {/* Table */}
        <div className="overflow-x-auto p-2">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Attendance Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentDraft.map((record, index) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm mr-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                         {record.name.charAt(0)}
                      </div>
                      <div className="text-sm font-bold text-slate-800">{record.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                       <button
                         onClick={() => handleStatusChange(record.id, 'Present')}
                         className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                           record.status === 'Present' 
                             ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                             : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-emerald-200 hover:text-emerald-600'
                         }`}
                       >
                         Present
                       </button>
                       <button
                         onClick={() => handleStatusChange(record.id, 'Late')}
                         className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                           record.status === 'Late' 
                             ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                             : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                         }`}
                       >
                         Late
                       </button>
                       <button
                         onClick={() => handleStatusChange(record.id, 'Absent')}
                         className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                           record.status === 'Absent' 
                             ? 'bg-red-500 text-white shadow-md shadow-red-500/20' 
                             : 'bg-white border-2 border-slate-100 text-slate-500 hover:border-red-200 hover:text-red-600'
                         }`}
                       >
                         Absent
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          {totalMarked < students.length ? (
            <span className="flex items-center text-sm text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg">
              <AlertCircle className="w-4 h-4 mr-2" />
              {students.length - totalMarked} students unmarked
            </span>
          ) : (
            <span className="flex items-center text-sm text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              All students marked
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {showSaveSuccess && (
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-emerald-600 font-bold"
            >
              Saved successfully!
            </motion.span>
          )}
          <button
            onClick={handleSave}
            disabled={totalMarked === 0}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-indigo-900/20 transition-all disabled:shadow-none w-full sm:w-auto justify-center"
          >
            <Save className="w-4 h-4" />
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
