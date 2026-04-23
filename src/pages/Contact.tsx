import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit behavior
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full flex flex-col mt-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" style={{ perspective: '1200px' }}>
        
        {/* Header/Title Card */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="md:col-span-12 bg-white rounded-3xl p-8 lg:p-12 border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
          <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-3 block">Reach Out</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Let's get in touch
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions about the EduSphere platform? We're here to help. Send us a message and our education experts will respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Form Container */}
        <motion.div 
           initial={{ opacity: 0, y: 20, rotateY: 5 }}
           animate={{ opacity: 1, y: 0, rotateY: 0 }}
           transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
           className="md:col-span-8 bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-[0_8px_0_0_#e2e8f0]"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 outline-none" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 outline-none" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide px-1">Message</label>
              <textarea 
                required 
                rows={5} 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 resize-none outline-none" 
                placeholder="How can we help you today?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-slate-800 text-white font-bold py-3 px-8 rounded-xl shadow-[0_6px_0_0_#0f172a] hover:shadow-[0_4px_0_0_#0f172a] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#0f172a] active:translate-y-[6px] transition-all flex items-center justify-center gap-2 w-full sm:w-auto overflow-hidden group"
            >
              <span className="relative z-10 flex gap-2 items-center">
                Submit Request
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </form>
        </motion.div>

        {/* Direct Contact Info & Socials Sidebar */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <motion.div 
             initial={{ opacity: 0, y: 20, rotateY: -5 }}
             animate={{ opacity: 1, y: 0, rotateY: 0 }}
             transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
             className="bg-gradient-to-b from-purple-50 to-pink-50 border-2 border-purple-100 rounded-3xl p-8 flex-1 shadow-[0_8px_0_0_#f3e8ff]"
          >
            <h3 className="text-xl font-bold text-purple-900 mb-6">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-purple-600 border border-purple-100 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Email us</div>
                  <a href="mailto:hello@edusphere.com" className="text-slate-700 font-medium hover:text-purple-600 transition-colors">hello@edusphere.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-purple-600 border border-purple-100 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Call us</div>
                  <a href="tel:+1234567890" className="text-slate-700 font-medium hover:text-purple-600 transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-purple-600 border border-purple-100 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400">Visit us</div>
                  <p className="text-slate-700 font-medium leading-tight mt-1">
                    123 Learning Lane<br />
                    Innovation Park<br />
                    Tech City, TC 10010
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-[0_8px_0_0_#0f172a]"
          >
            <h3 className="text-lg font-bold mb-4 relative z-10">Follow Us</h3>
            <div className="flex gap-4 relative z-10">
              <a href="#" className="w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-xl flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 hover:-translate-y-1 transition-all shadow-[0_4px_0_0_#334155] hover:shadow-[0_4px_0_0_#be185d]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-xl flex items-center justify-center hover:bg-purple-500 hover:border-purple-500 hover:-translate-y-1 transition-all shadow-[0_4px_0_0_#334155] hover:shadow-[0_4px_0_0_#7e22ce]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-500 hover:-translate-y-1 transition-all shadow-[0_4px_0_0_#334155] hover:shadow-[0_4px_0_0_#4338ca]">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-pink-500 to-purple-600 blur-2xl rounded-full opacity-30 pointer-events-none"></div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
