import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Image, ExternalLink, Code, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Pixel Puranas</h1>
            <p className="text-xl max-w-3xl mx-auto">
              A digital platform that brings the 18 Mahāpurāṇas to life through smart search and visual storytelling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                Pixel Puranas aims to make ancient wisdom easily accessible in the digital age. We believe that the timeless stories and teachings of the Mahāpurāṇas should be available to everyone, regardless of their background or prior knowledge.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our platform uses modern web technologies and AI to create a searchable, visual, and immersive experience that helps users explore the rich tapestry of Hindu mythology and philosophy.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're a scholar, a spiritual seeker, or simply curious about these ancient texts, Pixel Puranas provides a gateway to discover the stories, characters, and concepts that have shaped Indian culture for millennia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Key Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Our intelligent search system allows you to find stories, characters, and concepts across all 18 Mahāpurāṇas with ease. Simply enter any keyword to explore relevant content.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Image className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Visual Storytelling</h3>
              <p className="text-gray-600">
                Experience the Puranas through beautiful visuals and illustrations that bring ancient stories to life, making complex narratives more accessible and engaging.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <ExternalLink className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sources</h3>
              <p className="text-gray-600">
                Access reliable information with verified links to scholarly sources for deeper learning, ensuring academic integrity and authenticity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 18 Puranas Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">The 18 Mahāpurāṇas</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Our platform covers all 18 major Puranas, which are divided into three categories according to the three deities: Brahma, Vishnu, and Shiva.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Brahma Puranas</h3>
                <ul className="space-y-2">
                  <li className="p-2 bg-gray-100 rounded">Brahma Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Brahmanda Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Brahma Vaivarta Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Markandeya Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Bhavishya Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Vamana Purana</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Vishnu Puranas</h3>
                <ul className="space-y-2">
                  <li className="p-2 bg-gray-100 rounded">Vishnu Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Bhagavata Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Naradiya Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Garuda Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Padma Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Varaha Purana</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Shiva Puranas</h3>
                <ul className="space-y-2">
                  <li className="p-2 bg-gray-100 rounded">Shiva Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Linga Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Skanda Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Agni Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Kurma Purana</li>
                  <li className="p-2 bg-gray-100 rounded">Matsya Purana</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Technology
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start mb-6">
                <Code className="text-primary mr-4 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Modern Web Stack</h3>
                  <p className="text-gray-600">
                    Pixel Puranas is built using modern web technologies including React, Tailwind CSS, and Framer Motion to create a responsive, accessible, and visually appealing user experience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Search className="text-primary mr-4 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered Search</h3>
                  <p className="text-gray-600">
                    Our platform uses advanced natural language processing and machine learning algorithms to understand the context of your searches and provide the most relevant results from across the Puranas.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
              Pixel Puranas is created by a passionate team of scholars, developers, and designers dedicated to making ancient wisdom accessible in the digital age.
            </p>
            
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-md p-8 inline-flex items-center">
                <Users size={48} className="text-primary mr-6" />
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-2">Join Our Team</h3>
                  <p className="text-gray-600 mb-4">
                    We're always looking for passionate individuals to join our mission.
                  </p>
                  <a 
                    href="mailto:team@pixelpuranas.com" 
                    className="text-primary hover:text-secondary transition-colors font-medium"
                  >
                    Contact us to learn more →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <a 
              href="mailto:info@pixelpuranas.com"
              className="inline-block bg-primary text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition-colors text-lg font-medium"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
