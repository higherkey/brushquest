import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const CoachingOverlay = ({ currentQuadrant, isBrushing }) => {
  const quadrantLabels = [
    "Upper Right Section",
    "Upper Left Section",
    "Lower Left Section",
    "Lower Right Section"
  ];

  const teethPaths = {
    upperRight: "M 100,50 Q 150,50 150,100 L 100,100 Z",
    upperLeft: "M 100,50 Q 50,50 50,100 L 100,100 Z",
    lowerLeft: "M 100,150 Q 50,150 50,100 L 100,100 Z",
    lowerRight: "M 100,150 Q 150,150 150,100 L 100,100 Z"
  };

  const getQuadrantOpacity = (index) => {
    return currentQuadrant === index + 1 ? 1 : 0.35;
  };

  const getQuadrantColor = (index) => {
    return currentQuadrant === index + 1 ? "#059669" : "#94a3b8";
  };

  return (
    <div className="coaching-overlay-container">
      <div className="coaching-title">
        {quadrantLabels[currentQuadrant - 1]}
      </div>
      
      <svg viewBox="0 0 200 200" className="teeth-diagram">
        {/* Background jaw shape */}
        <circle 
          cx="100" 
          cy="100" 
          r="80" 
          fill="none" 
          stroke="rgba(0,0,0,0.06)" 
          strokeWidth="6" 
        />
        
        {/* Upper Right (Q1) */}
        <motion.path
          d={teethPaths.upperRight}
          fill={getQuadrantColor(0)}
          animate={{ opacity: getQuadrantOpacity(0), scale: currentQuadrant === 1 ? 1.06 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Upper Left (Q2) */}
        <motion.path
          d={teethPaths.upperLeft}
          fill={getQuadrantColor(1)}
          animate={{ opacity: getQuadrantOpacity(1), scale: currentQuadrant === 2 ? 1.06 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Lower Left (Q3) */}
        <motion.path
          d={teethPaths.lowerLeft}
          fill={getQuadrantColor(2)}
          animate={{ opacity: getQuadrantOpacity(2), scale: currentQuadrant === 3 ? 1.06 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Lower Right (Q4) */}
        <motion.path
          d={teethPaths.lowerRight}
          fill={getQuadrantColor(3)}
          animate={{ opacity: getQuadrantOpacity(3), scale: currentQuadrant === 4 ? 1.06 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Brushing motion indicator */}
        {isBrushing && (
          <motion.circle
            cx={currentQuadrant === 1 || currentQuadrant === 4 ? 125 : 75}
            cy={currentQuadrant === 1 || currentQuadrant === 2 ? 75 : 125}
            r="12"
            fill="#ec4899"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
              rotate: 360
            }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
      
      <div className="coaching-instruction">
        {isBrushing ? "💡 Brush in gentle circular wiggles!" : "Get Ready!"}
      </div>
    </div>
  );
};

CoachingOverlay.propTypes = {
  currentQuadrant: PropTypes.number.isRequired,
  isBrushing: PropTypes.bool.isRequired,
};

export default CoachingOverlay;
