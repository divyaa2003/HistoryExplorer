import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Info, Clock, ChevronRight } from 'lucide-react';

const PuranaDetailPage = () => {
  const { id } = useParams();
  const [purana, setPurana] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const puranaData = {
    vishnu: {
      name: 'Vishnu Purana',
      sanskrit: 'विष्णु पुराण',
      description: 'The Vishnu Purana is one of the eighteen Mahapuranas, a genre of ancient and medieval texts of Hinduism. It primarily centers around the Hindu god Vishnu and his incarnations such as Krishna, but it also includes chapters dedicated to Shiva, Shakti, and other deities.',
      importance: 'It is one of the most important Puranas and has been given the name Puranaratna (gem of Puranas). The Vishnu Purana is considered one of the earliest Puranas, dating to the post-Vedic period.',
      stories: [
        {
          id: 'vishnu-story1',
          title: 'Creation of the Universe',
          excerpt: 'The Vishnu Purana begins with an account of creation. It describes how Vishnu, in the form of Narayana, created the universe...'
        },
        {
          id: 'vishnu-story2',
          title: 'Samudra Manthan (Churning of the Ocean)',
          excerpt: 'The devas (gods) and asuras (demons) churned the cosmic ocean to obtain amrita, the nectar of immortality...'
        },
        {
          id: 'vishnu-story3',
          title: 'The Tale of Prahlada',
          excerpt: 'Prahlada was a young prince and devotee of Vishnu, whose father, the demon king Hiranyakashipu, was against his devotion...'
        },
      ],
      characters: [
        { name: 'Vishnu', description: 'The preserver deity of the Hindu trinity' },
        { name: 'Lakshmi', description: 'Goddess of wealth and prosperity, consort of Vishnu' },
        { name: 'Prahlada', description: 'Son of the demon king Hiranyakashipu and a devotee of Vishnu' },
      ],
      concepts: [
        { name: 'Dharma', description: 'Cosmic order and religious duty' },
        { name: 'Bhakti', description: 'Devotional worship' },
        { name: 'Moksha', description: 'Liberation from the cycle of rebirth' },
      ],
      structure: '6 parts (amsas) containing 126 chapters',
      composition: 'Estimated between 400 BCE and 500 CE',
      image: 'vishnu-purana.jpg'
    },
    shiva: {
      name: 'Shiva Purana',
      sanskrit: 'शिव पुराण',
      description: 'The Shiva Purana is one of the eighteen Mahapuranas, a genre of Sanskrit texts in Hinduism. It primarily centers around the Hindu god Shiva and goddess Parvati, but includes chapters dedicated to Vishnu and Brahma.',
      importance: 'The Shiva Purana presents Lord Shiva as the Supreme Being. It contains philosophical and devotional material, such as cosmology, mythology, relationship between gods, ethics, yoga, tirtha (pilgrimage) sites, bhakti, rivers and geography, and other topics.',
      stories: [
        {
          id: 'shiva-story1',
          title: 'Marriage of Shiva and Parvati',
          excerpt: 'After the death of his first wife Sati, Shiva went into deep meditation. Sati was reborn as Parvati and performed intense penance to win Shiva\'s love...'
        },
        {
          id: 'shiva-story2',
          title: 'The Birth of Kartikeya',
          excerpt: 'Kartikeya was born to destroy the demon Tarakasura who could only be killed by Shiva\'s son...'
        },
        {
          id: 'shiva-story3',
          title: 'Shiva Drinking the Poison',
          excerpt: 'During the churning of the ocean, a deadly poison emerged that threatened all creation. Shiva drank the poison to save the universe...'
        },
      ],
      characters: [
        { name: 'Shiva', description: 'The destroyer deity of the Hindu trinity' },
        { name: 'Parvati', description: 'Goddess of fertility, love and devotion, consort of Shiva' },
        { name: 'Ganesha', description: 'The elephant-headed god of beginnings, son of Shiva and Parvati' },
      ],
      concepts: [
        { name: 'Tandava', description: 'Shiva\'s cosmic dance of creation and destruction' },
        { name: 'Lingam', description: 'Abstract representation of Shiva, symbolizing the cosmic pillar' },
        { name: 'Rudra', description: 'The fierce form of Shiva' },
      ],
      structure: '7 sections (samhitas) containing 24,000 verses',
      composition: 'Estimated between 200 CE and 900 CE',
      image: 'shiva-purana.jpg'
    },
    bhagavata: {
      name: 'Bhagavata Purana',
      sanskrit: 'भागवत पुराण',
      description: 'The Bhagavata Purana, also known as Srimad Bhagavatam, is one of the eighteen Mahapuranas. It is especially dedicated to the devotion of Vishnu, particularly in his form as Krishna.',
      importance: 'The Bhagavata Purana is considered the most popular and widely circulated of all the Puranas. It promotes bhakti (devotion) toward Krishna as the path to salvation.',
      stories: [
        {
          id: 'bhagavata-story1',
          title: 'The Life of Krishna',
          excerpt: 'The Bhagavata Purana contains detailed accounts of Krishna\'s childhood, his playful activities in Vrindavan, and his later life...'
        },
        {
          id: 'bhagavata-story2',
          title: 'The Tale of Dhruva',
          excerpt: 'Dhruva was a young prince who performed severe penance to gain Vishnu\'s favor and was rewarded with an eternal place in the sky as the Pole Star...'
        },
        {
          id: 'bhagavata-story3',
          title: 'The Story of Prahlada',
          excerpt: 'Prahlada was a young devotee of Vishnu, whose father, the demon king Hiranyakashipu, tried to kill him for his devotion...'
        },
      ],
      characters: [
        { name: 'Krishna', description: 'The eighth avatar of Vishnu and central figure of the Bhagavata Purana' },
        { name: 'Radha', description: 'Krishna\'s primary consort and the embodiment of devotion' },
        { name: 'Uddhava', description: 'Krishna\'s friend and devotee who received his final teachings' },
      ],
      concepts: [
        { name: 'Bhakti', description: 'Loving devotion to God' },
        { name: 'Lila', description: 'Divine play or pastime of Krishna' },
        { name: 'Rasa', description: 'Spiritual aesthetic experience in devotion' },
      ],
      structure: '12 books (skandhas) containing 18,000 verses',
      composition: 'Estimated between 800 CE and 1000 CE',
      image: 'bhagavata-purana.jpg'
    }
  };

  useEffect(() => {
    // Simulate API call to fetch purana details
    setLoading(true);
    setTimeout(() => {
      setPurana(puranaData[id] || null);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!purana) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Purana Not Found</h1>
        <p className="text-gray-600 mb-8">The purana you're looking for doesn't exist or is not available.</p>
        <Link 
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-lotus py-12 relative">
        <div className="container mx-auto px-4 relative z-10" style={{color: '#000000'}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2" style={{color: '#000000', textShadow: '0 0 10px rgba(255,255,255,0.8)'}}>{purana.name}</h1>
            <p className="text-2xl font-light mb-4" style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}>{purana.sanskrit}</p>
            <p className="max-w-3xl" style={{color: '#000000', textShadow: '0 0 6px rgba(255,255,255,0.8)'}}>{purana.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'stories' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('stories')}
            >
              Stories
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'characters' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('characters')}
            >
              Characters
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'concepts' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('concepts')}
            >
              Concepts
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Importance</h2>
                <p className="text-gray-700">{purana.importance}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Information</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start mb-4">
                    <BookOpen className="text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Structure</h3>
                      <p className="text-gray-700">{purana.structure}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Composition Period</h3>
                      <p className="text-gray-700">{purana.composition}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Featured Stories</h2>
                <div className="space-y-4">
                  {purana.stories.slice(0, 2).map(story => (
                    <div key={story.id} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                      <p className="text-gray-700 mb-4">{story.excerpt}</p>
                      <Link 
                        to={`/story/${story.id}`}
                        className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                      >
                        Read full story <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                <div className="h-64 bg-gray-200">
                  {/* Placeholder for purana image */}
                  <div className="w-full h-full flex items-center justify-center bg-secondary bg-opacity-10">
                    <span className="text-2xl font-bold text-secondary">{purana.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => setActiveTab('stories')}
                        className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                      >
                        View all stories <ChevronRight size={16} className="ml-1" />
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('characters')}
                        className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                      >
                        View all characters <ChevronRight size={16} className="ml-1" />
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('concepts')}
                        className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                      >
                        View all concepts <ChevronRight size={16} className="ml-1" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'stories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Stories from {purana.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purana.stories.map(story => (
                <div key={story.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-700 mb-4">{story.excerpt}</p>
                  <Link 
                    to={`/story/${story.id}`}
                    className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                  >
                    Read full story <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'characters' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Characters in {purana.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {purana.characters.map((character, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                  <p className="text-gray-700">{character.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'concepts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Key Concepts in {purana.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {purana.concepts.map((concept, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-2">{concept.name}</h3>
                  <p className="text-gray-700">{concept.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PuranaDetailPage;
