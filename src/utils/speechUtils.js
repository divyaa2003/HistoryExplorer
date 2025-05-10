// Utility functions for speech synthesis

/**
 * Speaks the provided text using the browser's speech synthesis API
 * @param {string} text - The text to be spoken
 * @param {Object} options - Options for speech synthesis
 * @param {string} options.voice - Voice name to use (if available)
 * @param {number} options.rate - Speech rate (0.1 to 10)
 * @param {number} options.pitch - Speech pitch (0 to 2)
 * @param {number} options.volume - Speech volume (0 to 1)
 * @returns {Promise} - Resolves when speech is complete
 */
export const speakText = (text, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      reject('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set default options
    const defaultOptions = {
      voice: null,
      rate: 1,
      pitch: 1,
      volume: 1
    };
    
    const speechOptions = { ...defaultOptions, ...options };
    
    // Apply options
    utterance.rate = speechOptions.rate;
    utterance.pitch = speechOptions.pitch;
    utterance.volume = speechOptions.volume;
    
    // Set voice if specified
    if (speechOptions.voice) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === speechOptions.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    // Set event handlers
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      reject(`Speech synthesis error: ${event.error}`);
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Gets all available voices for speech synthesis
 * @returns {Promise<SpeechSynthesisVoice[]>} - Resolves with array of available voices
 */
export const getAvailableVoices = () => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      resolve([]);
      return;
    }
    
    // If voices are already loaded
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    
    // If voices aren't loaded yet, wait for them
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    };
  });
};

/**
 * Finds the best voice for Indian content
 * @returns {Promise<SpeechSynthesisVoice|null>} - Resolves with best voice or null
 */
export const findBestVoiceForIndianContent = async () => {
  const voices = await getAvailableVoices();
  
  // Priority order for finding voices
  const voicePriorities = [
    // Look for Indian English voices first
    (v) => v.lang === 'en-IN',
    // Then any Hindi voices
    (v) => v.lang === 'hi-IN',
    // Then any English voices with India in the name
    (v) => v.name.toLowerCase().includes('india'),
    // Then any English voices
    (v) => v.lang.startsWith('en'),
    // Fallback to any voice
    (v) => true
  ];
  
  // Try each priority in order
  for (const priorityFn of voicePriorities) {
    const matchingVoices = voices.filter(priorityFn);
    if (matchingVoices.length > 0) {
      return matchingVoices[0];
    }
  }
  
  return null;
};

export default {
  speakText,
  getAvailableVoices,
  findBestVoiceForIndianContent
};
