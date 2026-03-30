/* Third-party libraries */
import { Settings } from "lucide-react"

/* Styles */
import styles from "./layout.module.css"

const SettingsLink = ({ isOpen, onClick }) => {
  return (
    <button
      className={`${styles.link} ${isOpen ? styles.activeLink : ""}`}
      type="button"
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        <Settings size={20} />
      </div>
      <p className={`${styles.linkTitle} title-sm block`}>Settings</p>
    </button>
  );
};

export default SettingsLink
