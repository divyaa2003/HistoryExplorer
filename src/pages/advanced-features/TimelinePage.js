import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Info, Search, Filter } from 'lucide-react';

const TimelinePage = () => {
  const [activeEra, setActiveEra] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('chronological'); // chronological, thematic

  // Sample timeline data
  const timelineEvents = [
    {
      id: 1,
      title: "Creation of the Universe",
      description: "Brahma creates the universe from the cosmic golden egg (Hiranyagarbha).",
      era: "satya-yuga",
      year: "Beginning of Time",
      category: "creation",
      purana: "Brahma Purana",
      image: "https://source.unsplash.com/random/800x600/?universe",
      details: "According to the Brahma Purana, the universe began when Lord Brahma emerged from the cosmic golden egg (Hiranyagarbha) and started the process of creation. This marked the beginning of the first cosmic cycle and the Satya Yuga."
    },
    {
      id: 2,
      title: "Samudra Manthan (Churning of the Ocean)",
      description: "Devas and Asuras churn the cosmic ocean to obtain Amrita, the nectar of immortality.",
      era: "satya-yuga",
      year: "Early Satya Yuga",
      category: "major-event",
      purana: "Vishnu Purana",
      image: "https://source.unsplash.com/random/800x600/?ocean",
      details: "The Samudra Manthan is one of the most famous episodes in Hindu mythology. The devas (gods) and asuras (demons) churned the cosmic ocean using Mount Mandara as the churning rod and Vasuki, the king of serpents, as the rope. Many treasures emerged from this churning, including Lakshmi, Kamadhenu, Parijata, Airavata, Uccaihshravas, and finally Dhanvantari holding the pot of Amrita (nectar of immortality)."
    },
    {
      id: 3,
      title: "Matsya Avatar of Vishnu",
      description: "Vishnu's first avatar as a fish who saved Manu from the great deluge.",
      era: "satya-yuga",
      year: "Late Satya Yuga",
      category: "avatar",
      purana: "Matsya Purana",
      image: "https://source.unsplash.com/random/800x600/?fish",
      details: "Lord Vishnu incarnated as Matsya (fish) to save Manu (the progenitor of mankind) and the Vedas from the great deluge. Manu was instructed to collect all medicinal herbs, all varieties of seeds, and animals in a boat that was tethered to the horn of Matsya. After the deluge, the world was repopulated."
    },
    {
      id: 4,
      title: "Kurma Avatar of Vishnu",
      description: "Vishnu takes the form of a turtle to support Mount Mandara during the churning of the ocean.",
      era: "satya-yuga",
      year: "Late Satya Yuga",
      category: "avatar",
      purana: "Kurma Purana",
      image: "https://source.unsplash.com/random/800x600/?turtle",
      details: "During the Samudra Manthan, when Mount Mandara began to sink into the ocean, Lord Vishnu took the form of a giant turtle (Kurma) and supported the mountain on his back, allowing the churning to continue."
    },
    {
      id: 5,
      title: "Varaha Avatar of Vishnu",
      description: "Vishnu as a boar rescues Earth from the cosmic waters.",
      era: "treta-yuga",
      year: "Early Treta Yuga",
      category: "avatar",
      purana: "Varaha Purana",
      image: "https://source.unsplash.com/random/800x600/?earth",
      details: "When the demon Hiranyaksha dragged the Earth into the cosmic waters, Lord Vishnu incarnated as Varaha (boar) to defeat the demon and lift the Earth back to its position with his tusks."
    },
    {
      id: 6,
      title: "Narasimha Avatar of Vishnu",
      description: "Vishnu appears as half-man, half-lion to defeat the demon king Hiranyakashipu.",
      era: "treta-yuga",
      year: "Mid Treta Yuga",
      category: "avatar",
      purana: "Narasimha Purana",
      image: "https://source.unsplash.com/random/800x600/?lion",
      details: "To protect his devotee Prahlada from his father, the demon king Hiranyakashipu, Lord Vishnu appeared as Narasimha—half-man, half-lion. Hiranyakashipu had received a boon that he could not be killed by man or animal, inside or outside, day or night, on earth or in sky, by any weapon. Narasimha circumvented these conditions by appearing at twilight (neither day nor night), on the threshold (neither inside nor outside), taking Hiranyakashipu on his lap (neither earth nor sky), and using his claws (not a weapon)."
    },
    {
      id: 7,
      title: "Vamana Avatar of Vishnu",
      description: "Vishnu as a dwarf reclaims the three worlds from the demon king Bali.",
      era: "treta-yuga",
      year: "Late Treta Yuga",
      category: "avatar",
      purana: "Vamana Purana",
      image: "https://source.unsplash.com/random/800x600/?dwarf",
      details: "When the demon king Bali gained control over the three worlds, Lord Vishnu incarnated as Vamana, a dwarf Brahmin. He asked Bali for just three steps of land. When granted, Vamana grew to cosmic proportions and with two steps covered heaven and earth. For the third step, Bali offered his head, and Vamana pushed him to the netherworld, but allowed him to rule there."
    },
    {
      id: 8,
      title: "Parashurama Avatar of Vishnu",
      description: "Vishnu as a warrior sage who defeated the Kshatriya warriors twenty-one times.",
      era: "dwapara-yuga",
      year: "Early Dwapara Yuga",
      category: "avatar",
      purana: "Brahmanda Purana",
      image: "https://source.unsplash.com/random/800x600/?warrior",
      details: "Lord Vishnu incarnated as Parashurama, the warrior sage, to rid the earth of corrupt and oppressive Kshatriya rulers. He is said to have cleared the earth of Kshatriyas twenty-one times and gave the land to sages."
    },
    {
      id: 9,
      title: "Rama Avatar of Vishnu",
      description: "Vishnu as the ideal king who defeated the demon king Ravana.",
      era: "dwapara-yuga",
      year: "Mid Dwapara Yuga",
      category: "avatar",
      purana: "Ramayana (Valmiki)",
      image: "https://source.unsplash.com/random/800x600/?bow",
      details: "Lord Rama, the seventh avatar of Vishnu, is the protagonist of the epic Ramayana. Born to King Dasharatha of Ayodhya, Rama is exiled to the forest for fourteen years due to his stepmother's demands. His wife Sita is abducted by the demon king Ravana, which leads to a great war. With the help of Hanuman and the monkey army, Rama defeats Ravana and rescues Sita."
    },
    {
      id: 10,
      title: "Krishna Avatar of Vishnu",
      description: "Vishnu as the divine statesman and philosopher who delivered the Bhagavad Gita.",
      era: "dwapara-yuga",
      year: "Late Dwapara Yuga",
      category: "avatar",
      purana: "Bhagavata Purana",
      image: "https://source.unsplash.com/random/800x600/?flute",
      details: "Lord Krishna, the eighth avatar of Vishnu, is one of the most revered deities in Hinduism. His life story is detailed in the Bhagavata Purana. He played a crucial role in the Mahabharata war as Arjuna's charioteer and delivered the Bhagavad Gita on the battlefield. Krishna is also known for his childhood adventures in Vrindavan, his defeat of various demons, and his role as a divine statesman and philosopher."
    },
    {
      id: 11,
      title: "Buddha Avatar of Vishnu",
      description: "Vishnu incarnates as Buddha to end animal sacrifices and restore compassion.",
      era: "kali-yuga",
      year: "Early Kali Yuga",
      category: "avatar",
      purana: "Agni Purana",
      image: "https://source.unsplash.com/random/800x600/?buddha",
      details: "According to some Hindu traditions, Gautama Buddha is considered the ninth avatar of Vishnu. He appeared to end animal sacrifices and promote non-violence and compassion. This syncretic view helped integrate Buddhism within the broader Hindu tradition."
    },
    {
      id: 12,
      title: "Kalki Avatar of Vishnu (Prophecy)",
      description: "Vishnu will appear as Kalki at the end of Kali Yuga to destroy evil and usher in a new Satya Yuga.",
      era: "kali-yuga",
      year: "End of Kali Yuga (Future)",
      category: "avatar",
      purana: "Kalki Purana",
      image: "https://source.unsplash.com/random/800x600/?horse",
      details: "Kalki, the tenth and final avatar of Vishnu, is prophesied to appear at the end of the Kali Yuga. Riding a white horse and wielding a blazing sword, he will destroy evil, defeat the forces of darkness, and usher in a new Satya Yuga, thus completing the cycle of time."
    }
  ];

  // Eras for filtering
  const eras = [
    { id: 'all', name: 'All Eras' },
    { id: 'satya-yuga', name: 'Satya Yuga' },
    { id: 'treta-yuga', name: 'Treta Yuga' },
    { id: 'dwapara-yuga', name: 'Dwapara Yuga' },
    { id: 'kali-yuga', name: 'Kali Yuga' }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'creation', name: 'Creation Events' },
    { id: 'avatar', name: 'Vishnu Avatars' },
    { id: 'major-event', name: 'Major Events' }
  ];

  // Filter events based on era and search query
  useEffect(() => {
    let filtered = timelineEvents;
    
    // Filter by era
    if (activeEra !== 'all') {
      filtered = filtered.filter(event => event.era === activeEra);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.purana.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [activeEra, searchQuery]);

  // Initialize filtered events on component mount
  useEffect(() => {
    setFilteredEvents(timelineEvents);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="flex items-center mb-8">
        <Calendar size={32} className="text-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">Puranic Timeline</h1>
      </div>

      <p className="text-gray-600 mb-8 max-w-3xl">
        Explore the vast chronology of events from the Puranas, spanning from the creation of the universe through the four yugas (ages): Satya, Treta, Dwapara, and Kali. Discover the interconnected stories, divine incarnations, and pivotal moments that shape Hindu cosmology.
      </p>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events, characters, or Puranas..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={activeEra}
                onChange={(e) => setActiveEra(e.target.value)}
              >
                {eras.map(era => (
                  <option key={era.id} value={era.id}>{era.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded-lg border ${viewMode === 'chronological' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
                onClick={() => setViewMode('chronological')}
              >
                Chronological
              </button>
              <button 
                className={`px-3 py-1 rounded-lg border ${viewMode === 'thematic' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
                onClick={() => setViewMode('thematic')}
              >
                Thematic
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Event Detail */}
      {selectedEvent && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-fadeIn">
          <div className="relative h-64 md:h-96 bg-gray-200">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="bg-primary text-white text-sm px-3 py-1 rounded-full inline-block mb-2">
                {selectedEvent.era.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-sm md:text-base opacity-90">{selectedEvent.year} • {selectedEvent.purana}</p>
            </div>
            <button 
              className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
              onClick={() => setSelectedEvent(null)}
            >
              <X size={20} className="text-gray-800" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4 text-lg">{selectedEvent.description}</p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <Info size={18} className="mr-2 text-primary" />
                Detailed Account
              </h3>
              <p className="text-gray-700">{selectedEvent.details}</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Era indicators */}
        <div className="hidden md:flex justify-between mb-4">
          {eras.filter(era => era.id !== 'all').map((era, index) => (
            <div 
              key={era.id} 
              className={`text-center ${activeEra === 'all' || activeEra === era.id ? 'text-primary font-medium' : 'text-gray-400'}`}
              style={{ width: '25%' }}
            >
              {era.name}
            </div>
          ))}
        </div>
        
        {/* Timeline line */}
        <div className="hidden md:block h-1 bg-gray-200 mb-8 relative">
          {eras.filter(era => era.id !== 'all').map((era, index) => (
            <div 
              key={era.id}
              className={`absolute h-1 ${activeEra === 'all' || activeEra === era.id ? 'bg-primary' : 'bg-gray-300'}`}
              style={{ 
                left: `${index * 25}%`, 
                width: '25%'
              }}
            ></div>
          ))}
        </div>

        {/* Timeline events */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleEventClick(event)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/4 bg-gray-100 p-4 flex flex-col justify-center items-center text-center">
                    <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${
                      event.era === 'satya-yuga' ? 'bg-blue-100 text-blue-600' :
                      event.era === 'treta-yuga' ? 'bg-green-100 text-green-600' :
                      event.era === 'dwapara-yuga' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {event.category === 'avatar' && <User size={24} />}
                      {event.category === 'major-event' && <Zap size={24} />}
                      {event.category === 'creation' && <Star size={24} />}
                    </div>
                    <span className="text-sm font-medium text-gray-500">{event.year}</span>
                    <span className="text-xs text-gray-400 mt-1">
                      {event.era.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                  <div className="p-4 md:w-3/4">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{event.purana}</p>
                    <p className="text-gray-700">{event.description}</p>
                    <div className="mt-3 flex items-center text-primary">
                      <span className="text-sm font-medium">View details</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <SearchX size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Missing icon components
const ChevronDown = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const X = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const User = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Zap = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Star = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const SearchX = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="17" y1="11" x2="7" y2="11"></line>
  </svg>
);

export default TimelinePage;
