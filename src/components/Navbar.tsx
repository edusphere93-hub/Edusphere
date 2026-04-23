import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Leaf, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/images/edusphere_logo_1776841705740.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.email === 'edusphere93@gmail.com';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Assistant', path: '/assistant' },
    ...(isAuthenticated ? [
      { name: 'Quiz', path: '/quiz' },
      { name: 'Results', path: '/results' },
      { name: 'Attendance', path: '/attendance' },
    ] : []),
    ...(isAdmin ? [
      { name: 'Admin', path: '/admin' }
    ] : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#0a0518]/70 backdrop-blur-3xl border-b border-purple-500/20 shadow-[0_10px_40px_rgba(168,85,247,0.15)] sticky top-0 z-50 transform-style-3d perspective-[1000px]">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-8 py-2 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2 [perspective:1000px] z-50 py-1">
            <Link to="/" className="flex items-center gap-4 group [transform-style:preserve-3d] transition-transform duration-500 hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
              {/* CSS 3D Cube Logo */}
              <div className="relative w-12 h-12 [transform-style:preserve-3d] [transform:translateZ(30px)] transition-transform duration-500 group-hover:[transform:translateZ(40px)_rotateY(-15deg)]">
                <div className="absolute inset-0 bg-fuchsia-500 rounded-xl border-t-2 border-l-2 border-fuchsia-300 shadow-[4px_4px_0_0_#a21caf,8px_8px_0_0_#701a75,10px_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-pink-400 rounded-bl-3xl shadow-inner mix-blend-hard-light opacity-90"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-400 rounded-tr-3xl shadow-inner blur-sm opacity-50"></div>
                  <span className="text-white font-black text-2xl relative z-10 drop-shadow-md tracking-tighter italic">E</span>
                </div>
              </div>
              
              {/* 3D Extruded Text Logo */}
              <div className="relative [transform:translateZ(20px)] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:[transform:translateZ(35px)]">
                {/* Text Shadow Extrusion Layer */}
                <span 
                  className="absolute inset-0 text-3xl font-black tracking-tighter text-purple-700 block uppercase"
                  style={{
                    WebkitTextStroke: '1px #701a75',
                    textShadow: '1px 1px 0 #fbcfe8, 2px 2px 0 #f472b6, 3px 3px 0 #d946ef, 4px 4px 0 #a855f7, 5px 5px 0 #7e22ce, 7px 7px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  EduSphere
                </span>
                {/* Base Gradient Text */}
                <span 
                  className="absolute inset-0 text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 block uppercase"
                >
                  EduSphere
                </span>
                {/* Glossy Top Reflection */}
                <span 
                  className="relative text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 block uppercase opacity-90 drop-shadow-sm"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
                  }}
                >
                  EduSphere
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 transform-style-3d">
             <div className="flex items-center gap-4">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      relative px-5 py-2 font-black text-[13px] uppercase tracking-wider rounded-xl flex items-center transition-all duration-300 transform-style-3d
                      ${active 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.5),0_0_30px_rgba(168,85,247,0.3)] translate-y-[-2px]'
                        : 'bg-white/5 text-purple-200 border border-white/10 shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:border-cyan-400/50 hover:text-cyan-300 active:translate-y-[4px] active:shadow-none backdrop-blur-md'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
             </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
               <div className="flex gap-4 ml-4">
                 <Link
                   to="/profile"
                   className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_4px_0_0_rgba(6,182,212,0.15)] rounded-xl font-bold text-sm uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all backdrop-blur-md"
                 >
                   <User className="h-4 w-4" />
                   Profile
                 </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 text-pink-400 border border-pink-500/30 shadow-[0_4px_0_0_rgba(236,72,153,0.15)] rounded-xl font-bold text-sm uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:border-pink-400 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all backdrop-blur-md"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
               </div>
            ) : (
              <div className="flex gap-3 ml-4">
                <Link
                  to="/login"
                  className="px-5 py-2 bg-white/5 text-purple-200 border border-white/10 shadow-[0_4px_0_0_rgba(255,255,255,0.05)] rounded-xl font-bold text-[13px] uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:border-purple-400 hover:text-cyan-300 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all backdrop-blur-md"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold text-[13px] uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-300 hover:text-cyan-300 hover:bg-white/5 focus:outline-none transition-colors border border-transparent hover:border-purple-500/30"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-500/20 bg-[#080214] shadow-[0_20px_50px_rgba(0,0,0,0.8)] absolute w-full left-0 z-50">
          <div className="p-4 space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-3 font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300 text-center
                    ${active 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                      : 'bg-white/5 text-purple-200 border border-white/10 shadow-[0_4px_0_0_rgba(255,255,255,0.05)] active:translate-y-[4px] active:shadow-none hover:border-cyan-400 hover:text-cyan-300'
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {!isAuthenticated && (
              <div className="border-t border-white/10 pt-4 mt-6 flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-3 bg-white/5 text-purple-200 border border-white/10 shadow-[0_4px_0_0_rgba(255,255,255,0.05)] rounded-xl font-bold text-sm uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:border-purple-400 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold text-sm uppercase tracking-wider active:translate-y-[4px] active:shadow-none transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {isAuthenticated && (
               <div className="border-t border-white/10 mt-4 pt-4 px-2 space-y-3">
                 <Link
                   to="/profile"
                   onClick={() => setIsOpen(false)}
                   className="flex items-center justify-center w-full px-4 py-3 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_4px_0_0_rgba(6,182,212,0.15)] rounded-xl font-bold text-sm uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:border-cyan-400 transition-all"
                 >
                   <User className="h-5 w-5 mr-3" />
                   Profile
                 </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center justify-center w-full px-4 py-3 bg-pink-500/10 text-pink-400 border border-pink-500/30 shadow-[0_4px_0_0_rgba(236,72,153,0.15)] rounded-xl font-bold text-sm uppercase tracking-wider active:translate-y-[4px] active:shadow-none hover:border-pink-400 transition-all"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
