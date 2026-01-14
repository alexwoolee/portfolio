import { NavLink } from "react-router-dom";
import styles from "./layout.module.css";

const HomeLink = ({ path, img, title }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.activeLink : ""}`
      }
    >
      <div className={styles.iconWrapper}>
        <img src={img} alt={path} className={styles.linkImg}></img>
      </div>
      <p className={`${styles.linkTitle} title-sm block`}>{title}</p>
    </NavLink>
  );
};

export default HomeLink;
