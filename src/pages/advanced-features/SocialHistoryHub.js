import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Share, ThumbsUp, Bookmark, Send, Image, Search, Filter, User } from 'lucide-react';

const SocialHistoryHub = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [commentText, setCommentText] = useState('');

  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: "The Symbolism of Samudra Manthan in Modern Context",
      author: "Arjun Sharma",
      avatar: "https://via.placeholder.com/40",
      date: "2 days ago",
      content: "I've been studying the Samudra Manthan episode from the Puranas and thinking about how its symbolism applies to modern life. The churning of the ocean represents the struggle between good and evil forces, but I think it also symbolizes how both cooperation and competition are necessary for progress. What do you all think?",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["Samudra Manthan", "Symbolism", "Philosophy"]
    },
    {
      id: 2,
      title: "Geographical Evidence for Krishna's Dwarka",
      author: "Priya Patel",
      avatar: "https://via.placeholder.com/40",
      date: "5 days ago",
      content: "Recent archaeological findings near the coast of Gujarat provide interesting evidence that might correlate with descriptions of Krishna's Dwarka in the Puranas. The underwater structures date back to approximately 1500 BCE, which aligns with some historical estimates. Has anyone studied these findings in detail?",
      likes: 42,
      comments: 15,
      shares: 12,
      tags: ["Dwarka", "Krishna", "Archaeology", "Bhagavata Purana"]
    },
    {
      id: 3,
      title: "Interpreting the Avatars of Vishnu as Evolutionary Stages",
      author: "Rahul Desai",
      avatar: "https://via.placeholder.com/40",
      date: "1 week ago",
      content: "I've been fascinated by how the ten avatars (Dashavatara) of Vishnu seem to parallel evolutionary theory - from fish (Matsya) to tortoise (Kurma) to boar (Varaha) to half-man/half-lion (Narasimha) to dwarf-human (Vamana) and so on. Is this just coincidence or could there be ancient wisdom embedded in these stories?",
      likes: 56,
      comments: 23,
      shares: 17,
      tags: ["Dashavatara", "Vishnu", "Evolution", "Ancient Wisdom"]
    }
  ];

  // Mock data for shared findings
  const sharedFindings = [
    {
      id: 1,
      title: "Ancient Vishnu Temple Carving",
      author: "Maya Reddy",
      avatar: "https://via.placeholder.com/40",
      date: "Yesterday",
      image: "https://via.placeholder.com/600x400?text=Vishnu+Temple+Carving",
      description: "Found this incredible carving at the Khajuraho temples. The AI analysis identified it as a 10th century depiction of Vishnu's Varaha avatar rescuing the Earth goddess.",
      likes: 38,
      comments: 12,
      shares: 5,
      analysis: {
        period: "10th century CE",
        significance: "Depicts Varaha avatar of Vishnu",
        puranaReference: "Vishnu Purana, Chapter 4"
      }
    },
    {
      id: 2,
      title: "Palm Leaf Manuscript with Rare Purana Text",
      author: "Vikram Iyer",
      avatar: "https://via.placeholder.com/40",
      date: "3 days ago",
      image: "https://via.placeholder.com/600x400?text=Palm+Leaf+Manuscript",
      description: "Visited the National Museum and found this palm leaf manuscript containing a rare version of the Skanda Purana. The AI analysis helped translate some obscure passages.",
      likes: 45,
      comments: 18,
      shares: 9,
      analysis: {
        period: "15th century CE",
        significance: "Contains rare regional variations of Skanda Purana",
        puranaReference: "Skanda Purana, Prabhasa Khanda"
      }
    }
  ];

  const handlePostComment = () => {
    if (commentText.trim()) {
      alert(`Comment posted: ${commentText}`);
      setCommentText('');
    }
  };

  const handleShare = (id) => {
    alert(`Sharing item #${id}`);
  };

  const handleLike = (id) => {
    alert(`Liked item #${id}`);
  };

  const handleSave = (id) => {
    alert(`Saved item #${id}`);
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
            Social History Hub
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Share your historical findings, engage in discussions, and connect with fellow enthusiasts of Puranic wisdom.
          </motion.p>
        </div>
      </section>

      {/* Social Hub Section */}
      <section className="py-12 bg-pattern-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="bg-white rounded-t-lg shadow-lg overflow-hidden">
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab('discussions')}
                  className={`px-6 py-4 font-medium flex items-center gap-2 ${activeTab === 'discussions' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                  <MessageSquare size={20} />
                  Discussions
                </button>
                <button 
                  onClick={() => setActiveTab('findings')}
                  className={`px-6 py-4 font-medium flex items-center gap-2 ${activeTab === 'findings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                  <Image size={20} />
                  Shared Findings
                </button>
                <button 
                  onClick={() => setActiveTab('community')}
                  className={`px-6 py-4 font-medium flex items-center gap-2 ${activeTab === 'community' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                  <Users size={20} />
                  Community
                </button>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="bg-white p-4 border-b shadow-lg">
              <div className="flex flex-wrap gap-4">
                <div className="flex-grow relative">
                  <input 
                    type="text" 
                    placeholder="Search discussions and findings..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <button className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
              {activeTab === 'discussions' && (
                <div className="p-6">
                  {/* Create Post */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="text-gray-500" size={20} />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Start a new discussion about Puranic wisdom..." 
                        className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors text-gray-700">
                          <Image size={16} />
                          <span className="text-sm">Image</span>
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors text-gray-700">
                          <MessageSquare size={16} />
                          <span className="text-sm">Poll</span>
                        </button>
                      </div>
                      <button className="bg-primary text-white px-4 py-1 rounded-md hover:bg-opacity-90 transition-colors">
                        Post
                      </button>
                    </div>
                  </div>
                  
                  {/* Discussions List */}
                  <div className="space-y-6">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                              <img src={discussion.avatar} alt={discussion.author} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-bold text-dark">{discussion.author}</h3>
                              <p className="text-sm text-gray-500">{discussion.date}</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-3 text-dark">{discussion.title}</h2>
                        <p className="text-gray-700 mb-4">{discussion.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="flex gap-4">
                            <button 
                              onClick={() => handleLike(discussion.id)}
                              className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                            >
                              <ThumbsUp size={18} />
                              <span>{discussion.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors">
                              <MessageSquare size={18} />
                              <span>{discussion.comments}</span>
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleShare(discussion.id)}
                              className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                            >
                              <Share size={18} />
                              <span className="text-sm">Share</span>
                            </button>
                            <button 
                              onClick={() => handleSave(discussion.id)}
                              className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                            >
                              <Bookmark size={18} />
                              <span className="text-sm">Save</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Comment Section */}
                        <div className="mt-6 pt-4 border-t">
                          <h4 className="font-medium text-dark mb-3">Comments</h4>
                          <div className="flex gap-3 mb-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="text-gray-500" size={16} />
                            </div>
                            <div className="flex-grow relative">
                              <input 
                                type="text" 
                                placeholder="Add a comment..." 
                                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
                              />
                              <button 
                                onClick={handlePostComment}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                              >
                                <Send size={18} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <button className="text-primary font-medium hover:underline">
                              View all {discussion.comments} comments
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'findings' && (
                <div className="p-6">
                  {/* Upload Finding Button */}
                  <div className="mb-8 text-center">
                    <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto hover:bg-opacity-90 transition-colors">
                      <Image size={20} />
                      Upload New Finding
                    </button>
                  </div>
                  
                  {/* Findings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sharedFindings.map((finding) => (
                      <div key={finding.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                          <img src={finding.image} alt={finding.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                                <img src={finding.avatar} alt={finding.author} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h3 className="font-medium text-dark text-sm">{finding.author}</h3>
                                <p className="text-xs text-gray-500">{finding.date}</p>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </div>
                          
                          <h2 className="text-lg font-bold mb-2 text-dark">{finding.title}</h2>
                          <p className="text-gray-700 text-sm mb-3">{finding.description}</p>
                          
                          {/* Analysis Details */}
                          <div className="bg-gray-50 p-3 rounded-md mb-4">
                            <h4 className="font-medium text-dark text-sm mb-2">AI Analysis</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Period:</span> {finding.analysis.period}</p>
                              <p><span className="font-medium">Significance:</span> {finding.analysis.significance}</p>
                              <p><span className="font-medium">Purana Reference:</span> {finding.analysis.puranaReference}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 border-t">
                            <div className="flex gap-3">
                              <button 
                                onClick={() => handleLike(finding.id)}
                                className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                              >
                                <ThumbsUp size={16} />
                                <span className="text-sm">{finding.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors">
                                <MessageSquare size={16} />
                                <span className="text-sm">{finding.comments}</span>
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleShare(finding.id)}
                                className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                              >
                                <Share size={16} />
                                <span className="text-sm">Share</span>
                              </button>
                              <button 
                                onClick={() => handleSave(finding.id)}
                                className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                              >
                                <Bookmark size={16} />
                                <span className="text-sm">Save</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'community' && (
                <div className="p-6">
                  <div className="text-center py-12">
                    <Users size={64} className="text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-dark mb-2">Community Features Coming Soon</h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                      We're building a vibrant community of Puranic wisdom enthusiasts. Soon you'll be able to follow experts, join groups, and participate in events.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="py-12 bg-features bg-animated-pattern">
        <div className="container mx-auto px-4">
          <div className="decorative-divider"></div>
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Community Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Engage in Discussions</h3>
              <p className="text-gray-600">
                Share your interpretations of Puranic texts and engage in meaningful discussions with scholars and enthusiasts.
              </p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Image className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Share Discoveries</h3>
              <p className="text-gray-600">
                Upload images of artifacts and monuments you discover, and share the AI analysis with the community.
              </p>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">Connect with Experts</h3>
              <p className="text-gray-600">
                Follow historians, archaeologists, and scholars who specialize in Puranic studies and ancient Indian wisdom.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialHistoryHub;
