/* React hooks */
import { useState } from "react"

/* Third-party libraries */
import { Circle } from "lucide-react"
import { ArrowDown } from "lucide-react"

/* Components */
import ContactPopup from "./ContactPopup"

/* Styles */
import styles from './ui.module.css'

const ContactButton = () => {
  const [showPopup, setShowPopup] = useState(false)
  const handleClick = () => {
    setShowPopup(!showPopup)
  }

  return (
    <>
      <button className={styles.contactButtonWrapper} onClick={handleClick}>
        <Circle
          width={16}
          height={16}
          className={styles.circle}
          fill={"black"}
        ></Circle>
        <ArrowDown
          width={32}
          height={32}
          className={styles.arrowDown}
          fill={"black"}
          stroke={"white"}
        ></ArrowDown>
        <span>Contact</span>
      </button>
      {showPopup && <ContactPopup />}
    </>
  );
};

export default ContactButton