/* React hooks */
import { useEffect, useState } from "react"

/* Components */
import ProjectCard from "./ProjectCard"
import ProjectInfo from "./ProjectInfo"
import GridRowToggle from "./GridRowToggle"
import Footer from "@/components/shared/Footer"

/* Data */
import projects from "@/data/project-data"

/* Styles */
import styles from "./projects.module.css"

const Projects = () => {
  // selectedProject is an obj that stores a component's prop, to access a prop => selectedProject.prop_example
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [view, setView] = useState(() => {
    const saved = localStorage.getItem("projViewPref")
    return saved !== null ? JSON.parse(saved) : "grid"
  })

  const handleView = (view) => {
    setView(view)
  }

  useEffect(() => {
    localStorage.setItem("projViewPref", JSON.stringify(view))
  }, [view])

  return (
    <div className={styles.projectsPage}>
      {/* いち */}
      <div className={`${styles.projectsContainer} scrollable-content`}>
        <section className={styles.projectsHeader}>
          Projects
        </section>

        <div className={styles.projects}>
          <div className={styles.projectsOptions}>
            <GridRowToggle view={view} onToggle={handleView} />
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

export default Projects
