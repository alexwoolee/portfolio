import { useRef } from "react";
/* Third-party libraries */
import { motion } from "motion/react";
/* Styles */
import styles from "./settings.module.css";

const ToggleSwitch = ({ isActive }) => {
  const audioRef = useRef(null);

  return (
    <div
      className={`${styles.toggleCtn} ${isActive ? styles.justifyStart : styles.justifyEnd}`}
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
    </div>
  );
};

export default ToggleSwitch;
