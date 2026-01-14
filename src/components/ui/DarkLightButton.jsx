/* React hooks */
import { useState } from "react"

/* Third-party libraries */
import { Moon, Sun } from 'lucide-react'

/* Styles */
import styles from './ui.module.css'

const DarkLightButton = () => {
  const [darkType, setDarkType] = useState(true)

  return (
    <div 
      onClick={() => setDarkType(!darkType)} 
      className={`${darkType === true ? `bg-blue-800` : `bg-orange-500`} ${styles.toggleBtn}`}
    >
      {darkType === true ? <Moon fill={"orange"} /> : <Sun fill={"orange"} />}
    </div>
  );
};

export default DarkLightButton