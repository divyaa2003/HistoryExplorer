import React from 'react';
import './assets/css/backgrounds.css';
import './assets/css/card-backgrounds.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import PuranaDetailPage from './pages/PuranaDetailPage';
import StoryDetailPage from './pages/StoryDetailPage';
import AboutPage from './pages/AboutPage';
import AllPuranasPage from './pages/AllPuranasPage';

// Advanced Feature Pages
import ImageAnalysisPage from './pages/advanced-features/ImageAnalysisPage';
import VoiceGuidePage from './pages/advanced-features/VoiceGuidePage';
import AugmentedRealityPage from './pages/advanced-features/AugmentedRealityPage';
import SocialHistoryHub from './pages/advanced-features/SocialHistoryHub';
import CustomHistoryPaths from './pages/advanced-features/CustomHistoryPaths';
import TimelinePage from './pages/advanced-features/TimelinePage';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/purana/all" element={<AllPuranasPage />} />
              <Route path="/purana/:id" element={<PuranaDetailPage />} />
              <Route path="/story/:id" element={<StoryDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Advanced Feature Routes */}
              <Route path="/features/image-analysis" element={<ImageAnalysisPage />} />
              <Route path="/features/voice-guide" element={<VoiceGuidePage />} />
              <Route path="/features/augmented-reality" element={<AugmentedRealityPage />} />
              <Route path="/features/social-hub" element={<SocialHistoryHub />} />
              <Route path="/features/custom-paths" element={<CustomHistoryPaths />} />
              <Route path="/features/timeline" element={<TimelinePage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
