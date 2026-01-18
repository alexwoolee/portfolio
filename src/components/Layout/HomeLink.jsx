/* Third-party libraries */
import { NavLink } from "react-router-dom";

/* Icons */
import { Settings } from "lucide-react"

/* Styles */
import styles from "./layout.module.css";

const HomeLink = ({ path, img, title, isSetting }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.activeLink : ""}`
      }
    >
      <div className={styles.iconWrapper}>
        {isSetting ? (
          <Settings />
        ) : (
          <img src={img} alt={path} className={styles.linkImg}></img>
        )}
      </div>
      <p className={`${styles.linkTitle} title-sm block`}>{title}</p>
    </NavLink>
  );
};

export default HomeLink;
