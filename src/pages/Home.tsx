import { ArrowRight, Cpu, Globe, Zap, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { MouseEvent } from 'react';

// Reusable 3D Floating Element component
function FloatingElement({ children, className, delay = 0, duration = 4 }: { children: React.ReactNode, className?: string, delay?: number, duration?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotateX: [0, 10, -10, 0],
        rotateY: [0, 15, -15, 0],
        rotateZ: [0, 5, -5, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      className={`absolute ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

// Reusable 3D Tilt Component
function TiltCard({ children, className, depth = 50 }: { children: React.ReactNode, className?: string, depth?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Inner content translates Z for 3D parallax pop */}
      <div style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { isAuthenticated } = useAppContext();

  const courses = [
    { title: "Quantum Computing", icon: <Cpu className="w-8 h-8 text-cyan-400"/>, desc: "Explore the next generation of computation with our immersive simulators.", color: "from-cyan-500/20 to-blue-600/20", border: "border-cyan-500/30" },
    { title: "Applied AI", icon: <Zap className="w-8 h-8 text-purple-400"/>, desc: "Build neural networks and intelligent agents with modern visual programming.", color: "from-purple-500/20 to-pink-600/20", border: "border-purple-500/30" },
    { title: "Global Economics", icon: <Globe className="w-8 h-8 text-emerald-400"/>, desc: "Understand macro trends, digital markets, and 21st century economics.", color: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-500/30" },
  ];

  return (
    <div className="w-full relative rounded-3xl overflow-hidden bg-[#030014] text-slate-200 shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-slate-800">
       
       {/* Futuristic Animated Gradient Background Orbs (Glassmorphism backdrop) */}
       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-700/30 blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-1000 z-0"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-700/20 blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
       <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[100px] pointer-events-none mix-blend-screen z-0"></div>

       {/* Floating 3D Geometric Artifacts */}
       <FloatingElement delay={0} duration={6} className="top-[10%] xl:top-[15%] left-[5%] xl:left-[10%] w-24 h-24 hidden md:block opacity-70 z-0">
          <div className="w-full h-full bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)] opacity-50 backdrop-blur-xl border border-white/20" style={{ transform: "rotateX(45deg) rotateY(45deg) translateZ(100px)" }}></div>
       </FloatingElement>
       
       <FloatingElement delay={1.5} duration={7} className="top-[25%] xl:top-[20%] right-[5%] xl:right-[15%] w-32 h-32 hidden lg:block opacity-60 z-0">
          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-orange-400 rounded-full shadow-[0_0_40px_rgba(236,72,153,0.3)] opacity-40 backdrop-blur-3xl border border-white/10" style={{ transform: "translateZ(-50px)" }}></div>
       </FloatingElement>

       <FloatingElement delay={0.5} duration={5} className="bottom-[35%] left-[15%] w-20 h-20 hidden lg:block opacity-50 z-0">
          <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[69px] border-b-emerald-400/50 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" style={{ transform: "rotateX(20deg) rotateY(-30deg) translateZ(150px)" }}></div>
       </FloatingElement>

       <div className="relative z-10 w-full px-6 py-16 md:px-12 md:py-24 flex flex-col items-center gap-32">
          
          {/* HERO SECTION */}
          <section className="w-full flex flex-col items-center justify-center text-center">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="mb-16 max-w-3xl flex flex-col items-center"
             >
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-200 tracking-wide uppercase">Next-Gen Education Model</span>
                </div>
                
                <motion.div style={{ perspective: "1200px" }} className="mb-8 z-20">
                  <motion.h1 
                    animate={{ 
                      rotateX: [0, 10, -8, 5, 0],
                      rotateY: [0, -12, 10, -6, 0],
                      z: [0, 30, -10, 20, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500 will-change-transform pb-2"
                  >
                     The Future of Learning, <br/>
                     <motion.span 
                       animate={{ 
                         backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                         filter: [
                           "drop-shadow(0px 0px 10px rgba(168,85,247,0.3))", 
                           "drop-shadow(0px 0px 25px rgba(34,211,238,0.6))", 
                           "drop-shadow(0px 0px 10px rgba(168,85,247,0.3))"
                         ]
                       }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       style={{ backgroundSize: "200% auto" }}
                       className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-500 py-2"
                     >
                       Designed for You
                     </motion.span>
                  </motion.h1>
                </motion.div>
                
                <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl px-4 line-clamp-3">
                   Experience our new immersive, physics-driven platform combining AI assistance, glassmorphic design, and highly engaging courses.
                </p>
             </motion.div>

             {/* Main Hero Tilt Card */}
             <TiltCard className="w-full max-w-5xl cursor-auto perspective-[2000px]" depth={40}>
                <div className="w-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden relative group">
                   
                   {/* Hover Glow overlay */}
                   <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   
                   <div className="flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1 text-left relative z-10">
                         <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-md">Master New Skills,<br/>Learn Smarter,<br/>Achieve Faster.</h2>
                         <p className="text-slate-300 mb-10 max-w-md text-lg leading-relaxed">Our intelligent learning paths interact fluidly with your progress. Start your journey into futuristic tech today.</p>
                         
                         <div className="flex flex-wrap gap-4">
                            <Link 
                              to={isAuthenticated ? "/quiz" : "/signup"} 
                              className="relative px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] group/btn transition-all duration-300 transform hover:-translate-y-1"
                            >
                               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-200 to-purple-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-sm mix-blend-multiply"></div>
                               <span className="relative z-10 flex items-center gap-2 text-[15px]">Explore Platform <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"/></span>
                            </Link>
                            <Link to="/about" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                               Read Docs
                            </Link>
                         </div>
                      </div>

                      {/* 3D Image Container */}
                      <div className="w-full md:w-[360px] h-[360px] relative rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform-style-3d group-hover:rotate-1 transition-transform duration-700">
                         <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800&h=800" alt="Futuristic Tech" className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-80"></div>
                         
                         {/* Floating Badges */}
                         <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium text-sm flex items-center gap-2 shadow-lg transform translate-z-[20px]">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online 
                         </div>
                         <div className="absolute top-6 right-6 px-4 py-2 bg-purple-500/40 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold text-sm tracking-widest shadow-lg transform translate-z-[30px]">
                            AI-SYNC
                         </div>
                      </div>
                   </div>
                </div>
             </TiltCard>
          </section>

          {/* COURSES SECTION */}
          <section className="w-full flex flex-col items-center relative z-20">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Immersive Courses</h2>
               <p className="text-slate-400 text-lg">Discover our interactive, physics-based curriculum.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl perspective-[2000px]">
                {courses.map((course, i) => (
                   <TiltCard key={i} className="h-full" depth={30}>
                      <div className={`h-full p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${course.color} backdrop-blur-xl border ${course.border} shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 group flex flex-col`}>
                         <div className="w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center mb-8 border border-white/10 shadow-inner group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                            {course.icon}
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{course.title}</h3>
                         <p className="text-slate-300 mb-8 leading-relaxed font-medium flex-1">{course.desc}</p>
                         <button className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors mt-auto w-fit border-b border-transparent group-hover:border-white/30 pb-1">
                            View Curriculum <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                         </button>
                      </div>
                   </TiltCard>
                ))}
             </div>
          </section>

          {/* ABOUT / CONTACT SECTION */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl perspective-[2000px] pb-12">
             <TiltCard depth={20} className="w-full h-full">
                <div className="p-10 md:p-14 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-2xl border border-white/10 h-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] group hover:bg-slate-900/60 transition-colors">
                   <h2 className="text-3xl font-bold text-white mb-6">About EduSphere</h2>
                   <p className="text-slate-300 leading-relaxed mb-10 text-lg font-medium">
                     We believe in democratizing high-level concepts through interactive 3D simulations, real-time AI assistance, and beautiful, distraction-free glassmorphic interfaces.
                   </p>
                   <Link to="/about" className="inline-block px-8 py-4 bg-white/10 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/20 hover:border-white/30 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                     Learn More About Us
                   </Link>
                </div>
             </TiltCard>

             <TiltCard depth={20} className="w-full h-full">
                <div className="p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-2xl border border-purple-500/20 h-full flex flex-col justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] group hover:border-purple-500/40 transition-colors">
                   <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                   <p className="text-slate-300 leading-relaxed mb-10 text-lg font-medium">
                     Have questions about the platform or want to partner with us? Drop us a line anytime.
                   </p>
                   <Link to="/contact" className="inline-flex items-center w-fit gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all transform hover:-translate-y-1">
                     <Mail className="w-5 h-5" /> Contact Us Today
                   </Link>
                </div>
             </TiltCard>
          </section>

       </div>
    </div>
  );
}
