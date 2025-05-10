import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Comprehensive database of search results
  const searchDatabase = [
    // Krishna related entries
    {
      id: 'krishna1',
      title: 'Krishna and Arjuna',
      type: 'story',
      purana: 'Bhagavata Purana',
      puranaId: 'bhagavata',
      excerpt: 'The divine conversation between Krishna and Arjuna on the battlefield of Kurukshetra forms the Bhagavad Gita, a 700-verse Hindu scripture that is part of the epic Mahabharata.',
      keywords: ['krishna', 'arjuna', 'bhagavad gita', 'kurukshetra', 'mahabharata', 'dharma'],
      relevance: 95
    },
    {
      id: 'krishna2',
      title: 'Krishna',
      type: 'character',
      purana: 'Multiple Puranas',
      puranaId: 'multiple',
      excerpt: 'Krishna is a major deity in Hinduism. He is worshipped as the eighth avatar of Vishnu and also as the supreme God in his own right. Krishna is known for his childhood pranks, his role in the Mahabharata, and his teachings in the Bhagavad Gita.',
      keywords: ['krishna', 'vishnu', 'avatar', 'deity', 'bhagavad gita', 'bhagavata'],
      relevance: 90
    },
    {
      id: 'krishna3',
      title: 'Krishna\'s Childhood',
      type: 'story',
      purana: 'Bhagavata Purana',
      puranaId: 'bhagavata',
      excerpt: 'Krishna\'s childhood in Vrindavan is filled with playful and mischievous exploits. He is known for stealing butter (makhan chor), playing his flute to enchant the gopis, and lifting the Govardhan hill to protect villagers from Indra\'s wrath.',
      keywords: ['krishna', 'childhood', 'vrindavan', 'butter thief', 'flute', 'govardhan', 'gopis'],
      relevance: 88
    },
    
    // Vishnu related entries
    {
      id: 'vishnu1',
      title: 'Vishnu',
      type: 'character',
      purana: 'Vishnu Purana',
      puranaId: 'vishnu',
      excerpt: 'Vishnu is one of the principal deities of Hinduism. He is the Supreme Being or Ultimate Reality in Vaishnavism traditions. Vishnu is known as the Preserver in the Hindu trinity (Trimurti) that includes Brahma and Shiva.',
      keywords: ['vishnu', 'preserver', 'trimurti', 'supreme', 'deity', 'vaishnavism'],
      relevance: 92
    },
    {
      id: 'vishnu2',
      title: 'Dashavatara - Ten Avatars of Vishnu',
      type: 'concept',
      purana: 'Multiple Puranas',
      puranaId: 'multiple',
      excerpt: 'The Dashavatara refers to the ten primary incarnations of Vishnu, the Hindu god of preservation. These include Matsya (fish), Kurma (turtle), Varaha (boar), Narasimha (lion-man), Vamana (dwarf), Parashurama, Rama, Krishna, Buddha, and Kalki.',
      keywords: ['vishnu', 'dashavatara', 'avatar', 'incarnation', 'matsya', 'kurma', 'varaha', 'narasimha', 'vamana', 'rama', 'krishna'],
      relevance: 90
    },
    
    // Shiva related entries
    {
      id: 'shiva1',
      title: 'Shiva',
      type: 'character',
      purana: 'Shiva Purana',
      puranaId: 'shiva',
      excerpt: 'Shiva is one of the principal deities of Hinduism. He is known as "The Destroyer" within the Trimurti, the Hindu trinity that includes Brahma and Vishnu. In Shaivism tradition, Shiva is the Supreme being who creates, protects and transforms the universe.',
      keywords: ['shiva', 'destroyer', 'trimurti', 'mahadeva', 'nataraja', 'lingam', 'shaivism'],
      relevance: 92
    },
    {
      id: 'shiva2',
      title: 'Shiva and Parvati',
      type: 'story',
      purana: 'Shiva Purana',
      puranaId: 'shiva',
      excerpt: 'The divine union of Shiva and Parvati represents the perfect balance of masculine and feminine energies. Their marriage is celebrated as an ideal relationship in Hindu mythology, with Parvati softening Shiva\'s ascetic nature.',
      keywords: ['shiva', 'parvati', 'marriage', 'divine couple', 'shakti', 'ardhanarisvara'],
      relevance: 88
    },
    
    // Creation myths
    {
      id: 'creation1',
      title: 'Creation of the Universe',
      type: 'concept',
      purana: 'Brahmanda Purana',
      puranaId: 'brahmanda',
      excerpt: 'According to Hindu cosmology, the universe undergoes an infinite number of cycles of creation and destruction. The Brahmanda Purana ("Cosmic Egg") describes how Brahma emerged from a lotus that grew from Vishnu\'s navel, and then created the universe.',
      keywords: ['creation', 'universe', 'brahma', 'cosmic egg', 'origin', 'cosmology'],
      relevance: 85
    },
    
    // Other important stories
    {
      id: 'samudra1',
      title: 'Samudra Manthan',
      type: 'story',
      purana: 'Vishnu Purana',
      puranaId: 'vishnu',
      excerpt: 'The churning of the cosmic ocean (Samudra Manthan) by the devas and asuras to obtain amrita, the nectar of immortality. This epic event produced various divine treasures and beings, including the goddess Lakshmi, the elephant Airavata, and the physician Dhanvantari.',
      keywords: ['samudra manthan', 'churning', 'ocean', 'amrita', 'nectar', 'devas', 'asuras', 'lakshmi'],
      relevance: 85
    },
    {
      id: 'ramayana1',
      title: 'Ramayana',
      type: 'story',
      purana: 'Padma Purana',
      puranaId: 'padma',
      excerpt: 'The Ramayana narrates the journey of Rama, the prince of Ayodhya, whose wife Sita is abducted by Ravana, the king of Lanka. With the help of Hanuman and the monkey army, Rama rescues Sita and returns to Ayodhya to be crowned king.',
      keywords: ['rama', 'ramayana', 'sita', 'hanuman', 'ravana', 'lanka', 'ayodhya'],
      relevance: 90
    },
    
    // Important characters
    {
      id: 'radha1',
      title: 'Radha',
      type: 'character',
      purana: 'Brahma Vaivarta Purana',
      puranaId: 'brahma-vaivarta',
      excerpt: 'Radha is the most important gopi in Puranic texts that describe Krishna\'s youth. She is Krishna\'s lover and his most devoted worshipper. The divine love between Radha and Krishna is seen as a metaphor for the soul\'s devotion to the divine.',
      keywords: ['radha', 'krishna', 'gopi', 'vrindavan', 'divine love', 'devotion'],
      relevance: 80
    },
    {
      id: 'hanuman1',
      title: 'Hanuman',
      type: 'character',
      purana: 'Multiple Puranas',
      puranaId: 'multiple',
      excerpt: 'Hanuman is a divine vanara (monkey deity) who is an ardent devotee of Rama. Known for his extraordinary strength, unwavering devotion, and selfless service, Hanuman played a crucial role in the Ramayana by helping Rama rescue Sita from Ravana.',
      keywords: ['hanuman', 'rama', 'vanara', 'devotion', 'strength', 'ramayana'],
      relevance: 85
    },
    
    // Important concepts
    {
      id: 'bhakti1',
      title: 'Bhakti Yoga',
      type: 'concept',
      purana: 'Multiple Puranas',
      puranaId: 'multiple',
      excerpt: 'Bhakti yoga is a spiritual path described in Hindu philosophy as focused on loving devotion towards a personal god. It emphasizes devotional worship and developing love for the divine, leading to liberation from the cycle of birth and death.',
      keywords: ['bhakti', 'yoga', 'devotion', 'worship', 'love', 'liberation', 'spiritual path'],
      relevance: 75
    },
    {
      id: 'dharma1',
      title: 'Dharma',
      type: 'concept',
      purana: 'Multiple Puranas',
      puranaId: 'multiple',
      excerpt: 'Dharma is a key concept with multiple meanings in Indian religions. It refers to the cosmic order, ethical duties, moral principles, and righteous conduct that sustains the universe. Following one\'s dharma is considered essential for spiritual progress.',
      keywords: ['dharma', 'duty', 'righteousness', 'ethics', 'moral', 'cosmic order'],
      relevance: 80
    }
  ];
  
  // Function to find relevant results based on query
  const findRelevantResults = (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return [];
    
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/\s+/);
    
    return searchDatabase
      .map(item => {
        // Calculate relevance score based on keyword matches
        let score = 0;
        let matchedKeywords = 0;
        
        // Check title match (highest priority)
        if (item.title.toLowerCase().includes(normalizedQuery)) {
          score += 50;
        }
        
        // Check keyword matches
        queryTerms.forEach(term => {
          if (item.keywords.some(keyword => keyword.includes(term))) {
            matchedKeywords++;
            score += 10;
          }
        });
        
        // Bonus for matching multiple terms
        if (matchedKeywords > 1) {
          score += matchedKeywords * 5;
        }
        
        // Check excerpt match
        if (item.excerpt.toLowerCase().includes(normalizedQuery)) {
          score += 15;
        }
        
        // Add base relevance
        score += item.relevance / 10;
        
        return {
          ...item,
          calculatedRelevance: score
        };
      })
      .filter(item => item.calculatedRelevance > 0)
      .sort((a, b) => b.calculatedRelevance - a.calculatedRelevance)
      .slice(0, 10) // Limit to top 10 results
      .map(item => ({
        ...item,
        relevance: Math.min(Math.round(item.calculatedRelevance), 100) // Cap at 100%
      }));
  };
  
  // Get mock results based on query
  const mockResults = findRelevantResults(query);

  useEffect(() => {
    // Simulate API call to fetch search results
    setLoading(true);
    setTimeout(() => {
      setSearchResults(mockResults);
      setLoading(false);
    }, 1000);
  }, [query]);

  const filteredResults = activeFilter === 'all' 
    ? searchResults 
    : searchResults.filter(result => result.type === activeFilter);

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
          <p className="text-gray-600">Found {filteredResults.length} results</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form className="flex max-w-2xl">
            <input
              type="text"
              defaultValue={query}
              placeholder="Search for stories, characters, or concepts..."
              className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-grow"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${activeFilter === 'story' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveFilter('story')}
          >
            <BookOpen size={16} />
            Stories
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'character' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveFilter('character')}
          >
            Characters
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${activeFilter === 'concept' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveFilter('concept')}
          >
            Concepts
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <motion.div 
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/story/${result.id}`} className="text-xl font-bold text-secondary hover:text-primary transition-colors">
                        {result.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 mb-3">
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {result.type}
                        </span>
                        <span className="text-gray-500 text-sm">
                          From <Link to={`/purana/${result.puranaId}`} className="text-primary hover:underline">
                            {result.purana}
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                      <span className="text-sm font-semibold">{result.relevance}%</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{result.excerpt}</p>
                  <div className="mt-4">
                    <Link 
                      to={`/story/${result.id}`} 
                      className="text-primary hover:text-secondary transition-colors font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
