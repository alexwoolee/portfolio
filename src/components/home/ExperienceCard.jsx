/* Styles */
import styles from "./home.module.css"

const ExperienceCard = ({ img, title, period, company }) => {
  return (
    <div>
      <div className={styles.exp}>
        <img
          src={img}
          alt={`${company} logo`}
          className={styles.expLogo}
        />
        <div className={styles.expInfo}>
          <h1 className={`${styles.expTitle} title-lg`}>{company}</h1>
          <p className={styles.expMeta}>{title}</p>
          <p className={styles.expMeta}>{period}</p>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default ExperienceCard
