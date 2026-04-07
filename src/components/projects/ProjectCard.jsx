/* Third-party libraries */
import { Link } from "react-router-dom"

/* Styles */
import styles from "./projects.module.css"

const ProjectCard = ({ project, onSelect }) => {
  return (
    <div onClick={() => onSelect(project)} style={{ height: "100%" }}>
      <Link style={{ display: "block", height: "100%", textDecoration: "none" }}>
        <div className={styles.projCardContent}>
          <img
            src={project.imageUrl}
            alt={`${project.title} project image`}
            className={styles.projImg}
          ></img>
        {/* authors or references */}
        <div className={styles.projTxt}>
          <h1 className={styles.projTitle}>{project.title}</h1>
          <p className={styles.projSummary}>{project.description}</p>
        </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard
