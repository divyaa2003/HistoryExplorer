import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Info, MapPin, Save, Mic, Share, Route } from 'lucide-react';

const ImageAnalysisPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('analysis');

  // Mock analysis results for demonstration
  const mockAnalysisResults = {
    name: "Ancient Vishnu Temple Carving",
    period: "10th century CE",
    location: "Khajuraho, Madhya Pradesh, India",
    significance: "This carving depicts Lord Vishnu in his Varaha (boar) avatar, rescuing the Earth goddess Bhudevi from the cosmic ocean. It's a significant representation from the Vishnu Purana.",
    relatedTexts: [
      { title: "Vishnu Purana", chapter: "Chapter 4: The Varaha Avatar", link: "/purana/vishnu" },
      { title: "Bhagavata Purana", chapter: "Canto 3, Chapter 13", link: "/purana/bhagavata" }
    ],
    artifacts: [
      { name: "Varaha Avatar", confidence: 92 },
      { name: "Bhudevi", confidence: 88 },
      { name: "Cosmic Ocean", confidence: 75 }
    ],
    mapLocation: {
      lat: 24.8318,
      lng: 79.9199,
      historicalName: "Khajuraho Temple Complex",
      modernName: "Khajuraho, Madhya Pradesh"
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, etc.).');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please select a smaller image.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setAnalysisResult(null); // Clear previous results
        analyzeImage(reader.result);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture with a demo image
    setIsAnalyzing(true);
    
    // Use a timeout to simulate camera processing
    setTimeout(() => {
      // For demo purposes, we'll use a placeholder image URL
      const demoImageUrl = 'https://via.placeholder.com/800x600?text=Camera+Capture+Demo';
      setSelectedImage(demoImageUrl);
      analyzeImage(demoImageUrl);
    }, 1500);
  };

  const analyzeImage = (imageData) => {
    setIsAnalyzing(true);
    
    // In a real application, this would make an API call to a computer vision service
    // For demonstration, we'll simulate different results based on a random selection
    
    // Array of possible mock results
    const possibleResults = [
      mockAnalysisResults,
      {
        name: "Ancient Shiva Temple Sculpture",
        period: "8th century CE",
        location: "Ellora Caves, Maharashtra, India",
        significance: "This sculpture depicts Lord Shiva in his Nataraja form, performing the cosmic dance. It represents the cycle of creation and destruction as described in the Shiva Purana.",
        relatedTexts: [
          { title: "Shiva Purana", chapter: "Rudra Samhita: Nataraja", link: "/purana/shiva" },
          { title: "Linga Purana", chapter: "Chapter 24: Forms of Shiva", link: "/purana/linga" }
        ],
        artifacts: [
          { name: "Nataraja", confidence: 94 },
          { name: "Cosmic Dance", confidence: 89 },
          { name: "Damaru Drum", confidence: 82 }
        ],
        mapLocation: {
          lat: 20.0269,
          lng: 75.1790,
          historicalName: "Ellora Cave Temples",
          modernName: "Ellora, Maharashtra"
        }
      },
      {
        name: "Hanuman Relief Carving",
        period: "12th century CE",
        location: "Hampi, Karnataka, India",
        significance: "This relief depicts Hanuman carrying the Sanjeevani mountain to save Lakshmana, as narrated in the Ramayana. It symbolizes devotion, loyalty, and superhuman abilities.",
        relatedTexts: [
          { title: "Ramayana", chapter: "Yuddha Kanda: Hanuman's Journey", link: "/texts/ramayana" },
          { title: "Hanuman Chalisa", chapter: "Verses 9-10", link: "/texts/hanuman-chalisa" }
        ],
        artifacts: [
          { name: "Hanuman", confidence: 96 },
          { name: "Sanjeevani Mountain", confidence: 87 },
          { name: "Flying Pose", confidence: 79 }
        ],
        mapLocation: {
          lat: 15.3350,
          lng: 76.4600,
          historicalName: "Vijayanagara Empire",
          modernName: "Hampi, Karnataka"
        }
      }
    ];
    
    // Simulate processing and randomly select a result
    setTimeout(() => {
      const randomResult = possibleResults[Math.floor(Math.random() * possibleResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleSaveToGallery = () => {
    if (!analysisResult) {
      alert("Please analyze an image first before saving to gallery.");
      return;
    }
    
    // In a real application, this would save to a database
    // For demonstration, we'll show a success message with details
    alert(`Saved to your gallery: ${analysisResult.name} (${analysisResult.period}) from ${analysisResult.location}`);
    
    // Simulate adding to recent activity
    setTimeout(() => {
      alert("You'll receive notifications about similar artifacts and historical sites.");
    }, 1000);
  };

  const handleVoiceCommand = () => {
    if (!analysisResult) {
      alert("Please analyze an image first before using voice commands.");
      return;
    }
    
    // Simulate voice recognition
    alert("Listening for commands about " + analysisResult.name + "...");
    
    // Simulate processing voice command
    setTimeout(() => {
      // Randomly select a response for demonstration
      const responses = [
        `The ${analysisResult.name} dates back to the ${analysisResult.period} and was found in ${analysisResult.location}.`,
        `According to historical records, this artifact has connections to ${analysisResult.relatedTexts[0].title}.`,
        `Would you like me to tell you more about the significance of this artifact in Puranic literature?`
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      alert("Voice Response: " + randomResponse);
    }, 2000);
  };

  const handleShareAnalysis = () => {
    if (!analysisResult) {
      alert("Please analyze an image first before sharing.");
      return;
    }
    
    // Simulate share dialog
    const shareText = `I discovered ${analysisResult.name} from ${analysisResult.period} using Pixel Puranas! It's located in ${analysisResult.location} and has connections to ${analysisResult.relatedTexts.map(text => text.title).join(', ')}.`;
    
    alert("Share this discovery:\n\n" + shareText + "\n\nIn a real application, you would be able to share this to social media platforms or with other users in the Social History Hub.");
  };

  const handleCreateJourney = () => {
    if (!analysisResult) {
      alert("Please analyze an image first before creating a journey.");
      return;
    }
    
    // Simulate journey creation
    alert(`Creating a custom journey based on ${analysisResult.name}...`);
    
    // Simulate processing
    setTimeout(() => {
      // Generate related sites based on the current analysis
      const relatedSites = [
        analysisResult.location,
        "Other temples in the region",
        "Museums with similar artifacts",
        "Historical sites mentioned in " + analysisResult.relatedTexts[0].title
      ];
      
      alert("Journey Created!\n\nYour custom path includes:\n- " + relatedSites.join("\n- ") + "\n\nIn a real application, this would be saved to your Custom History Paths.");
    }, 1500);
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
            Historical Image Analysis
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload or capture images of historical artifacts, monuments, or symbols to discover their significance in Puranic texts.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              onClick={() => fileInputRef.current.click()} 
              className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
            >
              <Upload size={20} />
              Upload Image
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            
            <button 
              onClick={handleCameraCapture} 
              className="bg-secondary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
            >
              <Camera size={20} />
              Capture Image
            </button>
          </motion.div>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="py-12 bg-pattern-light">
        <div className="container mx-auto px-4">
          {selectedImage ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Preview */}
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-dark">Image Preview</h2>
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected historical artifact" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={handleSaveToGallery}
                    className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-opacity-90 transition-colors"
                  >
                    <Save size={16} />
                    Save to Gallery
                  </button>
                  <button 
                    onClick={handleVoiceCommand}
                    className="bg-secondary text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-opacity-90 transition-colors"
                  >
                    <Mic size={16} />
                    Voice Guide
                  </button>
                  <button 
                    onClick={handleShareAnalysis}
                    className="bg-accent text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-opacity-90 transition-colors"
                  >
                    <Share size={16} />
                    Share Analysis
                  </button>
                  <button 
                    onClick={handleCreateJourney}
                    className="bg-dark text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-opacity-90 transition-colors"
                  >
                    <Route size={16} />
                    Create Journey
                  </button>
                </div>
              </motion.div>
              
              {/* Analysis Results */}
              <motion.div 
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {isAnalyzing ? (
                  <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-lg text-gray-600">Analyzing your image...</p>
                  </div>
                ) : analysisResult ? (
                  <div>
                    {/* Tabs */}
                    <div className="flex border-b">
                      <button 
                        onClick={() => setActiveTab('analysis')}
                        className={`px-6 py-3 font-medium ${activeTab === 'analysis' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                      >
                        Analysis
                      </button>
                      <button 
                        onClick={() => setActiveTab('map')}
                        className={`px-6 py-3 font-medium ${activeTab === 'map' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                      >
                        Map
                      </button>
                      <button 
                        onClick={() => setActiveTab('texts')}
                        className={`px-6 py-3 font-medium ${activeTab === 'texts' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                      >
                        Related Texts
                      </button>
                      <button 
                        onClick={() => setActiveTab('ar')}
                        className={`px-6 py-3 font-medium ${activeTab === 'ar' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                      >
                        AR View
                      </button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="p-6">
                      {activeTab === 'analysis' && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4 text-dark">{analysisResult.name}</h2>
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <span className="font-medium">Period:</span> {analysisResult.period}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <span className="font-medium">Location:</span> {analysisResult.location}
                            </div>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2 text-dark">Significance</h3>
                            <p className="text-gray-700">{analysisResult.significance}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-2 text-dark">Identified Elements</h3>
                            <div className="space-y-2">
                              {analysisResult.artifacts.map((artifact, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-md">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">{artifact.name}</span>
                                    <span className="text-sm text-primary">{artifact.confidence}% confidence</span>
                                  </div>
                                  <div className="w-full bg-gray-300 rounded-full h-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full" 
                                      style={{ width: `${artifact.confidence}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'map' && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4 text-dark">Historical Location</h2>
                          <div className="bg-gray-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                            <MapPin className="text-primary" />
                            <div>
                              <div className="font-medium">{analysisResult.mapLocation.historicalName}</div>
                              <div className="text-sm text-gray-600">{analysisResult.mapLocation.modernName}</div>
                            </div>
                          </div>
                          <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg overflow-hidden mb-4">
                            {/* In a real implementation, this would be a map component */}
                            <div className="w-full h-full flex items-center justify-center">
                              <p className="text-gray-600">Interactive map would be displayed here</p>
                            </div>
                          </div>
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Time-lapse Evolution</h3>
                            <p className="text-gray-700 text-sm">Explore how this location has changed over centuries. In a full implementation, this would show a slider to view different time periods.</p>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'texts' && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4 text-dark">Related Puranic Texts</h2>
                          <div className="space-y-4">
                            {analysisResult.relatedTexts.map((text, index) => (
                              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                                <h3 className="font-bold text-lg mb-1">{text.title}</h3>
                                <p className="text-gray-600 mb-3">{text.chapter}</p>
                                <a 
                                  href={text.link}
                                  className="text-primary font-medium flex items-center gap-1 hover:underline"
                                >
                                  <Info size={16} />
                                  View in Purana
                                </a>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Academic References</h3>
                            <p className="text-gray-700 text-sm">In a full implementation, this section would include links to scholarly articles and research papers related to this artifact.</p>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'ar' && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4 text-dark">Augmented Reality View</h2>
                          <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden mb-4">
                            <div className="w-full h-full flex flex-col items-center justify-center p-4">
                              <Camera size={48} className="text-gray-400 mb-3" />
                              <p className="text-center text-gray-600">
                                In a full implementation, this would activate your camera to view the artifact in its original state through AR.
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">AR Features</h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                              <li>View the artifact in its original colors and condition</li>
                              <li>See how it would have appeared in its original setting</li>
                              <li>Interactive 3D model with annotations</li>
                              <li>Listen to narration about the artifact's history</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                    <Info size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Analysis Yet</h3>
                    <p className="text-gray-500 max-w-md">
                      Upload or capture an image to see the analysis results here. Our AI will identify historical elements and provide context.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={36} className="text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-dark">Upload an Image to Begin</h2>
                  <p className="text-gray-600 mb-6">
                    Upload or capture an image of a historical artifact, monument, or symbol to discover its significance in Puranic texts.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => fileInputRef.current.click()} 
                    className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
                  >
                    <Upload size={20} />
                    Upload Image
                  </button>
                  <button 
                    onClick={handleCameraCapture} 
                    className="bg-secondary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
                  >
                    <Camera size={20} />
                    Capture Image
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <div className="decorative-divider"></div>
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Advanced Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Info className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Information Retrieval</h3>
              <p className="text-gray-600">
                Get detailed historical context, significance, and background information about analyzed artifacts.
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
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Interactive Maps</h3>
              <p className="text-gray-600">
                Explore geographical locations and see the historical evolution of areas using time-lapse maps.
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
                <Mic className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Voice Guide</h3>
              <p className="text-gray-600">
                Use voice commands to explore specific eras or artifacts and listen to AI-generated narrations.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Camera className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">AR Experience</h3>
              <p className="text-gray-600">
                View monuments or artifacts in their original state using augmented reality technology.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors">
              Explore All Features
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageAnalysisPage;
