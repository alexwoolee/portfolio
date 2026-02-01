import { useRef, memo } from "react";
/* === Third-party libraries === */
import { motion } from "motion/react";
import useSound from "use-sound";
/* === Components === */
import ToggleSwitch from "./ToggleSwitch";
import styles from "./settings.module.css";
/* === Audio === */
import menuSfx from "/audio/menu.mp3";

const Option = ({ id, optionLabel, onToggle, activeOption }) => {
  const [play] = useSound(menuSfx, { interrupt: true });
  const hoverTimer = useRef(null); 

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      play();
    }, 50);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  return (
    <motion.button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onToggle(id)}

      className={`${styles.option} ${activeOption ? styles.activeOption : ""}`}

      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <img
        src="/icons/diamond-icon.png"
        alt=""
        className={styles.optionLogo}
      />
      <p className={styles.optionLabel}>{optionLabel}</p>
      <ToggleSwitch isActive={activeOption} />
    </motion.button>
  );
};

export default memo(Option);
