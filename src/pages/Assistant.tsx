import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
// Note: AI Studio injects process.env.GEMINI_API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: "Hello! I'm your EduSphere AI Assistant. How can I help you with your learning goals today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userMsg };
    setMessages((prev) => [...prev, newUserMsg]);

    try {
      // Build conversation history for the model
      const contents = messages.slice(1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMsg }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: contents,
      });

      const modelResponseText = response.text || "I'm sorry, I couldn't generate a response.";
      
      const newModelMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: modelResponseText 
      };
      
      setMessages((prev) => [...prev, newModelMsg]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: "Sorry, I encountered an error. Please try again later. Make sure your GEMINI_API_KEY is configured." 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 max-w-4xl mx-auto h-[var(--app-h,80vh)]">
      <div className="flex flex-col h-full bg-white rounded-3xl border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-pink-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">EduSphere Assistant</h1>
              <p className="text-sm text-purple-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                Powered by Gemini
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm ${
                  message.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border-2 border-slate-100 text-purple-600'
                }`}>
                  {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className={`px-5 py-4 rounded-2xl ${
                  message.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-sm shadow-[0_4px_15px_rgba(79,70,229,0.2)]'
                  : 'bg-white border-2 border-slate-100 text-slate-700 rounded-tl-sm shadow-[0_4px_15px_rgba(0,0,0,0.03)]'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex gap-4 max-w-[85%] mr-auto"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white border-2 border-slate-100 text-purple-600 flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 rounded-tl-sm flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span className="text-sm font-medium text-slate-500 animate-pulse">Assistant is thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask anything about your courses..."
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700 font-medium placeholder:text-slate-400 outline-none pr-16 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
