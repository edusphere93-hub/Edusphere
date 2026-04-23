import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, ChevronRight, BookOpen, Settings, Play } from 'lucide-react';
import { SUBJECTS, generateQuizData, Question } from '../lib/quizData';

export default function Quiz() {
  const [quizState, setQuizState] = useState<'SETUP' | 'PLAYING' | 'SUBMITTED'>('SETUP');
  
  // Setup State
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].id);
  const [questionCount, setQuestionCount] = useState(10);
  
  // Playing State
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [score, setScore] = useState(0);

  const { addResult } = useAppContext();
  const navigate = useNavigate();

  const handleStart = () => {
    setQuizData(generateQuizData(selectedSubject, questionCount));
    setQuizState('PLAYING');
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
  };

  const handleSelect = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;
    quizData.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setQuizState('SUBMITTED');
    
    // Save Result
    addResult({
      date: new Date().toISOString().split('T')[0],
      quizName: `${selectedSubject} Assessment`,
      score: finalScore,
      total: quizData.length
    });
  };

  const handleRetake = () => {
    setQuizState('SETUP');
  };

  if (quizState === 'SETUP') {
    return (
      <div className="w-full mt-4 flex justify-center py-10 px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl mx-auto flex items-center justify-center mb-4 text-indigo-600">
               <Settings className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Configure Assessment</h1>
            <p className="text-slate-500 mt-2">Choose your subject and personalize your quiz length.</p>
          </div>

          <div className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 block">Select Subject</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`p-4 rounded-2xl border-2 transition-all font-bold text-sm
                      ${selectedSubject === subject.id 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50'}`}
                  >
                    <BookOpen className={`w-5 h-5 mb-2 mx-auto ${selectedSubject === subject.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Slider */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                 <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Number of Questions</label>
                 <span className="bg-indigo-100 text-indigo-800 font-black px-3 py-1 rounded-lg">{questionCount}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                step="5"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 px-1">
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_0_0_#3730a3] active:translate-y-[4px] active:shadow-none transition-all flex justify-center items-center gap-2 text-lg uppercase tracking-wide"
            >
              Start Quiz
              <Play className="h-5 w-5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeQuestion = quizData[currentQuestion];
  const selectedOption = selectedAnswers[currentQuestion];

  if (!activeQuestion && quizState !== 'SETUP') {
    return (
       <div className="w-full mt-4 flex justify-center py-10 px-4">
         <div className="text-slate-500 font-bold animate-pulse">Loading Quiz Content...</div>
       </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden max-w-4xl mx-auto">
        {/* Header (Playing and Submitted) */}
        <div className="border-b border-slate-100 bg-slate-50 px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{selectedSubject} Assessment</h1>
            {quizState !== 'SUBMITTED' && (
              <div className="bg-indigo-100 text-indigo-800 text-sm font-bold px-4 py-1.5 rounded-lg">
                Question {currentQuestion + 1} of {quizData.length}
              </div>
            )}
          </div>
          {/* Progress Bar */}
          {quizState !== 'SUBMITTED' && (
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
               <div 
                 className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                 style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
               ></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-8 py-10">
          {quizState === 'SUBMITTED' ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-10"
            >
               <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6 relative">
                 <CheckCircle2 className="h-12 w-12 text-emerald-600 absolute z-10" />
                 <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-30 rounded-full animate-pulse"></div>
               </div>
               <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Quiz Completed!</h2>
               <p className="text-lg text-slate-500 mb-8 font-medium">
                 You scored <span className="font-black text-indigo-600 px-2 text-3xl">{score}</span> out of {quizData.length}
               </p>
               <div className="flex justify-center gap-4">
                 <button 
                   onClick={() => navigate('/results')}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-[0_4px_0_0_#3730a3] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide"
                 >
                   View All Results
                 </button>
                 <button 
                   onClick={handleRetake}
                   className="bg-slate-100 border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_4px_0_0_#e2e8f0] active:translate-y-[4px] active:shadow-none uppercase tracking-wide"
                 >
                   Take Another Quiz
                 </button>
               </div>
            </motion.div>
          ) : (
            <motion.div 
               key={currentQuestion}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-8 border-none leading-relaxed">
                {activeQuestion.question}
              </h2>
              <div className="space-y-4">
                {activeQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all flex items-center justify-between
                      ${selectedOption === idx 
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold shadow-sm' 
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-700 font-medium shadow-none'
                      }`}
                  >
                    <span>
                      <span className={`inline-block w-8 font-bold ${selectedOption === idx ? 'text-indigo-500' : 'text-slate-400'}`}>
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {option}
                    </span>
                    {selectedOption === idx && <CheckCircle2 className="h-6 w-6 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        {quizState === 'PLAYING' && (
          <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                currentQuestion === 0 
                  ? 'text-slate-400 cursor-not-allowed opacity-50' 
                  : 'text-slate-700 hover:bg-slate-200 active:bg-slate-300'
              }`}
            >
              Previous
            </button>
            
            {currentQuestion === quizData.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null || selectedOption === undefined}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 disabled:shadow-none text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_4px_0_0_#059669] active:translate-y-[4px] active:shadow-none flex items-center gap-2 uppercase tracking-wide"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={selectedOption === null || selectedOption === undefined}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200 disabled:shadow-none text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_4px_0_0_#3730a3] active:translate-y-[4px] active:shadow-none flex items-center gap-2 uppercase tracking-wide"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
