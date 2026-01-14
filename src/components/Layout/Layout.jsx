/* Third-party imports / Framework imports */
import { Outlet } from "react-router-dom";
import { useState } from "react";
/* Components */
import HomeLink from "./HomeLink";
import SettingsLink from "./SettingsLink";
import WeatherTime from "./WeatherTime";
import MusicCard from "../media/MusicCard";
import Controls from "./Controls";
/* Sidebar assets */
import homeImg from "../../assets/sidebar/rain.png";
import aboutImg from "../../assets/sidebar/together.png";
import projImg from "../../assets/sidebar/proud.png";
import blogImg from "../../assets/sidebar/beauty.png";
/* Styles */
import styles from "./layout.module.css";
// Icons
import { PanelLeft } from "lucide-react";
import { Music } from "lucide-react";

const NewFront = () => {
  const [minimized, setMinimized] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleClick = () => {
    setMinimized(!minimized);
    console.log(`Minimized is now set to ${minimized}...`);
  };

  const handleSettingsOpen = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <div id="main">
      {/* Sidebar */}
      <div
        className={minimized === false ? styles.column : styles.minimizedColumn}
      >
        {/* List */}
        <div className={styles.linkListWrapper}>
          {/* Header */}
          <div className={styles.linkListHeader}>
            <div className="flex flex-row items-center gap-3">
              <img src="\logo.png" alt="logo" className="w-8 h-8" />
              <h1 className={styles.linkListTitle}>AWL</h1>
            </div>
            <button onClick={handleClick} className={styles.iconWrapper}>
              <PanelLeft size={20} className={styles.panelLeft} />
            </button>
          </div>
          {/* Links */}
          <aside>
            <HomeLink path="/home" img={homeImg} title="Home"></HomeLink>
            <HomeLink path="/about" img={aboutImg} title="About"></HomeLink>
            <HomeLink path="/proj" img={projImg} title="Projects"></HomeLink>
            <HomeLink path="/blog" img={blogImg} title="Blog"></HomeLink>
            <SettingsLink
              isOpen={isSettingsOpen}
              onClick={handleSettingsOpen}
            ></SettingsLink>
          </aside>
        </div>
        {/* Music Component */}
        { minimized === true ? "" : <MusicCard /> }
      </div>
      <main id="content-display">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default NewFront;
