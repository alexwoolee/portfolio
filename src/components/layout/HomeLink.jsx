/* Third-party libraries */
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

/* Icons */
import { Settings } from "lucide-react"

/* Styles */
import styles from "./layout.module.css";

const HomeLink = ({ path, img, title, isSetting, onLinkClick, waveReach }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.activeText : ""}`
      }
      onClick={onLinkClick}
      style={waveReach ? { "--wave-reach": waveReach } : undefined}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="swimmingLink"
              className={styles.swimmingBackground}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />
          )}
          <div className={styles.iconWrapper} style={{ position: "relative", zIndex: 1 }}>
            {isSetting ? (
              <Settings />
            ) : (
              <img src={img} alt={path} className={styles.linkImg}></img>
            )}
          </div>
          <p className={`${styles.linkTitle} title-sm block`} style={{ position: "relative", zIndex: 1 }}>{title}</p>
        </>
      )}
    </NavLink>
  );
};

export default HomeLink;
