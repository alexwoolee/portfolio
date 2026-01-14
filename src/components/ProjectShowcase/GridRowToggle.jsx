/* Third-party libraries */
import { Rows3, Grid2x2 } from "lucide-react"

/* Styles */
import styles from './projects.module.css'

const GridRowToggle = ({ view, onToggle}) => {
  return (
    <div className={styles.gridRowToggle}>
      <button className={`${styles.gridToggle} ${view === 'grid' ? styles.activeToggle : ''}`} onClick={() => onToggle('grid')} >
        <Grid2x2 width={20} height={20}/>
      </button>
      <button className={`${styles.rowToggle} ${view === 'row' ? styles.activeToggle : ''}`} onClick={() => onToggle('row')}>
        <Rows3 width={20} height={20}/>
      </button>
    </div>
  );
};

export default GridRowToggle