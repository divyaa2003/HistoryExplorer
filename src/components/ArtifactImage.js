import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * A component that generates a colored placeholder image for artifacts
 * based on their category (architecture, literature, etc.)
 */
const ArtifactImage = ({ category, text, width = 500, height = 300, className }) => {
  const canvasRef = useRef(null);
  
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const color = categoryColors[category] || categoryColors.default;
    
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
    
  }, [category, text, width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

ArtifactImage.propTypes = {
  category: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string
};

export default ArtifactImage;
