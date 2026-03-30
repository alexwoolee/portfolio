/* React hooks */
import { useEffect, useState } from "react"
/* Third-party libraries */
import { ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"

/* Components */
import ProjectCard from "./ProjectCard"
import ProjInfoLinks from "./ProjInfoLinks"
import GridRowToggle from "./GridRowToggle"

/* Data */
import projects from "@/data/project-data"

/* Styles */
import styles from "./projects.module.css"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [view, setView] = useState(() => {
    const saved = localStorage.getItem("projViewPref")
    return saved !== null ? JSON.parse(saved) : "grid"
  })

  const handleView = (v) => {
    setView(v)
  }

  useEffect(() => {
    localStorage.setItem("projViewPref", JSON.stringify(view))
  }, [view])

  if (selectedProject) {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const nextProject = projects[(currentIndex + 1) % projects.length]
    const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]

    return (
      <div className={styles.projectDetailPage}>
        <div className={styles.detailNavTop}>
          <button className={styles.backBtn} onClick={() => setSelectedProject(null)}>
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </button>
        </div>
        
        <div className={styles.detailContentWrapper}>
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <h1 className={styles.detailTitle}>{selectedProject.title}</h1>
              <p className={styles.detailAuthors}>{selectedProject.authors.join(", ")}</p>
            </div>

            <div className={styles.detailImageWrapper}>
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className={styles.detailMainImg} />
            </div>

            <div className={styles.detailBody}>
              <p className={styles.detailDesc}>{selectedProject.description}</p>
            </div>
            
            <div className={styles.detailLinksContainer}>
              <ProjInfoLinks project={selectedProject} />
            </div>
          </div>
          
          <div className={styles.detailNavBottom}>
            <button className={styles.navBtn} onClick={() => setSelectedProject(prevProject)}>
              <ChevronLeft size={24} />
              <div className={styles.navBtnText}>
                <span className={styles.navLabel}>Previous</span>
                <span className={styles.navProjTitle}>{prevProject.title}</span>
              </div>
            </button>
            <button className={styles.navBtnRight} onClick={() => setSelectedProject(nextProject)}>
              <div className={styles.navBtnTextRight}>
                <span className={styles.navLabel}>Next</span>
                <span className={styles.navProjTitle}>{nextProject.title}</span>
              </div>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.projectsPage} >

      {/* いち */}
      <div className={`${styles.projectsContainer} scrollable-content`}>
        <div className={styles.projects}>
          <div className={styles.projectsOptions}>
            <GridRowToggle view={view} onToggle={handleView} />
          </div>
          {view === "grid" ? (
            <div className={styles.projectsList}>
              {projects.map((project) => (
                <div className={styles.projGridCard} key={project.id}>
                  <ProjectCard
                    project={project}
                    onSelect={setSelectedProject}
                  ></ProjectCard>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.projectsRowList}>
              {projects.map((project) => (
                <div className={styles.projRowCard} key={project.id}>
                  <ProjectCard
                    project={project}
                    onSelect={setSelectedProject}
                  ></ProjectCard>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects
