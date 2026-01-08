import { Settings } from "lucide-react";
import styles from './layout.module.css';

const SettingsLink = () => {
  return (
    <button className={styles.link} type="button">
      <Settings size={20} />
      <div>
        <p className={`${styles.linkTitle} title-sm lg:block hidden`}>
          Settings
        </p>
      </div>
    </button>
  );
};

export default SettingsLink;