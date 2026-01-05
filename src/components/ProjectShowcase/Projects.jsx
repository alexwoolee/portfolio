import { useState } from "react";
// Importing icons from lucide-react
import { PanelRightOpen } from "lucide-react";
// Importing components
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";
import GridRowToggle from "./GridRowToggle";
import Footer from "../ui/Footer";
/* Data */
import projects from "../../data/DataProjects";
/* Styles */
import styles from "./projects.module.css";

const Projects = () => {
  // selectedProject is an obj that stores a component's prop, to access a prop => selectedProject.prop_example
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [view, setView] = useState("grid");

  const handleView = (view) => {
    setView(view);
  };

  return (
    <div className={styles.projectsPage}>
      {/* いち */}
      <div className={`${styles.projectsContainer} scrollable-content`}>
        <section className={styles.projectsHeader}>
          <h1>Projects</h1>
          <p>
            The essential projects I've built, tested, and collaborated
            throughout the years.
          </p>
        </section>

        <div className={styles.projects}>
          <div className={styles.projectsOptions}>
            <GridRowToggle view={view} onToggle={handleView} />
            <PanelRightOpen />
          </div>
          {view === "grid" ? (
            <div className={styles.projectsList}>
              {projects.map((project) => (
                <div className={styles.projGridCard}>
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
                  ></ProjectCard>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.projectsRowList}>
              {projects.map((project) => (
                <div className={styles.projRowCard}>
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
                  ></ProjectCard>
                </div>
              ))}
            </div>
          )}
                  <Footer />
        </div>
      </div>
      {/* に */}
      {selectedProject && <ProjectInfo project={selectedProject}></ProjectInfo>}
    </div>
  );
};

export default Projects;
