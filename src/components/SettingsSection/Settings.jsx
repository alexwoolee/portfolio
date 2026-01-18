/* Components */
import Option from "./Option";

/* Styles */
import styles from "./settings.module.css";

const Settings = () => {
  return (
    <div className={styles.settingsCtn}>
      <div className={styles.optionsCtn}>
        <Option></Option>
        <Option></Option>
        <Option></Option>
        <Option></Option>
        <Option></Option>
        <Option></Option>
      </div>
    </div>
  );
};

export default Settings;
