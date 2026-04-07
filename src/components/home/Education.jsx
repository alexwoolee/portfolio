/* Assets */
import SFU from "@/assets/education/SFU.png"

/* Styles */
import styles from './home.module.css'

const Education = () => {
  return (
    <div className={styles.expCtn}>
      <div className={styles.exp}>
        <img src={SFU} className={styles.expLogo} alt="SFU Logo" />
        <div className={styles.expInfo}>
          <h1 className={`${styles.expTitle} title-lg`}>Simon Fraser University</h1>
          <p className={styles.expMeta}>BSc. Computing Science</p>
          <p className={styles.expMeta}>Burnaby, BC • 09/2023 - Ongoing</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
