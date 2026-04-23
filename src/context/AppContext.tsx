import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, setDoc, addDoc } from 'firebase/firestore';

// Types
export interface QuizResult {
  id: string;
  date: string;
  quizName: string;
  score: number;
  total: number;
  userId?: string;
}

export interface StudentAttendance {
  id: string;
  name: string;
  status: 'Present' | 'Absent' | 'Late' | null;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
}

interface AppState {
  results: QuizResult[];
  addResult: (result: Omit<QuizResult, 'id' | 'userId'>) => Promise<void>;
  students: Student[];
  attendanceRecords: Record<string, StudentAttendance[]>; // date -> attendance
  saveAttendance: (date: string, records: StudentAttendance[]) => void;
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const initialStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', grade: '10th' },
  { id: '2', name: 'Bob Smith', grade: '10th' },
  { id: '3', name: 'Charlie Davis', grade: '10th' },
  { id: '4', name: 'Diana Evans', grade: '10th' },
  { id: '5', name: 'Evan Garcia', grade: '10th' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [students] = useState<Student[]>(initialStudents);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, StudentAttendance[]>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setResults([]);
      return;
    }

    let unsubscribe: () => void;
    // Debounce the connection slightly to avoid React 18 Strict Mode double-mount crashes
    const t = setTimeout(() => {
      const q = query(collection(db, 'results'), where('userId', '==', user.uid));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedResults: QuizResult[] = [];
        snapshot.forEach((doc) => {
          fetchedResults.push({ id: doc.id, ...doc.data() } as QuizResult);
        });
        // Sort by date descending
        fetchedResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setResults(fetchedResults);
      }, (error) => {
        console.error("Error fetching results: \n", error);
        if (error.message.toLowerCase().includes('permissions')) {
          console.warn("ACTION REQUIRED: Your Firestore Database is actively blocking reads. You must update your Firestore Security Rules to allow access to the 'results' collection.");
        }
      });
    }, 50);

    return () => {
      clearTimeout(t);
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const addResult = async (result: Omit<QuizResult, 'id' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'results'), {
        ...result,
        userId: user.uid
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const saveAttendance = (date: string, records: StudentAttendance[]) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [date]: records
    }));
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AppContext.Provider value={{
      results, addResult,
      students, attendanceRecords, saveAttendance,
      isAuthenticated, user, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
