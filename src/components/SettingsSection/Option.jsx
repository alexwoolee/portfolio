/* Third-party libraries */
import { motion } from "motion/react"

/* Components */
import ToggleSwitch from "./ToggleSwitch"
import styles from "./settings.module.css"

const Option = () => {
    return (
        <motion.div 
            className={styles.option}
            initial={{ opacity: 0, x: -2000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <img src="/icons/diamond-icon.png" alt="icon" className={styles.optionLogo} />
            <p className={styles.optionLabel}>Dark Mode</p>
            <ToggleSwitch />
        </motion.div>
    )
}

export default Option