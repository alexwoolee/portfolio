/* Third-party libraries */
import { ExternalLink } from 'lucide-react'

/* Assets */
import FIGMA from "@/assets/icons/figma-logo.svg"

/* Styles */
import styles from "./projects.module.css"

const ProjInfoLinks = ({ project }) => {
  return (
    <div className={styles.githubLinks}>
      {/* github repo */}
      <div className={`${styles.githubLink} ${styles.githubTheme}`}>
        <a href={project.github}>
          <img
            src="https://raw.githubusercontent.com/CLorant/readme-social-icons/main/large/light/github.svg"
            alt="github icon"
          />
        </a>
      </div>
      {/* figma */}
      {project.figma === "" ? null : (
        <div className={`${styles.githubLink} ${styles.figmaTheme}`}>
          <a href={project.figma}>
            <img src={FIGMA} alt="figma icon" />
          </a>
        </div>
      )}

      {/* live demo */}
      {project.live === "" ? null : (
        <div className={`${styles.githubLink} ${styles.linkTheme}`}>
          <a href={project.live}>
            <ExternalLink width={24} height={24} />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjInfoLinks
