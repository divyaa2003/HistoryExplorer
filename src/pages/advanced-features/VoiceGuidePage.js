import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, Pause, Play, List, BookOpen, Map, History, Send } from 'lucide-react';

const VoiceGuidePage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentCommands, setRecentCommands] = useState([
    { command: "Tell me about Krishna in Bhagavata Purana", timestamp: "2 minutes ago" },
    { command: "Show me Vishnu temples in South India", timestamp: "Yesterday" },
    { command: "Explain the significance of Samudra Manthan", timestamp: "3 days ago" }
  ]);

  // Mock responses for demonstration
  const mockResponses = {
    krishna: {
      title: "Krishna in the Bhagavata Purana",
      content: "Krishna is one of the most revered deities in Hindu mythology and a central figure in the Bhagavata Purana. The Bhagavata Purana, especially its 10th canto, elaborately describes Krishna's life from his birth in Mathura to his childhood in Vrindavan, his youth, and his later life. Krishna is portrayed as the eighth avatar of Lord Vishnu, who descended to Earth to rid it of evil forces.",
      relatedTopics: ["Radha-Krishna", "Vrindavan", "Mathura", "Bhagavad Gita"],
      audioUrl: "#",
      imageUrl: "https://example.com/krishna.jpg"
    },
    vishnu: {
      title: "Vishnu Temples in South India",
      content: "South India is home to numerous ancient temples dedicated to Lord Vishnu. The most notable among these are the Ranganathaswamy Temple in Srirangam, the Venkateshwara Temple in Tirupati, and the Padmanabhaswamy Temple in Thiruvananthapuram. These temples are not only religious centers but also architectural marvels showcasing the Dravidian style of temple architecture.",
      relatedTopics: ["Ranganathaswamy Temple", "Tirupati", "Padmanabhaswamy Temple", "Dravidian Architecture"],
      audioUrl: "#",
      imageUrl: "https://example.com/vishnu-temples.jpg"
    },
    samudramanthan: {
      title: "The Significance of Samudra Manthan",
      content: "Samudra Manthan, or the Churning of the Ocean of Milk, is one of the most famous episodes in Hindu mythology, described in the Bhagavata Purana, Vishnu Purana, and the Mahabharata. It represents the cosmic struggle between the forces of good (devas) and evil (asuras). The churning produced various divine objects and beings, including Amrita (the nectar of immortality), Lakshmi (the goddess of wealth), and Dhanvantari (the physician of the gods) who brought forth Ayurveda.",
      relatedTopics: ["Amrita", "Lakshmi", "Dhanvantari", "Ayurveda", "Devas and Asuras"],
      audioUrl: "#",
      imageUrl: "https://example.com/samudra-manthan.jpg"
    }
  };

  const processQuery = (query) => {
    setIsProcessing(true);
    
    // Process the query to determine which response to show
    const lowerQuery = query.toLowerCase();
    let selectedResponse = null;
    
    if (lowerQuery.includes('krishna')) {
      selectedResponse = mockResponses.krishna;
    } else if (lowerQuery.includes('vishnu') && (lowerQuery.includes('temple') || lowerQuery.includes('south india'))) {
      selectedResponse = mockResponses.vishnu;
    } else if (lowerQuery.includes('samudra manthan') || lowerQuery.includes('churning')) {
      selectedResponse = mockResponses.samudramanthan;
    } else {
      // Default response for unrecognized queries
      selectedResponse = {
        title: "I'm not sure about that",
        content: `I don't have specific information about "${query}" yet. Please try asking about Krishna, Vishnu temples in South India, or Samudra Manthan.`,
        relatedTopics: ["Krishna", "Vishnu Temples", "Samudra Manthan"],
        audioUrl: "#",
        imageUrl: "https://example.com/default.jpg"
      };
    }
    
    // Set the response
    setResponse(selectedResponse);
    
    // Add to recent commands
    setRecentCommands(prev => [
      { command: query, timestamp: "Just now" },
      ...prev.slice(0, 2)
    ]);
    
    // Simulate audio playback
    setIsPlaying(true);
    setAudioProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setAudioProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 1;
      });
    }, 100);
    
    setIsProcessing(false);
  };

  const handleVoiceCommand = () => {
    setIsListening(true);
    
    // Clear previous transcript
    setTranscript('');
    
    // Simulate voice recognition - in a real app, this would use the Web Speech API
    setTimeout(() => {
      // Get a random example query for demonstration
      const exampleQueries = [
        "Tell me about Krishna in Bhagavata Purana",
        "Show me Vishnu temples in South India",
        "Explain the significance of Samudra Manthan"
      ];
      const randomQuery = exampleQueries[Math.floor(Math.random() * exampleQueries.length)];
      
      setTranscript(randomQuery);
      
      // Process the query
      setTimeout(() => {
        setIsListening(false);
        processQuery(randomQuery);
      }, 1000);
    }, 1500);
  };
  
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim() === '') return;
    
    setTranscript(textInput);
    processQuery(textInput);
    setTextInput('');
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset audio progress when changing response
  useEffect(() => {
    setAudioProgress(0);
    setIsPlaying(false);
  }, [response]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero text-center py-12 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            style={{color: '#000000', textShadow: '0 0 10px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Voice-Activated History Guide
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore Puranic wisdom through natural language voice commands and get AI-narrated responses about stories, characters, and concepts.
          </motion.p>
        </div>
      </section>

      {/* Voice Command Interface */}
      <section className="py-12 bg-pattern-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Voice Input Area */}
            <div className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Voice-Activated History Guide</h2>
                <button 
                  onClick={handleVoiceCommand}
                  disabled={isProcessing}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white text-primary hover:bg-gray-100'}`}
                >
                  {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium mb-2">Say something like...</p>
                <p className="font-medium">{transcript || 'Tell me about Krishna in Bhagavata Purana'}</p>
              </div>
              
              {/* Text Input Option */}
              <form onSubmit={handleTextSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Or type your question here..."
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-800"
                  disabled={isProcessing || isListening}
                />
                <button
                  type="submit"
                  disabled={isProcessing || isListening || textInput.trim() === ''}
                  className="bg-white text-primary px-4 py-2 rounded-r-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
            
            {/* Response Area */}
            {response && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-dark">{response.title}</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handlePlayPause}
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-opacity-90 transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                  </div>
                </div>
                
                {/* Audio Progress Bar */}
                <div className="mb-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0:00</span>
                    <span>1:30</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {response.content}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-bold text-dark mb-2">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {response.relatedTopics.map((topic, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Recent Commands */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex items-center gap-2 mb-4">
                <History size={18} className="text-gray-500" />
                <h3 className="font-bold text-dark">Recent Commands</h3>
              </div>
              <ul className="space-y-2">
                {recentCommands.map((cmd, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <button 
                      className="text-primary hover:underline text-left"
                      onClick={() => {
                        setTranscript(cmd.command);
                        processQuery(cmd.command);
                      }}
                    >
                      "{cmd.command}"
                    </button>
                    <span className="text-xs text-gray-500">{cmd.timestamp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example Commands Section */}
      <section className="py-12 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <div className="decorative-divider"></div>
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Try These Voice Commands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Command 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Mic className="text-primary" size={20} />
                </div>
                <h3 className="font-bold text-dark">"Tell me about..."</h3>
              </div>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li>"Tell me about Krishna's childhood"</li>
                <li>"Tell me about the creation myth in Puranas"</li>
                <li>"Tell me about the significance of Ganga"</li>
              </ul>
            </motion.div>
            
            {/* Command 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <Map className="text-primary" size={20} />
                </div>
                <h3 className="font-bold text-dark">"Show me..."</h3>
              </div>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li>"Show me Vishnu temples in India"</li>
                <li>"Show me places mentioned in Ramayana"</li>
                <li>"Show me the route of Krishna's journey"</li>
              </ul>
            </motion.div>
            
            {/* Command 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <BookOpen className="text-primary" size={20} />
                </div>
                <h3 className="font-bold text-dark">"Explain..."</h3>
              </div>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li>"Explain the concept of dharma"</li>
                <li>"Explain the significance of Samudra Manthan"</li>
                <li>"Explain the avatars of Vishnu"</li>
              </ul>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our voice recognition system understands natural language queries about Puranic wisdom. 
              Just speak clearly and ask about any story, character, concept, or location.
            </p>
            <button 
              onClick={handleVoiceCommand}
              className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 mx-auto"
            >
              <Mic size={20} />
              Start Voice Command
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VoiceGuidePage;
