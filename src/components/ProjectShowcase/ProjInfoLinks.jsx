import FIGMA from "../../assets/icons/figma-logo.svg";
import styles from "./projects.module.css";
import { ExternalLink } from 'lucide-react';

const ProjInfoLinks = ({ project }) => {
  return (
    <div className={styles.githubLinks}>
      {/* github repo */}
      <div className={styles.githubLink}>
        <a href={project.github}>
          <img
            src="https://raw.githubusercontent.com/CLorant/readme-social-icons/main/large/dark/github.svg"
            alt="github icon"
          />
        </a>
      </div>
      {/* figma */}
      {project.figma === "" ? null : (
        <div className={styles.githubLink}>
          <a href={project.figma}>
            <img src={FIGMA} alt="figma icon" />
          </a>
        </div>
      )}

      {/* live demo */}
      {project.live === "" ? null : (
        <div className={styles.githubLink}>
          <a href={project.live}>
            <ExternalLink width={24} height={24} />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjInfoLinks;
