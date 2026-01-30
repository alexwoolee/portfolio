/* Third-party libraries */
import { motion } from "motion/react";
import useSound from "use-sound";

/* Components */
import ToggleSwitch from "./ToggleSwitch";
import styles from "./settings.module.css";

/* Audio */
import menuSfx from "/audio/menu.mp3";
import { useState } from "react";

const Option = ({ key, opLabel }) => {
  const [play] = useSound(menuSfx, { interrupt: true });

  const [hoverTimer, setHoverTimer] = useState(null);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      play();
    }, 50);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.option}
      initial={{ opacity: 0, x: -2000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      key={key}
    >
      <img
        src="/icons/diamond-icon.png"
        alt="icon"
        className={styles.optionLogo}
      />
      <p className={styles.optionLabel}>{opLabel}</p>
      <ToggleSwitch />
    </motion.div>
  );
};

export default Option;
