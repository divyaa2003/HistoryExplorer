import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Camera, Mic, Smartphone, ChevronRight, Calendar } from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Featured Puranas
  const featuredPuranas = [
    { id: 'vishnu', name: 'Vishnu Purana', description: 'One of the eighteen Mahapuranas, a genre of ancient and medieval texts of Hinduism.' },
    { id: 'bhagavata', name: 'Bhagavata Purana', description: 'Promotes devotion to Krishna and describes his life and childhood.' },
    { id: 'shiva', name: 'Shiva Purana', description: 'Glorifies the god Shiva, and centers around his marriage with Parvati.' },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-hero text-white py-16 md:py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{color: '#000000', textShadow: '0 0 10px rgba(255,255,255,0.7)'}}>
              Explore the Ancient Wisdom of Puranas
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-medium" style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.7)'}}>
              Discover stories, characters, and philosophies from the 18 Mahāpurāṇas through our smart search and visual storytelling platform.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search for stories, characters, or concepts..."
                  className="px-6 py-4 rounded-l-lg w-full focus:outline-none text-dark text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-4 rounded-r-lg hover:bg-opacity-90 transition-colors"
                >
                  <Search size={24} />
                </button>
              </form>
              <div className="mt-4 text-sm text-gray-300">
                Try searching: "Krishna", "Creation Myth", "Samudra Manthan"
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Puranas */}
      <section className="py-16 bg-pattern-light">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Puranas
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredPuranas.map((purana) => (
              <motion.div 
                key={purana.id}
                className="purana-card hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="purana-card-content overflow-hidden">
                <div className="card-image-container">
                  {/* Purana card background with pattern */}
                  <div className={`w-full h-full flex items-center justify-center ${purana.id}-card-bg card-image`}>
                    <div className="card-decorative-element card-decorative-element-1"></div>
                    <div className="card-decorative-element card-decorative-element-2"></div>
                    <span className="text-2xl font-extrabold text-glow" style={{color: '#000000', textShadow: '0 0 10px rgba(255,255,255,0.8)'}}>{purana.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{purana.name}</h3>
                  <p className="text-gray-600 mb-4">{purana.description}</p>
                  <Link 
                    to={`/purana/${purana.id}`}
                    className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Explore
                  </Link>
                </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-8">
            <Link 
              to="/purana/all"
              className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-colors font-medium"
            >
              View All Puranas
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <div className="decorative-divider"></div>
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Discover Ancient Wisdom in a Modern Way
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find stories, characters, and concepts across all 18 Mahāpurāṇas with our intelligent search system.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Visual Storytelling</h3>
              <p className="text-gray-600">
                Experience the Puranas through beautiful visuals and illustrations that bring ancient stories to life.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sources</h3>
              <p className="text-gray-600">
                Access reliable information with verified links to scholarly sources for deeper learning.
              </p>
            </motion.div>
          </motion.div>
          <div className="decorative-divider mt-12"></div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Advanced Features
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our cutting-edge tools that bring ancient wisdom to life through modern technology
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Feature 1: Image Analysis */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Historical Image Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Upload images of artifacts and monuments to receive AI-powered analysis of their historical context and significance.
                </p>
                <Link 
                  to="/features/image-analysis"
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 2: Voice Guide */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Voice-Activated Guide</h3>
                <p className="text-gray-600 mb-4">
                  Ask questions about Puranic stories and characters using your voice and receive narrated responses.
                </p>
                <Link 
                  to="/features/voice-guide"
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 3: AR Experience */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-500 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Augmented Reality</h3>
                <p className="text-gray-600 mb-4">
                  Use your device's camera to view historical artifacts and monuments in their original state with overlaid information.
                </p>
                <Link 
                  to="/features/augmented-reality"
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 4: Puranic Timeline */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar size={96} className="text-white opacity-30" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Puranic Timeline</h3>
                <p className="text-gray-600 mb-4">
                  Explore the vast chronology of events from the Puranas, spanning from the creation of the universe through the four yugas (ages).
                </p>
                <Link 
                  to="/features/timeline"
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Explore Timeline
                  <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 5: Social History Hub */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Social History Hub</h3>
                <p className="text-gray-600 mb-4">
                  Share your historical findings, engage in discussions, and connect with fellow enthusiasts of Puranic wisdom.
                </p>
                <Link 
                  to="/features/social-hub"
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 5: Custom History Paths */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Custom History Paths</h3>
                <p className="text-gray-600 mb-4">
                  Create personalized journeys through interconnected historical sites and explore cultural influences over time.
                </p>
                <Link 
                  to="/features/custom-paths"
                  className="text-primary font-medium hover:underline flex items-center"
                >
                  Try it now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* Feature 6: Interactive Map */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">Interactive Maps</h3>
                <p className="text-gray-600 mb-4">
                  Explore geographical locations associated with Puranic stories and track the historical evolution of cultural sites.
                </p>
                <span className="text-gray-500 text-sm font-medium flex items-center">
                  Coming soon
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-cta text-white text-center relative animated-bg">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-glow" style={{color: '#000000', textShadow: '0 0 10px rgba(255,255,255,0.7)'}}>
              Ready to Explore the Puranas?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto font-medium" style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.7)'}}>
              Start your journey through ancient wisdom and discover the timeless stories and teachings of the Mahāpurāṇas.
            </p>
            <Link 
              to="/search"
              className="inline-block bg-primary text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition-colors text-lg font-medium"
            >
              Begin Exploring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
