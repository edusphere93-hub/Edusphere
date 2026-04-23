/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Assistant from './pages/Assistant';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Attendance from './pages/Attendance';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030014] font-sans text-slate-200 overflow-x-hidden selection:bg-purple-500/30 selection:text-cyan-200">
      {/* Global Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
      </div>
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 flex flex-col items-center w-full transform-style-3d perspective-[2000px]">
          <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col items-center justify-center relative translate-z-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
