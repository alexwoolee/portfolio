/* React hooks */
import { useState, useRef } from "react";

/* Third-party libraries */
import { motion } from "motion/react";

/* Styles */
import styles from "./settings.module.css";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => setIsOn(!isOn);

  return (
    <button
      className={`${styles.toggleCtn} ${isOn ? "justify-start" : "justify-end"}`}
      onClick={toggle}
    >
      <audio ref={audioRef}>
        <source src="/audio/menu.mp3" type="audio/mpeg" /> 
      </audio>
      <motion.div
        className={styles.handle}
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
};

export default ToggleSwitch;
