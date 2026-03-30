/* Components */
import SquareBox from "./SquareBox";
/* 3rd party libraries */
import { motion } from "motion/react";
/* React hooks */
import { useState, useEffect } from "react";

function generateGrid(totalSlots, emptyCount) {
  const grid = [];
  for (let i = 0; i < totalSlots; i++) {
    grid.push({ id: i, isEmpty: i < emptyCount });
  }
  for (let i = totalSlots - 1; i > 0; i--) {
    const rand = 
    
    Math.floor(Math.random() * (i + 1));
    [grid[i], grid[rand]] = [grid[rand], grid[i]];
  }
  return grid;
}


export default function Interface() {
  const [grid, setGrid] = useState(generateGrid(44, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      // Swap logic goes heres
    }, 1500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper relative w-full h-[100vh] overflow-hidden bg-[#e0f2fe] font-sans">
      <div>
        {/* 1. BACKGROUND GRID */}
        <div className="fixed top-0 left-24 right-0 bottom-0 inset-0 opacity-40 flex justify-center">
          <div
            layout
            className="grid w-full h-[50vh] grid-cols-[repeat(auto-fill,minmax(108px,108px))] gap-4 p-8 pointer-events-none justify-center"
          >
            {grid.map((square) => (
              <motion.div
                key={square.id}
                layout 
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className={`${square.isEmpty ? "opacity-0" : ""}`}
              >
                {!square.isEmpty && <SquareBox/>}
              </motion.div>
            ))}
          </div>
        </div>
        {/* 2. 3D STAGE (This holds both the content and the ring) */}
        {/* perspective: 600px is the secret. A lower number means the camera is closer, making the front part of the ring look MASSIVE compared to the back part. */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none" 
          style={{ perspective: "600px" }}
        >
          
          {/* preserve-3d allows the ring and the content to exist in the same physical 3D space */}
          <div className="relative flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            
            {/* MAIN CONTENT (Sitting flat in the middle at Z=0) */}
            <div 
              className="w-[500px] bg-white rounded-3xl shadow-2xl p-10 pointer-events-auto border-4 border-cyan-400 relative flex flex-col items-center justify-center text-center z-10"
              style={{ transform: "translateZ(0)" }}
            >
              <h1 className="text-4xl font-black text-cyan-500 mb-4 uppercase italic">Buy Weapons</h1>
              <p className="text-lg text-slate-500 font-medium">
                The ring is wrapping around this box. The bottom-right part is coming at you, the top-left is pushed to the back!
              </p>
            </div>

            {/* ORBITING RING */}
            <div 
              className="absolute w-[950px] h-[950px] pointer-events-none flex items-center justify-center" 
              style={{ 
                transformStyle: "preserve-3d",
                // rotateX tilts it flat. rotateY(-25deg) pulls the right side towards the camera.
                transform: "rotateX(70deg) rotateY(-350deg) rotateZ(0deg)" 
              }}
            >
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full animate-[spin_20s_linear_infinite]"
              >
                {/* Optional visible track to see the ring's path clearly */}
                <path 
                  id="ring-path" 
                  d="M 100, 100 m -85, 0 a 85,85 0 1,0 170,0 a 85,85 0 1,0 -170,0" 
                  fill="none" 
                  stroke="#22d3ee"
                  strokeWidth="18"
                  opacity="1"
                />
                <text fill="#0891b2" fontSize="12" fontWeight="900" letterSpacing="5" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.5)" }}>
                  <textPath href="#ring-path" startOffset="0%">
                    A // B // C // D // 
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}