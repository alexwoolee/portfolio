// 3rd party libraries 
import { motion } from "motion/react";
// React hooks 
import { useState, useEffect } from "react";


// A square element 
const SquareBox = () => { 
    return <div className="w-28 aspect-square rounded-4xl shadow-xl bg-cyan-500"></div>
}


// Generates a grid 
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
      // Swap logic goes here
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
      </div>
    </div>
  ); 
}