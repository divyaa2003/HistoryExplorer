import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPuranasOpen, setIsPuranasOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const navigate = useNavigate();
  
  // Refs for dropdown menus
  const puranasRef = useRef(null);
  const featuresRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const togglePuranasDropdown = () => {
    setIsPuranasOpen(!isPuranasOpen);
    if (!isPuranasOpen) {
      setIsFeaturesOpen(false);
    }
  };
  
  const toggleFeaturesDropdown = () => {
    setIsFeaturesOpen(!isFeaturesOpen);
    if (!isFeaturesOpen) {
      setIsPuranasOpen(false);
    }
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (puranasRef.current && !puranasRef.current.contains(event.target)) {
        setIsPuranasOpen(false);
      }
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setIsFeaturesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-secondary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-accent">Pixel</span>
            <span className="text-2xl font-bold">Puranas</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <div className="relative" ref={puranasRef}>
              <button 
                className="hover:text-accent transition-colors flex items-center gap-1"
                onClick={togglePuranasDropdown}
                aria-expanded={isPuranasOpen}
                aria-haspopup="true"
              >
                Puranas
                <ChevronDown size={16} className={`transition-transform ${isPuranasOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPuranasOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/purana/vishnu" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vishnu Purana</Link>
                  <Link to="/purana/shiva" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Shiva Purana</Link>
                  <Link to="/purana/bhagavata" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bhagavata Purana</Link>
                  <Link to="/purana/all" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View All</Link>
                </div>
              )}
            </div>
            <div className="relative" ref={featuresRef}>
              <button 
                className="hover:text-accent transition-colors flex items-center gap-1"
                onClick={toggleFeaturesDropdown}
                aria-expanded={isFeaturesOpen}
                aria-haspopup="true"
              >
                Advanced Features
                <ChevronDown size={16} className={`transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFeaturesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/features/image-analysis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Historical Image Analysis</Link>
                  <Link to="/features/voice-guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Voice-Activated Guide</Link>
                  <Link to="/features/augmented-reality" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Augmented Reality</Link>
                  <Link to="/features/social-hub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Social History Hub</Link>
                  <Link to="/features/custom-paths" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Custom History Paths</Link>
                  <Link to="/features/timeline" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Puranic Timeline</Link>
                </div>
              )}
            </div>
            <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search stories, characters..."
                className="px-4 py-2 rounded-l-md focus:outline-none text-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-r-md hover:bg-opacity-90 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search stories, characters..."
                className="px-4 py-2 rounded-l-md focus:outline-none text-dark flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-r-md hover:bg-opacity-90 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <button 
                  className="font-semibold flex items-center gap-1 w-full text-left"
                  onClick={() => setIsPuranasOpen(!isPuranasOpen)}
                >
                  Puranas
                  <ChevronDown size={16} className={`transition-transform ${isPuranasOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`pl-4 space-y-2 ${isPuranasOpen ? 'block' : 'hidden'}`}>
                  <Link 
                    to="/purana/vishnu" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vishnu Purana
                  </Link>
                  <Link 
                    to="/purana/shiva" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shiva Purana
                  </Link>
                  <Link 
                    to="/purana/bhagavata" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bhagavata Purana
                  </Link>
                  <Link 
                    to="/purana/all" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <button 
                  className="font-semibold flex items-center gap-1 w-full text-left"
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                >
                  Advanced Features
                  <ChevronDown size={16} className={`transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`pl-4 space-y-2 ${isFeaturesOpen ? 'block' : 'hidden'}`}>
                  <Link 
                    to="/features/image-analysis" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Historical Image Analysis
                  </Link>
                  <Link 
                    to="/features/voice-guide" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Voice-Activated Guide
                  </Link>
                  <Link 
                    to="/features/augmented-reality" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Augmented Reality
                  </Link>
                  <Link 
                    to="/features/social-hub" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Social History Hub
                  </Link>
                  <Link 
                    to="/features/custom-paths" 
                    className="block hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Custom History Paths
                  </Link>
                  <Link 
                    to="/features/timeline" 
                    className="block hover:text-accent transition-colors"
                    onClick={toggleMenu}
                  >
                    Puranic Timeline
                  </Link>
                </div>
              </div>
              <Link 
                to="/about" 
                className="hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
