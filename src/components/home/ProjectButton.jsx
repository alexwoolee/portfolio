/* Third-party libraries */
import { Link } from "react-router-dom"
import { Circle, ArrowDown } from "lucide-react"
/* Styles */
import styles from "./home.module.css"


const ProjectButton = ({ path }) => {
  return (
    <Link className={styles.projectButtonWrapper} to={`/${path}`}>
      <div className="flex relative w-8 h-8 justify-center items-center">
        <Circle width={16} height={16} fill={"black"}
          className={styles.iconSmallCircle}
        ></Circle>
        <ArrowDown width={32} height={32} 
          className={styles.iconArrowDown}>
        </ArrowDown>
      </div>
      <span className={styles.buttonText}>My Projects</span>
    </Link>
  );
};

export default ProjectButton
