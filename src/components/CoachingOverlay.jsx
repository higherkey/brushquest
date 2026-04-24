import React from 'react';
import { motion } from 'framer-motion';

const CoachingOverlay = ({ currentQuadrant, isBrushing }) => {
  // Mapping quadrant index to visual labels
  const quadrantLabels = [
    "Upper Right",
    "Upper Left",
    "Lower Left",
    "Lower Right"
  ];

  const teethPaths = {
    // Simplified paths for teeth quadrants
    upperRight: "M 100,50 Q 150,50 150,100 L 100,100 Z",
    upperLeft: "M 100,50 Q 50,50 50,100 L 100,100 Z",
    lowerLeft: "M 100,150 Q 50,150 50,100 L 100,100 Z",
    lowerRight: "M 100,150 Q 150,150 150,100 L 100,100 Z"
  };

  const getQuadrantOpacity = (index) => {
    return currentQuadrant === index + 1 ? 1 : 0.2;
  };

  const getQuadrantColor = (index) => {
    return currentQuadrant === index + 1 ? "var(--accent-primary)" : "var(--text-secondary)";
  };

  return (
    <div className="coaching-container">
      <div className="coaching-title">
        {quadrantLabels[currentQuadrant - 1]}
      </div>
      
      <svg viewBox="0 0 200 200" className="teeth-diagram">
        {/* Background jaw shape */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        
        {/* Upper Right (Q1) */}
        <motion.path
          d={teethPaths.upperRight}
          fill={getQuadrantColor(0)}
          animate={{ opacity: getQuadrantOpacity(0), scale: currentQuadrant === 1 ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Upper Left (Q2) */}
        <motion.path
          d={teethPaths.upperLeft}
          fill={getQuadrantColor(1)}
          animate={{ opacity: getQuadrantOpacity(1), scale: currentQuadrant === 2 ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Lower Left (Q3) */}
        <motion.path
          d={teethPaths.lowerLeft}
          fill={getQuadrantColor(2)}
          animate={{ opacity: getQuadrantOpacity(2), scale: currentQuadrant === 3 ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Lower Right (Q4) */}
        <motion.path
          d={teethPaths.lowerRight}
          fill={getQuadrantColor(3)}
          animate={{ opacity: getQuadrantOpacity(3), scale: currentQuadrant === 4 ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Brushing motion indicator */}
        {isBrushing && (
          <motion.circle
            cx={currentQuadrant === 1 || currentQuadrant === 4 ? 125 : 75}
            cy={currentQuadrant === 1 || currentQuadrant === 2 ? 75 : 125}
            r="10"
            fill="var(--accent-secondary)"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              rotate: 360
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
      
      <div className="coaching-instruction">
        {isBrushing ? "Brush in gentle circles" : "Get Ready!"}
      </div>
    </div>
  );
};

export default CoachingOverlay;
