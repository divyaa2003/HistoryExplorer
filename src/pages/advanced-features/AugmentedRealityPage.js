import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, Layers, RotateCcw, ZoomIn, ZoomOut, Info, Map, Share } from 'lucide-react';

const AugmentedRealityPage = () => {
  const [arMode, setArMode] = useState('inactive'); // 'inactive', 'scanning', 'active'
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [viewMode, setViewMode] = useState('original'); // 'original', 'restored', '3d'
  const [infoVisible, setInfoVisible] = useState(false);

  // Mock artifact data collection
  const artifactsData = [
    {
      id: 1,
      name: "Vishnu Temple Sculpture",
      period: "12th Century CE",
      location: "Khajuraho, India",
      description: "This sculpture depicts Lord Vishnu in his cosmic form, surrounded by various deities and celestial beings. It showcases the intricate craftsmanship of the medieval Indian artisans and their deep understanding of Puranic mythology.",
      historicalContext: "This sculpture was created during the Chandela dynasty, which was known for building numerous temples dedicated to Hindu deities. The Khajuraho temples are famous for their nagara-style architectural symbolism and erotic sculptures.",
      puranaReference: "The depiction of Vishnu in this sculpture aligns with descriptions found in the Vishnu Purana, particularly in the sections describing Vishnu's cosmic form (Vishvarupa).",
      originalImageUrl: "https://via.placeholder.com/800x600?text=Original+Vishnu+Sculpture",
      restoredImageUrl: "https://via.placeholder.com/800x600?text=Restored+Vishnu+Sculpture",
      model3dUrl: "#"
    },
    {
      id: 2,
      name: "Nataraja Bronze Statue",
      period: "10th Century CE",
      location: "Chidambaram, Tamil Nadu",
      description: "This bronze statue depicts Lord Shiva as Nataraja, the cosmic dancer. The dance represents the cosmic cycles of creation and destruction, as well as the daily rhythm of birth and death.",
      historicalContext: "The Nataraja bronzes were created during the Chola dynasty, which was known for its exceptional bronze casting. The Chola artists developed a unique lost-wax casting technique that allowed for intricate detailing.",
      puranaReference: "The form of Nataraja is described in the Shiva Purana and represents Shiva's Tandava dance, which he performs at the end of each cosmic age to destroy the universe for its subsequent renewal.",
      originalImageUrl: "https://via.placeholder.com/800x600?text=Original+Nataraja+Statue",
      restoredImageUrl: "https://via.placeholder.com/800x600?text=Restored+Nataraja+Statue",
      model3dUrl: "#"
    },
    {
      id: 3,
      name: "Hanuman Temple Relief",
      period: "15th Century CE",
      location: "Hampi, Karnataka",
      description: "This relief carving shows Hanuman carrying the Sanjeevani mountain to save Lakshmana's life during the battle with Ravana, as described in the Ramayana.",
      historicalContext: "This relief was created during the Vijayanagara Empire, which was known for its patronage of art and architecture. Hampi was the capital of the empire and contains numerous temples and monuments.",
      puranaReference: "While the Ramayana is technically not a Purana, it shares many characteristics with Puranic literature and is often studied alongside the Puranas. This scene is from the Yuddha Kanda of the Ramayana.",
      originalImageUrl: "https://via.placeholder.com/800x600?text=Original+Hanuman+Relief",
      restoredImageUrl: "https://via.placeholder.com/800x600?text=Restored+Hanuman+Relief",
      model3dUrl: "#"
    }
  ];

  const handleStartAR = () => {
    setArMode('scanning');
    
    // Simulate scanning and detection
    setTimeout(() => {
      setArMode('active');
      // Randomly select one of the artifacts for demonstration
      const randomArtifact = artifactsData[Math.floor(Math.random() * artifactsData.length)];
      setSelectedArtifact(randomArtifact);
    }, 3000);
  };

  const handleReset = () => {
    setArMode('inactive');
    setSelectedArtifact(null);
    setViewMode('original');
    setInfoVisible(false);
  };

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };
  
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  const handleZoomIn = () => {
    // In a real implementation, this would zoom in on the AR view
    alert("Zooming in on the artifact");
  };
  
  const handleZoomOut = () => {
    // In a real implementation, this would zoom out on the AR view
    alert("Zooming out to see more context");
  };
  
  const handleShare = () => {
    if (!selectedArtifact) return;
    
    // Simulate sharing functionality
    const shareText = `Check out this ${selectedArtifact.name} from ${selectedArtifact.period} that I discovered using Pixel Puranas AR Experience!`;
    alert(`Sharing: ${shareText}\n\nIn a real implementation, this would open sharing options for social media or messaging apps.`);
  };
  
  const handleViewOnMap = () => {
    if (!selectedArtifact) return;
    
    // Simulate map view
    alert(`Viewing ${selectedArtifact.name} on map at ${selectedArtifact.location}\n\nIn a real implementation, this would show the artifact's location on an interactive map.`);
  };

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
            Augmented Reality Experience
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View historical artifacts and monuments in their original state through augmented reality technology.
          </motion.p>
        </div>
      </section>

      {/* AR Viewer Section */}
      <section className="py-12 bg-pattern-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* AR Viewer */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* AR Display */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-900 relative">
                {arMode === 'inactive' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <Camera size={48} className="text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Start AR Experience</h2>
                    <p className="text-gray-400 mb-6 max-w-md">
                      Point your camera at historical artifacts, monuments, or images from Puranic texts to see them come to life.
                    </p>
                    <button 
                      onClick={handleStartAR}
                      className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
                    >
                      <Camera size={20} />
                      Launch AR Camera
                    </button>
                  </div>
                )}
                
                {arMode === 'scanning' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-64 h-64 border-2 border-white border-opacity-50 rounded-lg relative">
                      <div className="absolute inset-0 border-t-2 border-primary animate-scan"></div>
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                    </div>
                    <p className="mt-6 text-gray-300">Scanning for artifacts...</p>
                  </div>
                )}
                
                {arMode === 'active' && (
                  <div className="absolute inset-0">
                    {arMode === 'active' && selectedArtifact && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Display different views based on viewMode */}
                        {viewMode === 'original' && (
                          <img 
                            src={selectedArtifact.originalImageUrl} 
                            alt={`Original ${selectedArtifact.name}`} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                        
                        {viewMode === 'restored' && (
                          <img 
                            src={selectedArtifact.restoredImageUrl} 
                            alt={`Restored ${selectedArtifact.name}`} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                        
                        {viewMode === '3d' && (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <div className="text-white text-center">
                              <Layers size={48} className="mx-auto mb-4 text-gray-400" />
                              <p className="text-lg font-medium">3D Model View</p>
                              <p className="text-sm text-gray-400">In a real implementation, this would show an interactive 3D model</p>
                            </div>
                          </div>
                        )}
                        
                        {/* AR Controls Overlay */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2">
                          <button 
                            className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={handleZoomIn}
                          >
                            <ZoomIn size={18} />
                          </button>
                          <button 
                            className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={handleZoomOut}
                          >
                            <ZoomOut size={18} />
                          </button>
                        </div>
                        
                        {/* View Mode Controls */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                          <button 
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${viewMode === 'original' ? 'bg-primary text-white' : 'bg-white text-gray-700'} hover:shadow-md transition-all`}
                            onClick={() => handleViewModeChange('original')}
                            title="View Original"
                          >
                            <Eye size={20} />
                          </button>
                          <button 
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${viewMode === 'restored' ? 'bg-primary text-white' : 'bg-white text-gray-700'} hover:shadow-md transition-all`}
                            onClick={() => handleViewModeChange('restored')}
                            title="View Restored"
                          >
                            <RotateCcw size={20} />
                          </button>
                          <button 
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${viewMode === '3d' ? 'bg-primary text-white' : 'bg-white text-gray-700'} hover:shadow-md transition-all`}
                            onClick={() => handleViewModeChange('3d')}
                            title="View 3D Model"
                          >
                            <Layers size={20} />
                          </button>
                          <button 
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${infoVisible ? 'bg-primary text-white' : 'bg-white text-gray-700'} hover:shadow-md transition-all`}
                            onClick={toggleInfo}
                            title="Toggle Information"
                          >
                            <Info size={20} />
                          </button>
                        </div>
                        
                        {/* Additional Controls */}
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                          <button 
                            className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={handleShare}
                            title="Share"
                          >
                            <Share size={18} />
                          </button>
                          <button 
                            className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={handleViewOnMap}
                            title="View on Map"
                          >
                            <Map size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Info Button */}
                    <button 
                      onClick={toggleInfo}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
                    >
                      <Info size={24} className="text-white" />
                    </button>
                    
                    {/* Reset Button */}
                    <button 
                      onClick={handleReset}
                      className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white text-sm flex items-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Reset
                    </button>
                    
                    {/* View Mode Indicator */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black bg-opacity-50 text-white text-sm">
                      {viewMode === 'original' && 'Current View'}
                      {viewMode === 'restored' && 'Restored View (12th Century)'}
                      {viewMode === '3d' && '3D Model View'}
                    </div>
                    
                    {/* Info Panel */}
                    {infoVisible && selectedArtifact && (
                      <div className="absolute inset-y-0 right-0 w-80 bg-black bg-opacity-75 p-6 overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-2">{selectedArtifact.name}</h3>
                        <div className="text-gray-300 text-sm mb-4">
                          <p className="mb-1"><span className="font-medium">Period:</span> {selectedArtifact.period}</p>
                          <p><span className="font-medium">Location:</span> {selectedArtifact.location}</p>
                        </div>
                        <p className="text-gray-200 text-sm mb-4">{selectedArtifact.description}</p>
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2">Historical Context</h4>
                          <p className="text-gray-300 text-sm">{selectedArtifact.historicalContext}</p>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2">Purana Reference</h4>
                          <p className="text-gray-300 text-sm">{selectedArtifact.puranaReference}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                            <Map size={14} />
                            Map
                          </button>
                          <button className="bg-secondary text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                            <Share size={14} />
                            Share
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Instructions */}
              {arMode === 'inactive' && (
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-4">How It Works</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Camera className="text-primary" size={28} />
                      </div>
                      <h4 className="font-bold text-dark mb-2">Scan</h4>
                      <p className="text-gray-600 text-sm">Point your camera at historical artifacts or images from Puranic texts.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="text-primary" size={28} />
                      </div>
                      <h4 className="font-bold text-dark mb-2">View</h4>
                      <p className="text-gray-600 text-sm">See the artifact in its original state through augmented reality.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Info className="text-primary" size={28} />
                      </div>
                      <h4 className="font-bold text-dark mb-2">Learn</h4>
                      <p className="text-gray-600 text-sm">Discover historical context and Puranic references for the artifact.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Supported Artifacts */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-dark mb-4">Supported Artifacts & Monuments</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Khajuraho Temples', 'Vishnu Sculptures', 'Mahabharata Scenes', 'Ancient Coins', 'Palm Leaf Manuscripts', 'Temple Architecture', 'Ritual Objects', 'Mythological Paintings'].map((item, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg text-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <div className="decorative-divider"></div>
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">AR Experience Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <RotateCcw className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Historical Restoration</h3>
              <p className="text-gray-600">
                See artifacts and monuments as they appeared in their original state, with colors and details restored.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Layers className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">3D Modeling</h3>
              <p className="text-gray-600">
                Interact with detailed 3D models of artifacts, allowing you to view them from all angles.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Info className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Contextual Information</h3>
              <p className="text-gray-600">
                Access detailed information about the artifact's history, significance, and references in Puranic texts.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={handleStartAR}
              className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Try AR Experience Now
            </button>
          </div>
        </div>
      </section>

      {/* CSS for Animation */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: calc(100% - 2px); }
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default AugmentedRealityPage;
