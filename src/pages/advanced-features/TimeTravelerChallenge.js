import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Check, X, ChevronRight, RotateCcw, Share2, Trophy } from 'lucide-react';

const TimeTravelerChallenge = () => {
  // State for the challenge
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameState, setGameState] = useState('settings'); // settings, playing, result
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [badges, setBadges] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [fastAnswers, setFastAnswers] = useState(0);
  const [hintLevel, setHintLevel] = useState(1); // Track which hint to show (1, 2, or 3)
  const [hintsUsed, setHintsUsed] = useState(0); // Track total hints used

  // Mock data for the challenge questions with hints instead of images
  const challengeQuestions = [
    {
      id: 1,
      title: 'Ancient Temple Carving',
      hint1: 'This carving features intricate details of deities and celestial beings.',
      hint2: 'The temple is known for its erotic sculptures and is a UNESCO World Heritage site.',
      hint3: 'Located in Madhya Pradesh, these temples were built by the Chandela dynasty.',
      question: 'From which century does this temple carving originate?',
      options: ['8th Century CE', '10th Century CE', '12th Century CE', '15th Century CE'],
      correctAnswer: '10th Century CE',
      difficulty: 'medium',
      category: 'architecture',
      explanation: 'This carving is from the Khajuraho temples built during the Chandela dynasty in the 10th century CE. The intricate details and specific motifs are characteristic of this period.'
    },
    {
      id: 2,
      title: 'Ancient Manuscript',
      hint1: 'This manuscript contains colorful illustrations of a divine figure playing a flute.',
      hint2: 'It depicts stories of a deity who is the eighth avatar of Vishnu.',
      hint3: 'The manuscript focuses on the childhood and youth of this deity in Vrindavan.',
      question: 'Which Purana is depicted in this ancient manuscript?',
      options: ['Vishnu Purana', 'Shiva Purana', 'Bhagavata Purana', 'Matsya Purana'],
      correctAnswer: 'Bhagavata Purana',
      difficulty: 'hard',
      category: 'literature',
      explanation: 'This manuscript shows scenes from the Bhagavata Purana, specifically depicting Krishna\'s childhood adventures. The distinctive artistic style and subject matter are key identifiers.'
    },
    {
      id: 3,
      title: 'Ancient Coin',
      hint1: 'This gold coin features a king on horseback on one side.',
      hint2: 'The reverse side shows a goddess sitting on a lotus.',
      hint3: 'It was minted during India\'s "Golden Age" of art and science.',
      question: 'During which empire was this coin minted?',
      options: ['Maurya Empire', 'Gupta Empire', 'Chola Dynasty', 'Mughal Empire'],
      correctAnswer: 'Gupta Empire',
      difficulty: 'medium',
      category: 'artifacts',
      explanation: 'This gold coin is from the Gupta Empire (4th to 6th century CE). The distinctive imagery of King Chandragupta II and the weight of the coin are characteristic of Gupta coinage.'
    },
    {
      id: 4,
      title: 'Ancient Deity Statue',
      hint1: 'This deity has four arms holding symbolic items.',
      hint2: 'The items include a conch shell, a discus, a mace, and a lotus.',
      hint3: 'This deity is known as the Preserver in the Hindu trinity.',
      question: 'Which deity is represented in this statue?',
      options: ['Vishnu', 'Shiva', 'Brahma', 'Ganesha'],
      correctAnswer: 'Vishnu',
      difficulty: 'easy',
      category: 'religion',
      explanation: 'This statue depicts Lord Vishnu, identifiable by the four arms holding his symbolic items: the conch (shankha), discus (chakra), mace (gada), and lotus (padma).'
    },
    {
      id: 5,
      title: 'Ancient Painting',
      hint1: 'This painting style uses extremely fine brushwork and vibrant colors.',
      hint2: 'The paintings are typically small in size, often just a few inches across.',
      hint3: 'This style flourished under royal patronage from the 16th to 19th centuries.',
      question: 'Which painting style is exemplified in this artwork?',
      options: ['Madhubani', 'Tanjore', 'Miniature', 'Warli'],
      correctAnswer: 'Miniature',
      difficulty: 'hard',
      category: 'art',
      explanation: 'This is an example of Indian Miniature painting from the Rajput school. The fine brushwork, detailed figures, and vibrant colors are hallmarks of this style that flourished from the 16th to 19th centuries.'
    },
    {
      id: 6,
      title: 'Ancient Pottery',
      hint1: 'This pottery has distinctive black designs on red clay.',
      hint2: 'It features geometric patterns and occasional animal motifs.',
      hint3: 'It comes from one of the world\'s oldest urban civilizations (3300-1300 BCE).',
      question: 'From which civilization does this pottery originate?',
      options: ['Indus Valley', 'Mesopotamian', 'Egyptian', 'Greek'],
      correctAnswer: 'Indus Valley',
      difficulty: 'medium',
      category: 'artifacts',
      explanation: 'This pottery piece is from the Indus Valley Civilization (3300-1300 BCE). The distinctive black designs on red clay and the geometric patterns are characteristic of Harappan pottery.'
    },
    {
      id: 7,
      title: 'Ancient Inscription',
      hint1: 'This script was used for some of the earliest written records in South Asia.',
      hint2: 'Emperor Ashoka used this script for his famous rock and pillar edicts.',
      hint3: 'It was deciphered in 1837 by James Prinsep.',
      question: 'In which script is this ancient inscription written?',
      options: ['Brahmi', 'Devanagari', 'Grantha', 'Kharosthi'],
      correctAnswer: 'Brahmi',
      difficulty: 'hard',
      category: 'language',
      explanation: 'This inscription is in Brahmi script, one of the oldest writing systems in South Asia. It was used during the time of Emperor Ashoka (3rd century BCE) for his famous rock and pillar edicts.'
    },
    {
      id: 8,
      title: 'Ancient Jewelry',
      hint1: 'This jewelry piece features intricate goldwork with embedded gemstones.',
      hint2: 'It was created during a period known as India\'s "Golden Age."',
      hint3: 'The craftsmanship shows advanced techniques in metallurgy from 320-550 CE.',
      question: 'From which period does this jewelry piece date?',
      options: ['Vedic Period', 'Mauryan Period', 'Gupta Period', 'Medieval Period'],
      correctAnswer: 'Gupta Period',
      difficulty: 'medium',
      category: 'artifacts',
      explanation: 'This jewelry piece dates to the Gupta Period (320-550 CE). The intricate goldwork and the specific style of setting gemstones are characteristic of this "Golden Age" of Indian art and culture.'
    },
    {
      id: 9,
      title: 'Ancient Weapon',
      hint1: 'This is a push dagger with a distinctive H-shaped horizontal hand grip.',
      hint2: 'It is designed to be an extension of a clenched fist.',
      hint3: 'It became prominent in the Indian subcontinent during the 16th century.',
      question: 'What is this ancient weapon called?',
      options: ['Katar', 'Talwar', 'Chakram', 'Jamadhar'],
      correctAnswer: 'Katar',
      difficulty: 'medium',
      category: 'warfare',
      explanation: 'This is a Katar, a push dagger unique to the Indian subcontinent. The H-shaped horizontal hand grip makes it distinctive from other daggers. It became prominent during the 16th century.'
    },
    {
      id: 10,
      title: 'Ancient Structure',
      hint1: 'This structure contains large geometric instruments for measuring celestial movements.',
      hint2: 'It was built in the early 18th century by Maharaja Jai Singh II.',
      hint3: 'There are five such structures in different cities in India, with the largest in Jaipur.',
      question: 'What was the primary purpose of this structure?',
      options: ['Water Storage', 'Temple', 'Observatory', 'Palace'],
      correctAnswer: 'Observatory',
      difficulty: 'hard',
      category: 'architecture',
      explanation: 'This is a Jantar Mantar, an astronomical observatory built in the early 18th century. The specific geometric structures were designed to observe and measure the movements of stars and planets with remarkable accuracy.'
    }
  ];

  // Available badges
  const availableBadges = [
    { id: 'speed_demon', name: 'Speed Demon', description: 'Answer 3 questions in under 10 seconds each', icon: <Clock size={24} /> },
    { id: 'perfect_score', name: 'Perfect Scholar', description: 'Score 100% on a full challenge', icon: <Check size={24} /> },
    { id: 'streak_master', name: 'Streak Master', description: 'Answer 5 questions correctly in a row', icon: <Award size={24} /> },
    { id: 'history_buff', name: 'History Buff', description: 'Complete 3 challenges in different categories', icon: <Trophy size={24} /> }
  ];

  // Filter questions based on difficulty and category
  const filteredQuestions = challengeQuestions.filter(q => {
    const difficultyMatch = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const categoryMatch = categoryFilter === 'all' || q.category === categoryFilter;
    return difficultyMatch && categoryMatch;
  });

  // Check if there are no questions matching the filters
  const noQuestionsMatch = filteredQuestions.length === 0;

  // Get current question
  const currentQuestionData = filteredQuestions[currentQuestion] || challengeQuestions[0];

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  // Check for badges
  useEffect(() => {
    const newBadges = [...badges];

    // Speed Demon badge
    if (fastAnswers >= 3 && !badges.includes('speed_demon')) {
      newBadges.push('speed_demon');
    }

    // Perfect Scholar badge
    if (score === filteredQuestions.length && currentQuestion === filteredQuestions.length && !badges.includes('perfect_score')) {
      newBadges.push('perfect_score');
    }

    // Streak Master badge
    if (streakCount >= 5 && !badges.includes('streak_master')) {
      newBadges.push('streak_master');
    }

    if (newBadges.length !== badges.length) {
      setBadges(newBadges);
    }
  }, [score, currentQuestion, streakCount, fastAnswers, badges, filteredQuestions.length]);

  // Start a new game
  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowExplanation(false);
    setIsCorrect(null);
    setStartTime(Date.now());
    setEndTime(null);
    setCorrectAnswers(0);
    setTimeLeft(30);
    setStreakCount(0);
    setFastAnswers(0);
    setHintLevel(1);
    setHintsUsed(0);
  };

  // Handle answer selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    const currentQ = filteredQuestions[currentQuestion];
    const correct = answer === currentQ.correctAnswer;

    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(score + 1);
      setStreakCount(streakCount + 1);
      setCorrectAnswers(correctAnswers + 1);

      // Check if answered quickly (under 10 seconds)
      if (timeLeft > 20) {
        setFastAnswers(fastAnswers + 1);
      }
    } else {
      setStreakCount(0);
    }

    // Move to next question after delay
    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion < filteredQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer('');
        setIsCorrect(null);
      } else {
        setEndTime(Date.now());
        setGameState('result');
      }
    }, 3000);
  };

  // Reset the game
  const resetGame = () => {
    setGameState('settings');
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowExplanation(false);
    setIsCorrect(null);
    setStartTime(null);
    setEndTime(null);
    setCorrectAnswers(0);
    setTimeLeft(30);
    setStreakCount(0);
    setFastAnswers(0);
    setHintLevel(1);
    setHintsUsed(0);
    setBadges([]);
  };

  // Calculate final score and assign badges
  const calculateFinalScore = () => {
    const timeBonus = Math.max(0, 500 - Math.floor((endTime - startTime) / 1000) * 10);
    const accuracyBonus = Math.floor((correctAnswers / filteredQuestions.length) * 500);
    // Deduct points for hints used (50 points per hint)
    const hintPenalty = hintsUsed * 50;
    const finalScore = score + timeBonus + accuracyBonus - hintPenalty;

    // Assign badges
    const newBadges = [];

    // Accuracy badges
    const accuracy = correctAnswers / filteredQuestions.length;
    if (accuracy === 1) {
      newBadges.push({
        name: 'Perfect Score',
        icon: <Award className="w-8 h-8 text-yellow-500" />,
        description: 'You answered all questions correctly!'
      });
    } else if (accuracy >= 0.8) {
      newBadges.push({
        name: 'History Buff',
        icon: <Award className="w-8 h-8 text-blue-500" />,
        description: 'You answered more than 80% of questions correctly!'
      });
    }

    // Speed badges
    const averageTime = (endTime - startTime) / filteredQuestions.length / 1000;
    if (averageTime < 10) {
      newBadges.push({
        name: 'Speed Demon',
        icon: <Clock className="w-8 h-8 text-red-500" />,
        description: 'You answered questions in less than 10 seconds on average!'
      });
    }

    // Fast and accurate answers
    if (fastAnswers >= 3) {
      newBadges.push({
        name: 'Quick Thinker',
        icon: <Trophy className="w-8 h-8 text-purple-500" />,
        description: 'You answered 3 or more questions correctly in under 5 seconds!'
      });
    }

    // Minimal hints badge
    if (hintsUsed <= 3) {
      newBadges.push({
        name: 'Independent Scholar',
        icon: <Award className="w-8 h-8 text-green-500" />,
        description: 'You completed the challenge using minimal hints!'
      });
    }

    setBadges(newBadges);
    return finalScore;
  };

  // Get badge by ID
  const getBadgeInfo = (id) => {
    return availableBadges.find(badge => badge.id === id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Time Traveler Challenge</h1>

      {/* Game States */}
      {gameState === 'settings' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-dark text-white p-6">
            <h2 className="text-2xl font-bold">Challenge Settings</h2>
            <p className="mt-2">Customize your challenge by selecting difficulty and category filters.</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Difficulty Level</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'easy', 'medium', 'hard'].map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setDifficultyFilter(difficulty)}
                    className={`px-4 py-2 rounded-full ${difficultyFilter === difficulty
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Artifact Category</h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'architecture', 'artifacts', 'art', 'literature', 'religion', 'language', 'warfare'].map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full ${categoryFilter === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {noQuestionsMatch ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                <p className="font-semibold">No questions match your selected filters.</p>
                <p>Please try a different combination of difficulty and category.</p>
              </div>
            ) : (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                <p className="font-semibold">{filteredQuestions.length} questions match your criteria.</p>
                <p>Ready to test your knowledge of ancient artifacts?</p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={startGame}
                disabled={noQuestionsMatch}
                className={`px-8 py-3 rounded-lg font-bold ${noQuestionsMatch
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark'}`}
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playing Screen */}
      {gameState === 'playing' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="text-gray-700">
              Question {currentQuestion + 1} of {filteredQuestions.length}
            </div>
            <div className={`flex items-center ${timeLeft < 10 ? 'text-red-500' : 'text-gray-700'}`}>
              <Clock size={18} className="mr-1" />
              {timeLeft} seconds
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 p-6 rounded-lg shadow-lg bg-gradient-to-r from-primary-light to-primary-dark">
              <h3 className="text-xl font-bold mb-4 text-white">{currentQuestionData.title}</h3>

              {/* Hints Section */}
              <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-white">Hints:</h4>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          if (level > hintLevel) {
                            setHintLevel(level);
                            setHintsUsed(hintsUsed + 1);
                          }
                        }}
                        disabled={level <= hintLevel}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${level <= hintLevel
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-300 text-gray-600 hover:bg-yellow-400'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-white">
                  {hintLevel >= 1 && (
                    <p className="mb-2"><span className="font-semibold">Hint 1:</span> {currentQuestionData.hint1}</p>
                  )}
                  {hintLevel >= 2 && (
                    <p className="mb-2"><span className="font-semibold">Hint 2:</span> {currentQuestionData.hint2}</p>
                  )}
                  {hintLevel >= 3 && (
                    <p><span className="font-semibold">Hint 3:</span> {currentQuestionData.hint3}</p>
                  )}
            {/* No Questions Available */}
            {gameState === 'playing' && filteredQuestions.length === 0 && (
              <motion.div 
                className="bg-white rounded-lg shadow-lg p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
                <p className="text-gray-700 mb-6">
                  There are no questions available for the selected difficulty and category. 
                  Please try a different combination.
                </p>
                <button 
                  className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
                  onClick={resetToSettings}
                >
                  Back to Settings
                </button>
              </motion.div>
            )}
            
            {/* Results Screen */}
            {gameState === 'result' && (
              <motion.div 
                className="bg-white rounded-lg shadow-lg p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-2 text-center">Challenge Complete!</h2>
                <p className="text-center text-gray-700 mb-6">
                  You scored {score} out of {filteredQuestions.length}
                </p>
                
                {/* Score visualization */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
                  <div 
                    className="bg-primary h-4 rounded-full"
                    style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
                  ></div>
                </div>
                
                {/* Results Summary */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Your Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">Score</p>
                      <p className="text-3xl font-bold text-primary-dark">{calculateFinalScore()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">Accuracy</p>
                      <p className="text-3xl font-bold text-primary-dark">
                        {Math.round((correctAnswers / filteredQuestions.length) * 100)}%
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">Time</p>
                      <p className="text-3xl font-bold text-primary-dark">
                        {Math.floor((endTime - startTime) / 1000)}s
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-lg font-semibold">Hints Used</p>
                      <p className="text-3xl font-bold text-primary-dark">
                        {hintsUsed}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Earned Badges */}
                {badges.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Badges Earned:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {badges.map(badge => (
                        <div key={badge.name} className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="bg-yellow-100 p-3 rounded-full mr-4 text-yellow-600">
                            {badge.icon}
                          </div>
                          <div>
                            <h4 className="font-bold">{badge.name}</h4>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* All Available Badges */}
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">All Badges:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableBadges.map(badge => (
                      <div 
                        key={badge.id} 
                        className={`flex items-center p-4 rounded-lg ${
                          badges.includes(badge.id) 
                            ? 'bg-yellow-50 border border-yellow-200' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`p-3 rounded-full mr-4 ${
                          badges.includes(badge.id) 
                            ? 'bg-yellow-100 text-yellow-600' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {badge.icon}
                        </div>
                        <div>
                          <h4 className="font-bold">{badge.name}</h4>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center"
                    onClick={startGame}
                  >
                    <RotateCcw size={18} className="mr-2" />
                    Play Again
                  </button>
                  <button 
                    className="bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center"
                    onClick={resetGame}
                  >
                    <ChevronRight size={18} className="mr-2" />
                    Change Settings
                  </button>
                  <button 
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center"
                    onClick={() => alert('Sharing functionality would be implemented here!')}
                  >
                    <Share2 size={18} className="mr-2" />
                    Share Results
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimeTravelerChallenge;
