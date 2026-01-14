/* React hooks */
import { useState } from "react"

/* Components */
import SocialRow from "./SocialRow"
import Mail from "@/components/icons/actions/Mail"

/* Assets */
import GitHub from "@/assets/icons/github.svg"
import LinkedIn from "@/assets/icons/linkedin.png"
import Discord from "@/assets/icons/discord.svg"
import TikTok from "@/assets/icons/tiktok.svg"

/* Styles */
import styles from './ui.module.css'

const ContactPopup = () => {
  const [justCopied, setJustCopied] = useState("")
  const email = import.meta.env.VITE_EMAIL
  const linkedin = import.meta.env.VITE_LINKEDIN

  return (
    <div className={`${styles.popupWrapper} inline z-10`}>
      <SocialRow content={email} icon={Mail} />
      {/* <SocialRow content={justCopied} icon={Instagram} /> */}
      {/* <SocialRow content={justCopied} icon={X}/> */}
      <SocialRow content={linkedin} icon={LinkedIn} />
      <div className="flex flex-row justify-center items-center gap-4">
        <img src={GitHub} alt="github" className="w-8 h-8 bg-[#FFFFFF] p-1" />
        <img src={Discord} alt="discord" className="w-8 h-8 bg-[#FFFFFF]"/>
        <img src={TikTok} alt="tiktok" className="w-8 h-8 bg-[#FFFFFF]" />
      </div>
    </div>
  );
};

export default ContactPopup