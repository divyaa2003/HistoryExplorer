import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Pixel Puranas</h3>
            <p className="text-gray-300 mb-4">
              A digital platform bringing the 18 Mahāpurāṇas to life through smart search and visual storytelling.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@pixelpuranas.com" className="text-gray-300 hover:text-accent">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Puranas Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Puranas</h3>
            <ul className="space-y-2">
              <li><Link to="/purana/vishnu" className="text-gray-300 hover:text-accent">Vishnu Purana</Link></li>
              <li><Link to="/purana/shiva" className="text-gray-300 hover:text-accent">Shiva Purana</Link></li>
              <li><Link to="/purana/bhagavata" className="text-gray-300 hover:text-accent">Bhagavata Purana</Link></li>
              <li><Link to="/purana/brahma" className="text-gray-300 hover:text-accent">Brahma Purana</Link></li>
              <li><Link to="/purana/all" className="text-gray-300 hover:text-accent">View All Puranas</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent">About</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-accent">Search</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-accent">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates on new content and features.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md focus:outline-none text-dark flex-grow"
              />
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} Pixel Puranas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
