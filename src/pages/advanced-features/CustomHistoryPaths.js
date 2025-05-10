import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Route, Plus, Trash2, Save, Share, Play, Download, ArrowRight, Info, MapPin } from 'lucide-react';

const CustomHistoryPaths = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedPath, setSelectedPath] = useState(null);
  
  // Mock data for sample paths
  const samplePaths = [
    {
      id: 1,
      title: "Krishna's Journey Through Mathura",
      description: "Follow the path of Lord Krishna from his birth in Mathura to his childhood in Vrindavan and his return to defeat Kamsa.",
      locations: [
        { name: "Mathura - Krishna Janmabhoomi", description: "Birthplace of Lord Krishna" },
        { name: "Vrindavan", description: "Where Krishna spent his childhood" },
        { name: "Govardhan Hill", description: "Where Krishna lifted the mountain" },
        { name: "Mathura Palace", description: "Where Krishna defeated Kamsa" }
      ],
      puranaReference: "Bhagavata Purana, Skanda 10",
      createdBy: "Arjun Sharma",
      saves: 45,
      shares: 12
    },
    {
      id: 2,
      title: "Temples of the Shakti Peethas",
      description: "Explore the sacred sites where parts of Goddess Sati's body fell, creating powerful energy centers across the Indian subcontinent.",
      locations: [
        { name: "Kamakhya Temple, Assam", description: "Where Sati's reproductive organs fell" },
        { name: "Kalighat Temple, Kolkata", description: "Where Sati's right toe fell" },
        { name: "Jwalamukhi Temple, Himachal", description: "Where Sati's tongue fell" },
        { name: "Dakshineswar Temple, West Bengal", description: "Associated with Shakti worship" }
      ],
      puranaReference: "Shiva Purana, Rudra Samhita",
      createdBy: "Priya Patel",
      saves: 38,
      shares: 9
    },
    {
      id: 3,
      title: "The Ramayana Trail",
      description: "Trace the epic journey of Lord Rama from Ayodhya to Lanka and back, visiting key locations mentioned in the Ramayana.",
      locations: [
        { name: "Ayodhya", description: "Birthplace and kingdom of Lord Rama" },
        { name: "Chitrakoot", description: "Where Rama, Sita and Lakshmana spent time during exile" },
        { name: "Panchavati (Nashik)", description: "Where Sita was abducted" },
        { name: "Rameshwaram", description: "Where Rama worshipped Shiva before crossing to Lanka" },
        { name: "Ashok Vatika, Sri Lanka", description: "Where Sita was kept captive" }
      ],
      puranaReference: "Ramayana (Valmiki Ramayana)",
      createdBy: "Vikram Iyer",
      saves: 62,
      shares: 24
    }
  ];
  
  // Mock data for user's saved paths
  const userPaths = [
    {
      id: 101,
      title: "My Vishnu Temple Journey",
      description: "A custom path connecting the major Vishnu temples I plan to visit.",
      locations: [
        { name: "Venkateshwara Temple, Tirupati", description: "One of the richest and most visited temples" },
        { name: "Ranganathaswamy Temple, Srirangam", description: "Largest functioning Hindu temple in the world" },
        { name: "Badrinath Temple, Uttarakhand", description: "One of the Char Dham pilgrimage sites" }
      ],
      puranaReference: "Vishnu Purana",
      createdBy: "You",
      lastEdited: "2 days ago"
    }
  ];

  const handleCreateNewPath = () => {
    alert("In a full implementation, this would open a path creation interface with a map.");
  };

  const handleViewPath = (path) => {
    setSelectedPath(path);
    setActiveTab('view');
  };

  const handleSavePath = (id) => {
    alert(`Path #${id} saved to your collection!`);
  };

  const handleSharePath = (id) => {
    alert(`Sharing path #${id} with others!`);
  };

  const handleDeletePath = (id) => {
    alert(`Deleting path #${id} from your collection!`);
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
            Custom History Paths
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create personalized journeys through interconnected historical sites and explore how different cultures influenced each other over time.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-pattern-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="bg-white rounded-t-lg shadow-lg overflow-hidden">
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab('create')}
                  className={`px-6 py-4 font-medium flex items-center gap-2 ${activeTab === 'create' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                  <Plus size={20} />
                  Create New Path
                </button>
                <button 
                  onClick={() => {setActiveTab('explore'); setSelectedPath(null);}}
                  className={`px-6 py-4 font-medium flex items-center gap-2 ${activeTab === 'explore' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                  <Map size={20} />
                  Explore Paths
                </button>
                <button 
                  onClick={() => {setActiveTab('my-paths'); setSelectedPath(null);}}
                  className={`px-6 py-4 font-medium flex items-center gap-2 ${activeTab === 'my-paths' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                  <Route size={20} />
                  My Paths
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              {activeTab === 'create' && !selectedPath && (
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Route className="text-primary" size={36} />
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-4">Create Your Custom History Path</h2>
                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      Connect historical sites, artifacts, and events to create a personalized journey through Puranic wisdom and ancient history.
                    </p>
                    <button 
                      onClick={handleCreateNewPath}
                      className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:bg-opacity-90 transition-colors"
                    >
                      <Plus size={20} />
                      Start Creating
                    </button>
                  </div>
                  
                  <div className="mt-8 border-t pt-8">
                    <h3 className="text-xl font-bold text-dark mb-4">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-primary font-bold">1</span>
                        </div>
                        <h4 className="font-bold text-dark mb-2">Select Locations</h4>
                        <p className="text-gray-600 text-sm">
                          Choose historical sites, temples, or artifacts from our database or add your own discoveries.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-primary font-bold">2</span>
                        </div>
                        <h4 className="font-bold text-dark mb-2">Connect the Dots</h4>
                        <p className="text-gray-600 text-sm">
                          Create a sequence that tells a story or shows the evolution of cultural influences over time.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-primary font-bold">3</span>
                        </div>
                        <h4 className="font-bold text-dark mb-2">Share Your Journey</h4>
                        <p className="text-gray-600 text-sm">
                          Save your path for personal use or share it with the community for others to explore.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'explore' && !selectedPath && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-dark mb-6">Explore Community Paths</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {samplePaths.map((path) => (
                      <div key={path.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                          {/* This would be a map preview in a real implementation */}
                          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                            <Map className="text-gray-500" size={48} />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h3 className="text-white font-bold text-lg">{path.title}</h3>
                            <p className="text-gray-200 text-sm">Created by {path.createdBy}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-700 text-sm mb-3">{path.description}</p>
                          
                          <div className="mb-3">
                            <h4 className="font-medium text-dark text-sm mb-2">Key Locations:</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              {path.locations.slice(0, 3).map((location, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <MapPin size={14} className="text-primary flex-shrink-0 mt-1" />
                                  <span>{location.name}</span>
                                </li>
                              ))}
                              {path.locations.length > 3 && (
                                <li className="text-primary text-sm font-medium">
                                  +{path.locations.length - 3} more locations
                                </li>
                              )}
                            </ul>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-4">
                            <span className="font-medium">Purana Reference:</span> {path.puranaReference}
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t">
                            <div className="flex gap-3 text-sm text-gray-600">
                              <span>{path.saves} saves</span>
                              <span>{path.shares} shares</span>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleViewPath(path)}
                                className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors"
                              >
                                View Path
                              </button>
                              <button 
                                onClick={() => handleSavePath(path.id)}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                              >
                                <Save size={14} />
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'my-paths' && !selectedPath && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-dark mb-6">My Saved Paths</h2>
                  
                  {userPaths.length > 0 ? (
                    <div className="space-y-4">
                      {userPaths.map((path) => (
                        <div key={path.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 bg-gray-200 md:h-auto h-32 relative">
                              {/* This would be a map preview in a real implementation */}
                              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                <Map className="text-gray-500" size={36} />
                              </div>
                            </div>
                            <div className="p-4 md:w-2/3">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-dark">{path.title}</h3>
                                <span className="text-xs text-gray-500">Last edited: {path.lastEdited}</span>
                              </div>
                              <p className="text-gray-700 text-sm mb-3">{path.description}</p>
                              
                              <div className="mb-3">
                                <h4 className="font-medium text-dark text-sm mb-1">Locations:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {path.locations.map((location, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                                      {location.name}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                                <button 
                                  onClick={() => handleViewPath(path)}
                                  className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors"
                                >
                                  View
                                </button>
                                <button 
                                  onClick={() => handleSharePath(path.id)}
                                  className="bg-secondary text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors flex items-center gap-1"
                                >
                                  <Share size={14} />
                                  Share
                                </button>
                                <button 
                                  onClick={() => handleDeletePath(path.id)}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <Route size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-dark mb-2">No Saved Paths Yet</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't created or saved any history paths yet.
                      </p>
                      <button 
                        onClick={() => setActiveTab('create')}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        Create Your First Path
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {selectedPath && activeTab === 'view' && (
                <div>
                  {/* Path Header */}
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-dark mb-1">{selectedPath.title}</h2>
                        <p className="text-gray-600 mb-2">Created by {selectedPath.createdBy}</p>
                        <p className="text-gray-700">{selectedPath.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedPath(null)}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          onClick={() => handleSavePath(selectedPath.id)}
                          className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors flex items-center gap-1"
                        >
                          <Save size={14} />
                          Save
                        </button>
                        <button 
                          onClick={() => handleSharePath(selectedPath.id)}
                          className="bg-secondary text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors flex items-center gap-1"
                        >
                          <Share size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Path Map */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                    {/* This would be an interactive map in a real implementation */}
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Map className="text-gray-500 mx-auto mb-2" size={64} />
                        <p className="text-gray-600">Interactive map would be displayed here</p>
                      </div>
                    </div>
                    
                    {/* Map Controls */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md">
                      <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                        <Play size={20} className="text-primary" />
                      </button>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                        <Download size={20} className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Path Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark mb-4">Journey Details</h3>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-dark mb-3">Purana Reference</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">{selectedPath.puranaReference}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-dark mb-3">Locations</h4>
                      <div className="space-y-4">
                        {selectedPath.locations.map((location, index) => (
                          <div key={index} className="relative pl-8 pb-8">
                            {/* Connector Line */}
                            {index < selectedPath.locations.length - 1 && (
                              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                            )}
                            
                            {/* Location Marker */}
                            <div className="absolute left-0 top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            
                            {/* Location Details */}
                            <div className="bg-white border rounded-lg p-4 ml-4">
                              <h5 className="font-bold text-dark mb-1">{location.name}</h5>
                              <p className="text-gray-700 text-sm">{location.description}</p>
                              
                              <div className="flex justify-end mt-3">
                                <button className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
                                  <Info size={14} />
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <div className="decorative-divider"></div>
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Path Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Route className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Custom Journeys</h3>
              <p className="text-gray-600">
                Create personalized paths connecting historical sites, artifacts, and events based on your interests.
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
                <ArrowRight className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Cultural Evolution</h3>
              <p className="text-gray-600">
                Visualize how different cultures influenced each other over time through interconnected historical sites.
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
                <Share className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Community Sharing</h3>
              <p className="text-gray-600">
                Share your custom paths with the community and explore paths created by other history enthusiasts.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => setActiveTab('create')}
              className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Create Your Path
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomHistoryPaths;
