/* React hooks */
import { useEffect, useState, useCallback } from "react";
/* Components */
import Option from "./Option";
/* Styles */
import styles from "./settings.module.css";

const options_list = [
  {
    id: "dark-mode",
    label: "DARK MODE",
  },
  {
    id: "read-mode",
    label: "READ MODE",
  },
  {
    id: "effects",
    label: "EFFECTS",
  },
  {
    id: "animals",
    label: "ANIMALS",
  },
  {
    id: "custom-cursor",
    label: "CUSTOM CURSOR",
  },
  {
    id: "ai",
    label: "AI",
  },
];

const Settings = () => {
  const [activeOptions, setActiveOptions] = useState(() => {
    const saved = localStorage.getItem("my-app-settings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-app-settings", JSON.stringify(activeOptions));
  }, [activeOptions]);

  const handleToggle = useCallback((id) => {
    setActiveOptions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  return (
    <section className={styles.settingsCtn}>
      <div className={styles.optionsCtn}>
        <div className={styles.room} aria-hidden="true">
          {/* WALL 1: Left */}
          <div className={styles.wallLeft}>LEFT</div>
          {/* WALL 2: Center */}
          <div className={styles.wallCenter}>CENTER</div>
          {/* WALL #: Top */}
          <div className={styles.wallRight}>RIGHT</div>
          <div className={styles.wallTop}>TOP</div>
          <div className={styles.wallBottom}>BOTTOM</div>
        </div>
        <ul className={styles.options}>
          {options_list.map((option, i) => {
            const isThisOptionActive = activeOptions.includes(option.id);
            return (
              <li key={option.id}>
                <Option
                  id={option.id}
                  optionLabel={option.label}
                  onToggle={handleToggle}
                  activeOption={isThisOptionActive}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Settings;
