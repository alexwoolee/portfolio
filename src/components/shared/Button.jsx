/* Third-party libraries */
import { Link } from "react-router-dom"
/* Styles */
import styles from "./ui.module.css"


const Button = ({ path }) => {
  return (
    <Link to={`/${path}`} className={styles.btnBorderReveal}>
      <span>About Me</span>
    </Link>
  );
};

export default Button

