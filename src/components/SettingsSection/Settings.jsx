/* React hooks */
import { useState } from "react";

/* Components */
import Option from "./Option";

/* Styles */
import styles from "./settings.module.css";

const ops = [
  {
    opOne: "dark-mode",
    opLabel: "DARK MODE",
  },
  {
    opTwo: "TBA",
    opLabel: "DARK MODE",
  },
  {
    opThree: "TBA",
    opLabel: "DARK MODE",
  },
  {
    opFour: "TBA",
    opLabel: "DARK MODE",
  },
  {
    opFive: "TBA",
    opLabel: "DARK MODE",
  },
  {
    opSix: "TBA",
    opLabel: "DARK MODE",
  },
];

const Settings = () => {
  const [activeOption, setActiveOption] = useState(null);

  return (
    <div className={styles.settingsCtn}>
      <div className={styles.optionsCtn}>
        <div className={styles.room}>
          {/* WALL 1: Left */}
          <div className={styles.wallLeft}>LEFT</div>
          {/* WALL 2: Center */}
          <div className={styles.wallCenter}>CENTER</div>
          {/* WALL #: Top */}
          <div className={styles.wallRight}>RIGHT</div>
          <div className={styles.options}>
            {ops.map((op, i) => {
              return <Option key={i} opLabel={op.opLabel} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
