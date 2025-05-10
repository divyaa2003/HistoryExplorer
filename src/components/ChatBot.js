import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Volume2, Mic, Paperclip } from 'lucide-react';
import { speakText, findBestVoiceForIndianContent } from '../utils/speechUtils';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm Purana Guide, your AI assistant for exploring ancient Indian wisdom. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [bestVoice, setBestVoice] = useState(null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  // Mock responses based on keywords
  const responses = [
    {
      keywords: ['krishna', 'bhagavad', 'gita', 'arjuna'],
      response: "Krishna is a major deity in Hinduism. His story is prominently featured in the Bhagavata Purana. The Bhagavad Gita, which is part of the Mahabharata, contains Krishna's teachings to Arjuna on the battlefield of Kurukshetra.",
      audioUrl: '/sounds/krishna-response.mp3'
    },
    {
      keywords: ['vishnu', 'dashavatara', 'avatar'],
      response: "Vishnu is one of the principal deities of Hinduism. The Vishnu Purana primarily focuses on Lord Vishnu and his ten avatars (Dashavatara). These include Matsya, Kurma, Varaha, Narasimha, Vamana, Parashurama, Rama, Krishna, Buddha, and Kalki.",
      audioUrl: '/sounds/vishnu-response.mp3'
    },
    {
      keywords: ['shiva', 'rudra', 'nataraja', 'lingam'],
      response: "Shiva is one of the principal deities of Hinduism. The Shiva Purana is dedicated to Lord Shiva and describes his various forms, his marriage with Parvati, and the birth of Ganesha and Kartikeya.",
      audioUrl: '/sounds/shiva-response.mp3'
    },
    {
      keywords: ['creation', 'universe', 'brahma', 'origin'],
      response: "The creation of the universe is described in various Puranas. According to these texts, Brahma emerged from a lotus that grew from Vishnu's navel, and then created the universe. The Brahmanda Purana (meaning 'Cosmic Egg') specifically deals with cosmology and the origin of the universe.",
      audioUrl: '/sounds/creation-response.mp3'
    },
    {
      keywords: ['ramayana', 'rama', 'sita', 'hanuman'],
      response: "The Ramayana is one of the two major Sanskrit epics of ancient India. It tells the story of Rama, who is the seventh avatar of Vishnu, and his wife Sita. Elements of the Ramayana are found in several Puranas, particularly the Padma Purana.",
      audioUrl: '/sounds/ramayana-response.mp3'
    },
    {
      keywords: ['mahabharata', 'pandavas', 'kauravas', 'kurukshetra'],
      response: "The Mahabharata is one of the two major Sanskrit epics of ancient India. It narrates the Kurukshetra War between the Pandavas and the Kauravas. Various Puranas contain references to events and characters from the Mahabharata.",
      audioUrl: '/sounds/mahabharata-response.mp3'
    },
    {
      keywords: ['hello', 'hi', 'greetings', 'namaste'],
      response: "Namaste! I'm Purana Guide, your AI assistant for exploring the ancient wisdom of the Puranas. How can I assist you in your journey through these sacred texts?",
      audioUrl: '/sounds/greeting-response.mp3'
    },
    {
      keywords: ['thank', 'thanks'],
      response: "You're welcome! It's my pleasure to help you explore the rich cultural heritage of the Puranas. Feel free to ask if you have more questions!",
      audioUrl: '/sounds/thanks-response.mp3'
    }
  ];

  // Default response for when no keywords match
  const defaultResponse = {
    response: "I'm sorry, I don't have specific information about that topic yet. The Puranas are extensive texts covering various aspects of Hindu mythology, philosophy, and culture. Would you like to know about Krishna, Vishnu, Shiva, or the creation of the universe instead?",
    audioUrl: '/sounds/default-response.mp3'
  };

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Find the best voice for Indian content on component mount
  useEffect(() => {
    const initVoice = async () => {
      const voice = await findBestVoiceForIndianContent();
      setBestVoice(voice);
    };
    initVoice();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // Play sound when opening chatbot
    if (!isOpen) {
      playSound('/sounds/chat-open.mp3');
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Play sound when user sends message
    playSound('/sounds/message-sent.mp3');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate response after a delay
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Play response sound and speak the text
      playSound(botResponse.audioUrl);
      speakResponse(botResponse.response);
    }, 1500);
  };

  // Generate response based on user input
  const generateResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const item of responses) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item;
      }
    }
    
    // Return default response if no matches
    return defaultResponse;
  };

  // Play sound
  const playSound = (soundUrl) => {
    if (audioRef.current) {
      audioRef.current.src = soundUrl;
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  // Speak text using speech synthesis
  const speakResponse = async (text) => {
    try {
      await speakText(text, {
        voice: bestVoice?.name,
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0
      });
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    setIsListening(true);
    playSound('/sounds/listening-start.mp3');
    
    recognition.start();
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputMessage(speechResult);
      setIsListening(false);
      playSound('/sounds/listening-end.mp3');
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Audio element for sound effects */}
      <audio ref={audioRef} className="hidden" />
      
      {/* Chatbot toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors"
          onClick={toggleChatbot}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
      
      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-3">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Purana Guide</h3>
                  <p className="text-xs opacity-80">AI Assistant</p>
                </div>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-white hover:bg-primary-dark rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-light' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-center">
                <button 
                  className={`p-2 rounded-full mr-2 ${isListening ? 'bg-red-100 text-red-500' : 'text-gray-500 hover:bg-gray-100'}`}
                  onClick={handleVoiceInput}
                >
                  <Mic size={20} />
                </button>
                <button 
                  className="p-2 rounded-full mr-2 text-gray-500 hover:bg-gray-100"
                  onClick={() => {
                    // Get the last bot message
                    const lastBotMessage = [...messages].reverse().find(m => m.sender === 'bot');
                    if (lastBotMessage) {
                      speakResponse(lastBotMessage.text);
                      playSound('/sounds/current-message.mp3');
                    }
                  }}
                >
                  <Volume2 size={20} />
                </button>
                <input
                  type="text"
                  placeholder={isListening ? "Listening..." : "Type your message..."}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isListening}
                />
                <button
                  className="p-2 rounded-full ml-2 bg-primary text-white hover:bg-primary-dark"
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === '' || isListening}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
