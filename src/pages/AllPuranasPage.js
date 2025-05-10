import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Info } from 'lucide-react';
import generatePuranaImage from '../utils/generatePuranaImages';

const AllPuranasPage = () => {
  // Mock data for all 18 Mahapuranas
  const allPuranas = [
    {
      id: 'vishnu',
      name: 'Vishnu Purana',
      category: 'Sattva',
      deity: 'Vishnu',
      description: 'One of the most important Puranas, it primarily centers around Lord Vishnu and his various avatars. It contains a detailed account of the creation of the universe, genealogies of kings, and description of Vishnu\'s incarnations.',
      verses: '23,000'
    },
    {
      id: 'narada',
      name: 'Narada Purana',
      category: 'Sattva',
      deity: 'Vishnu',
      description: 'Named after the divine sage Narada, this Purana deals with cosmology, geography, and pilgrimage centers. It also contains the famous Narada Bhakti Sutras, which explain devotion to God.',
      verses: '25,000'
    },
    {
      id: 'bhagavata',
      name: 'Bhagavata Purana',
      category: 'Sattva',
      deity: 'Vishnu',
      description: 'Also known as Srimad Bhagavatam, it is the most popular and widely read of all the Puranas. It primarily focuses on the life and pastimes of Krishna, the eighth avatar of Vishnu.',
      verses: '18,000'
    },
    {
      id: 'garuda',
      name: 'Garuda Purana',
      category: 'Sattva',
      deity: 'Vishnu',
      description: 'Named after Garuda, the divine eagle-carrier of Vishnu, this Purana deals with astronomy, medicine, grammar, and gemology. It is also known for its detailed descriptions of life after death.',
      verses: '19,000'
    },
    {
      id: 'padma',
      name: 'Padma Purana',
      category: 'Sattva',
      deity: 'Vishnu',
      description: 'Named after the lotus (padma) from which Brahma emerged, this Purana contains five parts dealing with the creation of the universe, geography, genealogy, and the life of Rama.',
      verses: '55,000'
    },
    {
      id: 'varaha',
      name: 'Varaha Purana',
      category: 'Sattva',
      deity: 'Vishnu',
      description: 'Named after Varaha, the boar incarnation of Vishnu, this Purana primarily deals with rituals and worship methods. It also contains the Varaha Kalpa, describing the creation of the universe.',
      verses: '24,000'
    },
    {
      id: 'brahma',
      name: 'Brahma Purana',
      category: 'Raja',
      deity: 'Brahma',
      description: 'One of the oldest Puranas, it contains descriptions of various holy places, especially those in Odisha, and details about the creation of the universe by Brahma.',
      verses: '10,000'
    },
    {
      id: 'brahmanda',
      name: 'Brahmanda Purana',
      category: 'Raja',
      deity: 'Brahma',
      description: 'Named after the cosmic egg (Brahmanda), it deals with the creation of the universe, geography, and the future of the world. It also contains the Lalita Sahasranama, a sacred text to Goddess worship.',
      verses: '12,000'
    },
    {
      id: 'brahma-vaivarta',
      name: 'Brahma Vaivarta Purana',
      category: 'Raja',
      deity: 'Brahma',
      description: 'This Purana focuses on the relationship between Krishna and Radha and contains detailed accounts of their pastimes. It also describes the glory of Goddess Lakshmi.',
      verses: '18,000'
    },
    {
      id: 'markandeya',
      name: 'Markandeya Purana',
      category: 'Raja',
      deity: 'Brahma',
      description: 'One of the oldest Puranas, named after sage Markandeya, it contains the famous Devi Mahatmya, which glorifies the Divine Mother. It also contains discussions on dharma and the nature of time.',
      verses: '9,000'
    },
    {
      id: 'bhavishya',
      name: 'Bhavishya Purana',
      category: 'Raja',
      deity: 'Brahma',
      description: 'As the name suggests (Bhavishya means "future"), this Purana contains prophecies about the future, including political, social, and religious developments.',
      verses: '14,500'
    },
    {
      id: 'vamana',
      name: 'Vamana Purana',
      category: 'Raja',
      deity: 'Vishnu',
      description: 'Named after Vamana, the dwarf incarnation of Vishnu, this Purana primarily deals with the glory of Lord Shiva and contains descriptions of various temples and pilgrimage sites.',
      verses: '10,000'
    },
    {
      id: 'shiva',
      name: 'Shiva Purana',
      category: 'Tamas',
      deity: 'Shiva',
      description: 'Dedicated to Lord Shiva, this Purana describes the various forms of Shiva, his marriage with Parvati, and the birth of Ganesha and Kartikeya. It also contains the famous Shiva Sahasranama.',
      verses: '24,000'
    },
    {
      id: 'linga',
      name: 'Linga Purana',
      category: 'Tamas',
      deity: 'Shiva',
      description: 'Named after the Linga, the symbolic representation of Shiva, this Purana primarily deals with the worship of Shiva and contains descriptions of various Shiva temples.',
      verses: '11,000'
    },
    {
      id: 'skanda',
      name: 'Skanda Purana',
      category: 'Tamas',
      deity: 'Shiva',
      description: 'The largest of all Puranas, named after Skanda (Kartikeya), the son of Shiva, it contains numerous legends and stories related to Shiva and Kartikeya, as well as descriptions of various temples and pilgrimage sites.',
      verses: '81,100'
    },
    {
      id: 'agni',
      name: 'Agni Purana',
      category: 'Tamas',
      deity: 'Shiva',
      description: 'Named after Agni, the fire god, this Purana is encyclopedic in nature and covers various subjects including medicine, grammar, archery, rhetoric, and even statecraft.',
      verses: '15,400'
    },
    {
      id: 'matsya',
      name: 'Matsya Purana',
      category: 'Tamas',
      deity: 'Vishnu',
      description: 'Named after Matsya, the fish incarnation of Vishnu, this Purana contains detailed accounts of the great flood and the creation of the world. It also deals with architecture, sculpture, and iconography.',
      verses: '14,000'
    },
    {
      id: 'kurma',
      name: 'Kurma Purana',
      category: 'Tamas',
      deity: 'Vishnu',
      description: 'Named after Kurma, the tortoise incarnation of Vishnu, this Purana primarily deals with the churning of the ocean of milk (Samudra Manthan) and contains descriptions of various temples and pilgrimage sites.',
      verses: '17,000'
    }
  ];

  // Generate and memoize images for each purana
  const puranaImages = useMemo(() => {
    const images = {};
    
    // Generate an image for each purana
    allPuranas.forEach(purana => {
      images[purana.id] = generatePuranaImage(purana.name, purana.category);
    });
    
    return images;
  }, []);

  // Group Puranas by category
  const groupedPuranas = {
    Sattva: allPuranas.filter(purana => purana.category === 'Sattva'),
    Raja: allPuranas.filter(purana => purana.category === 'Raja'),
    Tamas: allPuranas.filter(purana => purana.category === 'Tamas')
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
            The 18 Mahāpurāṇas
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{color: '#000000', textShadow: '0 0 8px rgba(255,255,255,0.8)'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the ancient wisdom of the eighteen major Puranas, sacred texts that contain the essence of Hindu mythology, philosophy, and culture.
          </motion.p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-pattern-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-dark">Understanding the Puranas</h2>
            <p className="text-gray-700 mb-4">
              The Puranas are ancient Hindu texts that narrate the history of the universe from creation to destruction, the genealogy of kings, heroes, sages, and demigods, and descriptions of Hindu cosmology, philosophy, and geography. There are 18 major Puranas (Mahapuranas) and several minor Puranas (Upapuranas).
            </p>
            <p className="text-gray-700 mb-4">
              The 18 Mahapuranas are traditionally categorized into three groups based on the three gunas or qualities:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">Sattva (Goodness)</h3>
                <p className="text-gray-700 text-sm">
                  Primarily glorify Lord Vishnu. These include Vishnu, Narada, Bhagavata, Garuda, Padma, and Varaha Puranas.
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <h3 className="font-bold text-yellow-800 mb-2">Raja (Passion)</h3>
                <p className="text-gray-700 text-sm">
                  Primarily glorify Lord Brahma. These include Brahma, Brahmanda, Brahma Vaivarta, Markandeya, Bhavishya, and Vamana Puranas.
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Tamas (Ignorance)</h3>
                <p className="text-gray-700 text-sm">
                  Primarily glorify Lord Shiva. These include Shiva, Linga, Skanda, Agni, Matsya, and Kurma Puranas.
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              Each Purana typically contains five characteristic topics: primary creation (sarga), secondary creation (visarga), genealogy (vamsha), cosmic cycles (manvantara), and dynastic histories (vamshanucharita).
            </p>
          </div>
          
          {/* Puranas by Category */}
          {Object.entries(groupedPuranas).map(([category, puranas]) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {category} Puranas
                <div className="w-24 h-1 bg-primary mx-auto mt-2"></div>
              </h2>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {puranas.map((purana) => (
                  <motion.div 
                    key={purana.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    variants={itemVariants}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img 
                        src={puranaImages[purana.id]} 
                        alt={purana.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{purana.name}</h3>
                        <p className="text-white text-sm opacity-90">Dedicated to {purana.deity}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {purana.verses} verses
                        </span>
                        <span className="text-sm text-gray-500">
                          {category} Category
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {purana.description}
                      </p>
                      <div className="flex justify-between">
                        <Link 
                          to={`/purana/${purana.id}`}
                          className="text-primary font-medium hover:underline flex items-center"
                        >
                          <BookOpen size={16} className="mr-1" />
                          Read More
                        </Link>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Info size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllPuranasPage;
