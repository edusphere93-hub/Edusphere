export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const SUBJECTS = [
  { id: 'Maths', name: 'Maths' },
  { id: 'Hindi', name: 'Hindi' },
  { id: 'English', name: 'English' },
  { id: 'Science', name: 'Science' },
  { id: 'Social Science', name: 'Social Science' },
  { id: 'Current Affairs', name: 'Current Affairs' },
];

const baseQuestions: Record<string, Question[]> = {
  'Maths': [
    { id: 'm1', question: 'What is 15 + 27?', options: ['32', '42', '52', '40'], correctAnswer: 1 },
    { id: 'm2', question: 'What is the square root of 144?', options: ['10', '11', '12', '14'], correctAnswer: 2 },
    { id: 'm3', question: 'What is 9 * 8?', options: ['64', '72', '81', '56'], correctAnswer: 1 },
    { id: 'm4', question: 'If x + 5 = 12, what is x?', options: ['5', '6', '7', '8'], correctAnswer: 2 },
    { id: 'm5', question: 'What is 100 / 4?', options: ['20', '25', '30', '50'], correctAnswer: 1 },
    { id: 'm6', question: 'What is the cube of 3?', options: ['9', '18', '27', '81'], correctAnswer: 2 },
    { id: 'm7', question: 'What is 5% of 200?', options: ['5', '10', '20', '15'], correctAnswer: 1 },
    { id: 'm8', question: 'What is the perimeter of a rectangle with sides 4 and 5?', options: ['18', '20', '9', '16'], correctAnswer: 0 },
    { id: 'm9', question: 'What is 2^5?', options: ['10', '16', '32', '64'], correctAnswer: 2 },
    { id: 'm10', question: 'Solve: 15 - 3 * 2', options: ['24', '12', '9', '6'], correctAnswer: 2 },
  ],
  'Hindi': [
    { id: 'h1', question: 'How many vowels (Swar) are generally considered in Hindi?', options: ['9', '11', '13', '15'], correctAnswer: 1 },
    { id: 'h2', question: 'Which is the correct spelling for "Water" in Hindi?', options: ['पानी', 'पानि', 'पाणी', 'पनी'], correctAnswer: 0 },
    { id: 'h3', question: 'What is the synonym (Paryayvachi) of "Surya" (Sun)?', options: ['सोम', 'रवि', 'नभ', 'जल'], correctAnswer: 1 },
    { id: 'h4', question: 'What is the antonym (Vilom) of "Aakash" (Sky)?', options: ['पाताल', 'धरती', 'अग्नि', 'हवा'], correctAnswer: 0 },
    { id: 'h5', question: 'Who wrote the Indian national anthem "Jana Gana Mana"?', options: ['Munshi Premchand', 'Rabindranath Tagore', 'Mahadevi Varma', 'Tulsidas'], correctAnswer: 1 },
    { id: 'h6', question: 'Which of the following is an adjective (Visheshan)?', options: ['सुंदर (Beautiful)', 'जाना (Go)', 'राम (Ram)', 'और (And)'], correctAnswer: 0 },
    { id: 'h7', question: 'What is the Hindi term for "Noun"?', options: ['सर्वनाम', 'क्रिया', 'विशेषण', 'संज्ञा'], correctAnswer: 3 },
    { id: 'h8', question: 'Complete the proverb: "अधजल गगरी..."', options: ['छलकत जाए', 'भरत जाए', 'गिरत जाए', 'चमकत जाए'], correctAnswer: 0 },
    { id: 'h9', question: 'What is the meaning of "Kamal" (कमल)?', options: ['Rose', 'Lotus', 'Sunflower', 'Jasmine'], correctAnswer: 1 },
    { id: 'h10', question: 'Identify the correct plural form of "Larka" (लड़का).', options: ['लड़की', 'लड़कों', 'लड़के', 'लड़कियाँ'], correctAnswer: 2 },
  ],
  'English': [
    { id: 'e1', question: 'What is the plural of "Child"?', options: ['Childs', 'Children', 'Childrens', 'Childes'], correctAnswer: 1 },
    { id: 'e2', question: 'Identify the noun in the sentence: "The fast car zoomed past."', options: ['fast', 'zoomed', 'car', 'past'], correctAnswer: 2 },
    { id: 'e3', question: 'What is the opposite of "Accept"?', options: ['Deny', 'Reject', 'Ignore', 'Refuse'], correctAnswer: 1 },
    { id: 'e4', question: 'Which word is a synonym for "Happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], correctAnswer: 2 },
    { id: 'e5', question: 'Choose the correct spelling.', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], correctAnswer: 1 },
    { id: 'e6', question: 'What tense is "I will go"?', options: ['Past', 'Present', 'Future', 'Continuous'], correctAnswer: 2 },
    { id: 'e7', question: 'Identify the verb: "She sings beautifully."', options: ['She', 'sings', 'beautifully', 'none'], correctAnswer: 1 },
    { id: 'e8', question: 'Which article fits? "__ apple a day keeps the doctor away."', options: ['A', 'An', 'The', 'No article'], correctAnswer: 1 },
    { id: 'e9', question: 'What is the comparative form of "Big"?', options: ['Bigger', 'Biggest', 'More big', 'Most big'], correctAnswer: 0 },
    { id: 'e10', question: 'What is an adjective in "The lazy dog slept"?', options: ['The', 'lazy', 'dog', 'slept'], correctAnswer: 1 },
  ],
  'Science': [
    { id: 's1', question: 'What is the chemical symbol for Water?', options: ['HO', 'H2O', 'O2H', 'H2O2'], correctAnswer: 1 },
    { id: 's2', question: 'What gas do plants primarily absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2 },
    { id: 's3', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctAnswer: 2 },
    { id: 's4', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'], correctAnswer: 1 },
    { id: 's5', question: 'At what temperature does water boil (in Celsius)?', options: ['50', '90', '100', '120'], correctAnswer: 2 },
    { id: 's6', question: 'What force keeps us on the ground?', options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], correctAnswer: 2 },
    { id: 's7', question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 2 },
    { id: 's8', question: 'Which organ pumps blood in the human body?', options: ['Lungs', 'Brain', 'Liver', 'Heart'], correctAnswer: 3 },
    { id: 's9', question: 'What part of the plant conducts photosynthesis?', options: ['Roots', 'Stem', 'Leaves', 'Flowers'], correctAnswer: 2 },
    { id: 's10', question: 'What is the main source of energy for Earth?', options: ['The Moon', 'The Sun', 'Geothermal', 'Wind'], correctAnswer: 1 },
  ],
  'Social Science': [
    { id: 'ss1', question: 'Which is the largest continent by area?', options: ['Africa', 'Asia', 'North America', 'Europe'], correctAnswer: 1 },
    { id: 'ss2', question: 'Who is known as the Father of the Indian Nation?', options: ['Jawaharlal Nehru', 'Bhagat Singh', 'Mahatma Gandhi', 'Subhas Chandra Bose'], correctAnswer: 2 },
    { id: 'ss3', question: 'What is the capital city of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correctAnswer: 2 },
    { id: 'ss4', question: 'How many states are there currently in India?', options: ['27', '28', '29', '30'], correctAnswer: 1 },
    { id: 'ss5', question: 'Which ocean is directly south of India?', options: ['Pacific', 'Atlantic', 'Arctic', 'Indian'], correctAnswer: 3 },
    { id: 'ss6', question: 'The Taj Mahal is located in which city?', options: ['Jaipur', 'Agra', 'Delhi', 'Lucknow'], correctAnswer: 1 },
    { id: 'ss7', question: 'The Constitution of India came into effect in which year?', options: ['1947', '1948', '1950', '1952'], correctAnswer: 2 },
    { id: 'ss8', question: 'What is the longest river in India?', options: ['Yamuna', 'Godavari', 'Brahmaputra', 'Ganga'], correctAnswer: 3 },
    { id: 'ss9', question: 'Who was the first Prime Minister of independent India?', options: ['Rajendra Prasad', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Patel'], correctAnswer: 2 },
    { id: 'ss10', question: 'Which state is known as the "Land of Five Rivers"?', options: ['Haryana', 'Gujarat', 'Punjab', 'Rajasthan'], correctAnswer: 2 },
  ],
  'Current Affairs': [
    { id: 'ca1', question: 'Which organization is responsible for India\'s space program?', options: ['DRDO', 'ISRO', 'NASA', 'BARC'], correctAnswer: 1 },
    { id: 'ca2', question: 'What is the currency of India?', options: ['Dollar', 'Euro', 'Rupee', 'Yen'], correctAnswer: 2 },
    { id: 'ca3', question: 'Which city hosted the G20 Summit in India in 2023?', options: ['Mumbai', 'Bengaluru', 'New Delhi', 'Hyderabad'], correctAnswer: 2 },
    { id: 'ca4', question: 'Who is the current Prime Minister of India (as of 2024)?', options: ['Amit Shah', 'Rahul Gandhi', 'Narendra Modi', 'Rajnath Singh'], correctAnswer: 2 },
    { id: 'ca5', question: 'Which lunar mission successfully landed near the Moon\'s south pole in 2023?', options: ['Apollo 11', 'Chandrayaan-2', 'Artemis I', 'Chandrayaan-3'], correctAnswer: 3 },
    { id: 'ca6', question: 'What is the primary focus of the "Make in India" initiative?', options: ['Tourism', 'Manufacturing and Investment', 'Agriculture', 'Education'], correctAnswer: 1 },
    { id: 'ca7', question: 'Which digital payment system is widely used in India?', options: ['Zelle', 'WeChat Pay', 'UPI (Unified Payments Interface)', 'Alipay'], correctAnswer: 2 },
    { id: 'ca8', question: 'In sports, India won the Men\'s Cricket World Cup last in which year?', options: ['2007', '2011', '2015', '2023'], correctAnswer: 1 },
    { id: 'ca9', question: 'Which is the largest public sector bank in India?', options: ['HDFC Bank', 'ICICI Bank', 'State Bank of India (SBI)', 'Punjab National Bank'], correctAnswer: 2 },
    { id: 'ca10', question: 'What is the newly constructed Parliament building in New Delhi called part of?', options: ['Lutyens Zone', 'Central Vista Retreat', 'Central Vista Project', 'Rajpath Project'], correctAnswer: 2 },
  ],
};

// Generates the requested number of questions. If requested > 10, it algorithmically creates more to fill up to 50.
export function generateQuizData(subject: string, count: number): Question[] {
  const base = baseQuestions[subject] || baseQuestions['Maths'];
  const questions: Question[] = [];
  
  // Cap at 50
  const total = Math.min(Math.max(count, 10), 50);

  for (let i = 0; i < total; i++) {
    if (i < base.length) {
      questions.push(base[i]);
    } else {
      // Generate variations if we request more than the hardcoded values (up to 50 max)
      // For simplicity, we create randomized pseudo-questions for indexing past 10
      if (subject === 'Maths') {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 50) + 1;
        questions.push({
          id: `gen-m-${i}`,
          question: `What is ${a} + ${b}?`,
          options: [(a+b).toString(), (a+b+10).toString(), (a+b-5).toString(), (a+b+2).toString()].sort(() => Math.random() - 0.5),
          // We find the correct index after sorting
          correctAnswer: 0 // Will assign properly below
        });
        const correctStr = (a+b).toString();
        questions[i].correctAnswer = questions[i].options.indexOf(correctStr);
      } else {
        // Generic variations for other subjects
        const baseQ = base[i % base.length];
        questions.push({
          id: `gen-${subject}-${i}`,
          question: `${baseQ.question} (Variation ${Math.floor(i / base.length) + 1})`,
          options: [...baseQ.options],
          correctAnswer: baseQ.correctAnswer
        });
      }
    }
  }

  return questions;
}
