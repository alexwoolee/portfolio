/* React hooks */
import { useState } from "react"

/* Third-party libraries */
import { Volume, Volume1, Volume2, Snowflake, Umbrella } from 'lucide-react'

/* Components */
import DarkLightButton from "@/components/ui/DarkLightButton.jsx"
import Snow from "@/components/ui/Snow"
import Raining from "@/components/ui/Rain"

/* Styles */
import styles from './layout.module.css'

const Controls = () => {
  const [activeType, setActiveType] = useState("snow")

  return (
    <>
      <div className={styles.toggles}>
        <button
          className={`${styles.toggleBtn} ${activeType === "volume" ? styles.activeBtn : ""}`}
          onClick={() => setActiveType("volume")}
        >
          <Volume1 />
        </button>

        <button
          className={`${styles.toggleBtn} ${activeType === "snow" ? styles.activeBtn : ""}`}
          onClick={() => setActiveType("snow")}
        >
          <Snowflake /> {/* Icon just sits here looking pretty */}
        </button>

        <button
          className={`${styles.toggleBtn} ${activeType === "rain" ? styles.activeBtn : ""}`}
          onClick={() => setActiveType("rain")}
        >
          <Umbrella />
        </button>

        <DarkLightButton />
      </div>
      { activeType === "snow" && <Snow />}
      { activeType === "rain" && <Raining />}
    </>
  );
};

export default Controls