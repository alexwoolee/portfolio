/* Assets */
import SFU from "@/assets/education/SFU.png"

/* Styles */
import styles from './home.module.css'

const Education = () => {
  return (
    <div className={styles.eduCompactContainer}>
      {/* Header: Logo + Info side-by-side */}
      <div className={styles.uniHeader}>
        <img src={SFU} className={styles.uniLogoCompact} alt="SFU Logo" />      
        <div className={styles.uniInfo}>
          <h1 className="title-md" style={{ margin: 0, fontWeight: 600 }}>Simon Fraser University</h1>
          <p className={styles.uniMeta}>BSc. Computing Science</p>
          <p className={styles.uniMeta}>Burnaby, BC • 09/2023 - Ongoing</p>     
        </div>
      </div>
    </div>
  );
};

export default Education;
