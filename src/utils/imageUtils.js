/**
 * Utility functions for generating and handling images
 */

/**
 * Generates a colored placeholder image with text
 * @param {string} category - Category of the artifact (architecture, literature, etc.)
 * @param {string} text - Text to display on the image
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @returns {string} - Data URL of the generated image
 */
export const generateArtifactImage = (category, text, width = 500, height = 300) => {
  // Map categories to colors based on gunas (Sattva, Rajas, Tamas)
  const categoryColors = {
    architecture: '#4CAF50', // Sattva - green (temples, observatories)
    literature: '#2196F3',   // Sattva - blue (manuscripts, texts)
    religion: '#9C27B0',     // Sattva - purple (deities, spiritual items)
    art: '#FF9800',          // Rajas - orange (paintings, sculptures)
    artifacts: '#795548',    // Rajas - brown (pottery, jewelry)
    warfare: '#F44336',      // Tamas - red (weapons, armor)
    language: '#00BCD4',     // Sattva - cyan (inscriptions, scripts)
    default: '#607D8B'       // Neutral - blue grey
  };

  const color = categoryColors[category] || categoryColors.default;
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add a pattern or texture effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < width; i += 20) {
    for (let j = 0; j < height; j += 20) {
      if ((i + j) % 40 === 0) {
        ctx.fillRect(i, j, 10, 10);
      }
    }
  }
  
  // Draw border
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, width - 8, height - 8);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Handle multiline text
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];
  
  const fontSize = Math.min(width / 10, 30);
  ctx.font = `bold ${fontSize}px Arial`;
  
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(`${currentLine} ${word}`).width;
    if (width < canvas.width - 40) {
      currentLine += ` ${word}`;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  
  // Draw each line
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = (height - totalHeight) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });
  
  // Add category label
  ctx.font = `bold ${fontSize * 0.7}px Arial`;
  ctx.fillText(category.toUpperCase(), width / 2, height - 20);
  
  // Return data URL
  return canvas.toDataURL('image/png');
};

/**
 * Preloads an image and returns a promise
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when the image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Generates a placeholder image for artifacts in the Time Traveler Challenge
 * This function returns a static URL for now, but can be enhanced to generate dynamic images
 * @param {string} category - Category of the artifact
 * @param {string} name - Name of the artifact
 * @returns {string} - URL of the placeholder image
 */
export const getArtifactPlaceholder = (category, name) => {
  const categoryMap = {
    architecture: 'temple-carving.jpg',
    literature: 'manuscript.jpg',
    artifacts: 'ancient-coin.jpg',
    religion: 'vishnu-statue.jpg',
    art: 'painting.jpg',
    language: 'inscription.jpg',
    warfare: 'weapon.jpg'
  };
  
  const filename = categoryMap[category] || 'artifact-placeholder.jpg';
  return `/images/artifacts/${filename}`;
};
