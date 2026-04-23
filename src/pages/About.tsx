import React from 'react';
import { motion } from 'motion/react';
import logo from '../assets/images/edusphere_logo_1776841705740.png';

export default function About() {
  return (
    <div className="w-full mt-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12 bg-white rounded-3xl p-12 border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-center gap-4 [perspective:1000px] mb-8">
            <div className="relative w-20 h-20 [transform-style:preserve-3d] [transform:translateZ(30px)_rotateY(-15deg)_rotateX(10deg)] hover:[transform:translateZ(50px)_rotateY(-30deg)] transition-all duration-700">
                <div className="absolute inset-0 bg-fuchsia-500 rounded-2xl border-t-4 border-l-4 border-fuchsia-300 shadow-[6px_6px_0_0_#a21caf,12px_12px_0_0_#701a75,15px_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-400 rounded-bl-3xl shadow-inner mix-blend-hard-light opacity-90"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-400 rounded-tr-3xl shadow-inner blur-sm opacity-50"></div>
                  <span className="text-white font-black text-4xl relative z-10 drop-shadow-md tracking-tighter italic">E</span>
                </div>
            </div>
            
            <div className="relative [transform:translateZ(20px)_rotateY(-10deg)]">
                {/* Text Shadow Extrusion Layer */}
                <span 
                  className="absolute inset-0 text-5xl font-black tracking-tighter text-purple-800 block uppercase"
                  style={{
                    WebkitTextStroke: '2px #701a75',
                    textShadow: '1px 1px 0 #fbcfe8, 2px 2px 0 #f472b6, 3px 3px 0 #d946ef, 4px 4px 0 #a855f7, 5px 5px 0 #7e22ce, 6px 6px 0 #581c87, 10px 10px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  EduSphere
                </span>
                {/* Base Gradient Text */}
                <span 
                  className="absolute inset-0 text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 block uppercase"
                >
                  EduSphere
                </span>
                {/* Glossy Top Reflection */}
                <span 
                  className="relative text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 block uppercase opacity-90 drop-shadow-sm"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
                  }}
                >
                  EduSphere
                </span>
            </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">About EduSphere</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Growing minds. Nurturing futures. Building the digital classroom of tomorrow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-emerald-50 rounded-3xl p-8 shadow-sm border border-emerald-100 flex flex-col justify-center"
        >
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 block">Mission</span>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Empower Educators</h2>
          <p className="text-slate-600 leading-relaxed">
            At EduSphere, our mission is to provide educators with intuitive, powerful tools that simplify classroom management and amplify student growth. We believe that technology should fade into the background, allowing teachers to focus on what matters most: human connection and personalized learning.
          </p>
        </motion.section>

        <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-slate-800 rounded-3xl p-8 shadow-sm text-white flex flex-col justify-center"
        >
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-3 block">Vision</span>
          <h2 className="text-2xl font-bold text-white mb-4">The Symbolism</h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Our logo blends two vital elements: a <strong className="text-emerald-400">book</strong> and a <strong className="text-emerald-400">growing plant</strong>.
            </p>
            <p>
              The book represents foundational knowledge, academic rigor, and the vast history of shared human understanding, while the plant rising from its pages symbolizes organic growth and potential.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
