/* React hooks */
import { useState, useRef, useEffect } from "react"

/* Third-party libraries */
import { FaAws, FaDocker, FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa"
import {
  SiFigma,
  SiVercel,
  SiJest,
  SiPostgresql,
  SiMongodb,
  SiNextdotjs,
  SiExpress
} from "react-icons/si"

/* Components */
import Languages from "./Languages.jsx"
import GeneralSkills from "./GeneralSkills.tsx"
import ExperienceCard from "./ExperienceCard.jsx"
import ProjectButton from "./ProjectButton.jsx"
import Button from "@/components/shared/Button.jsx"
import Education from "./Education.jsx"
import ContactCard from "./ContactCard.jsx"
import Footer from "@/components/shared/Footer.jsx"
import LiquidWavyStripe from "@/components/blog/LiquidWavyStripe.jsx"

/* Assets */
import PFP from "@/assets/gifs/doggiecorgi_swim.gif"
import HMART from "@/assets/experience/HMART.jpeg"
import MOCC from "@/assets/experience/MOCC.png"

/* Styles */
import styles from "./home.module.css"

export function MyCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
  }, [])

  return <canvas ref={canvasRef} />
}

const Home = () => {
  const [active, setActive] = useState("education")
  const iconSize = 50

  return (
    <>
      <LiquidWavyStripe />
      <div className="wrapper">
        <div className={`${styles.content} scrollable-conten`}>
          <div className="w-full flex flex-col lg:justify-start justify-start items-center lg:items-center gap-8">
          <img src={PFP} alt="Profile picture"
            className={`${styles.profile} w-32 h-32 border rounded-full border-transparent object-cover`}
          ></img>
          <div>
            <h1 className={styles.title}>Alex Woo Lee</h1>
            <h2 className={`${styles.profession} text-center`}>Software Developer</h2>
          </div>
          <div className={styles.bioCtn}>
            <p className={`${styles.bio} text-center`}>
              I'm a Canadian software developer currently studying Computing    
              Science at Simon Fraser University, fluent in English and Chinese 
              with some basic Japanese. I enjoy building intuitive interfaces,  
              experimenting with complex projects, and constantly learning new  
              technologies to face real world challenges.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <ProjectButton path="proj" />
            <Button path="about" />
          </div>
        </div>

        {/* --- LOGO SLIDER --- */}
        <div className={styles.logoSliding}>
          <div className={styles.logos}>
            {/* Set 1 */}
            <FaReact size={iconSize} color="#61DAFB" />
            <SiNextdotjs size={iconSize} /> {/* Default color (usually black or white based on theme) */}
            <FaNodeJs size={iconSize} color="#339933" />
            <SiExpress size={iconSize} /> {/* Default color */}
            <SiPostgresql size={iconSize} color="#336791" />
            <SiMongodb size={iconSize} color="#47A248" />
            <FaGitAlt size={iconSize} color="#F05032" />
            <FaGithub size={iconSize} /> {/* Default color */}
            <SiVercel size={iconSize} />
            <FaDocker size={iconSize} color="#2496ED" />
            <FaAws size={iconSize} color="#FF9900" />

            {/* Set 2 (Duplicate for infinite scroll) */}
            <FaReact size={iconSize} color="#61DAFB" />
            <SiNextdotjs size={iconSize} />
            <FaNodeJs size={iconSize} color="#339933" />
            <SiExpress size={iconSize} />
            <SiPostgresql size={iconSize} color="#336791" />
            <SiMongodb size={iconSize} color="#47A248" />
            <FaGitAlt size={iconSize} color="#F05032" />
            <FaGithub size={iconSize} />
            <SiVercel size={iconSize} />
            <FaDocker size={iconSize} color="#2496ED" />
            <FaAws size={iconSize} color="#FF9900" />
          </div>
        </div>

        <section className={styles.generalContent}>
          <section>
            <h1 className={`${styles.sectionTitle} title-lg`}>
              Programming Languages
            </h1>
            <Languages />
          </section>

          <section>
            <h1 className={`${styles.sectionTitle} title-lg`}>Skills</h1>       
            <GeneralSkills></GeneralSkills>
          </section>

          {/* --- SEGMENTED TOGGLE BUTTONS --- */}
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleBtn} ${
                active === "experience" ? styles.activeBtn : ""
              }`}
              onClick={() => setActive("experience")}
            >
              Experience
            </button>
            <button
              className={`${styles.toggleBtn} ${
                active === "education" ? styles.activeBtn : ""
              }`}
              onClick={() => setActive("education")}
            >
              Education
            </button>
          </div>

          {active === "experience" && (
            <section>
              <div className={styles.expCtn}>
                <ExperienceCard img={HMART} company="H-Mart" title="Grocery Clerk" period="Sep.2023 - Aug.2024" />
                <ExperienceCard img={MOCC} company="MOCC" title="Food Hub" period="Sep.2022 - Dec.2022" />
              </div>
            </section>
          )}

          {active === "education" && (
            <section><Education></Education></section>
          )}
          <ContactCard />
          <Footer />
        </section>
      </div>
    </div>
    </>
  );
};

export default Home
