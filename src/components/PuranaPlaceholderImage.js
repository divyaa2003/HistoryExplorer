import React from 'react';

// Component to generate colored placeholder images with text
const PuranaPlaceholderImage = ({ name, category }) => {
  // Generate a consistent background color based on the category
  const getBackgroundColor = () => {
    switch (category) {
      case 'Sattva':
        return '#4CAF50'; // Green for Sattva
      case 'Raja':
        return '#FF9800'; // Orange for Raja
      case 'Tamas':
        return '#3F51B5'; // Blue for Tamas
      default:
        return '#9C27B0'; // Purple default
    }
  };

  // Generate a lighter color for the pattern
  const getPatternColor = () => {
    switch (category) {
      case 'Sattva':
        return '#81C784'; // Lighter green
      case 'Raja':
        return '#FFB74D'; // Lighter orange
      case 'Tamas':
        return '#7986CB'; // Lighter blue
      default:
        return '#BA68C8'; // Lighter purple
    }
  };

  const bgColor = getBackgroundColor();
  const patternColor = getPatternColor();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {/* Background */}
      <rect width="400" height="300" fill={bgColor} />
      
      {/* Decorative pattern */}
      <g fill={patternColor} opacity="0.3">
        <circle cx="50" cy="50" r="40" />
        <circle cx="350" cy="50" r="30" />
        <circle cx="50" cy="250" r="30" />
        <circle cx="350" cy="250" r="40" />
        <path d="M150,20 L250,20 L200,70 Z" />
        <path d="M150,280 L250,280 L200,230 Z" />
      </g>
      
      {/* Text shadow for better readability */}
      <text
        x="200"
        y="150"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        textAnchor="middle"
        fill="rgba(0,0,0,0.3)"
        transform="translate(2,2)"
      >
        {name}
      </text>
      
      {/* Main text */}
      <text
        x="200"
        y="150"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        textAnchor="middle"
        fill="white"
      >
        {name}
      </text>
      
      {/* Category text */}
      <text
        x="200"
        y="180"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        textAnchor="middle"
        fill="white"
      >
        {category} Purana
      </text>
    </svg>
  );
};

export default PuranaPlaceholderImage;
