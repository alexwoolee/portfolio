import React from 'react';
import { motion } from 'framer-motion';

const PersonaSidebar = () => {
  // We use viewBox="0 0 300 1000". 
  // X = 0 is the far left of the screen. X = 300 is the right edge of the text area.
  
  // LAYER 1: The Orange "Border" (which is actually a giant orange shape in the back)
  const orangeVariants = {
    animate: {
      d: [
        // Base S-Curve: Top right (300), bows out (450), dips in (150), ends bottom (350)
        "M 0 0 L 300 0 C 450 300, 150 700, 350 1000 L 0 1000 Z",
        // Expanded S-Curve: Pushes right by 30px uniformly
        "M 0 0 L 300 0 C 480 300, 180 700, 350 1000 L 0 1000 Z",
        // Back to Base
        "M 0 0 L 300 0 C 450 300, 150 700, 350 1000 L 0 1000 Z"
      ],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  // LAYER 2: The White Background (Layered on top, shifted left by 30px to reveal the orange)
  const whiteVariants = {
    animate: {
      d: [
        // Matches the orange curve, but every right-side X coordinate is subtracted by 30
        "M 0 0 L 270 0 C 420 300, 120 700, 320 1000 L 0 1000 Z",
        // Expanded: Also pushes right by 30px uniformly
        "M 0 0 L 270 0 C 450 300, 150 700, 320 1000 L 0 1000 Z",
        "M 0 0 L 270 0 C 420 300, 120 700, 320 1000 L 0 1000 Z"
      ],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    // The main container for the whole screen
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#38c5c4', overflow: 'hidden' }}>
      
      {/* Sidebar Container */}
      <div style={{ width: '350px', height: '100%', position: 'relative' }}>
        
        {/* The Magic SVG Background */}
        <svg 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible', // CRITICAL: Lets the curves spill out over the teal background
            zIndex: 0
          }}
          viewBox="0 0 350 1000"
          preserveAspectRatio="none" // CRITICAL: Stretches the curve to perfectly fit your 100vh container without leaving gaps
        >
          {/* Layer 1: Orange */}
          <motion.path 
            variants={orangeVariants}
            animate="animate"
            fill="#ff3b00" 
          />
          
          {/* Layer 2: White */}
          <motion.path 
            variants={whiteVariants}
            animate="animate"
            fill="#f4f4f4" 
          />
        </svg>

        {/* Foreground Text Content */}
        {/* The zIndex ensures the text sits on top of the SVG backgrounds */}
        <div style={{ position: 'relative', zIndex: 1, padding: '40px', paddingTop: '150px', textAlign: 'right', fontSize: '20px', color: '#333' }}>
          <p style={{ margin: '20px 0' }}>Buy <b>weapons</b></p>
          <p style={{ margin: '20px 0' }}>Buy <b>protectors</b></p>
          <p style={{ margin: '20px 0' }}>Buy <b>accessories</b></p>
        </div>

      </div>
    </div>
  );
};

export default PersonaSidebar;