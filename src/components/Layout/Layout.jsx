/* React hooks */
import { useState, useEffect } from "react";

/* Third-party libraries */
import { Outlet } from "react-router-dom";

/* Components */
import HomeLink from "./HomeLink";
import SettingsLink from "./SettingsLink";
import WeatherTime from "./WeatherTime";
import MusicCard from "@/components/media/MusicCard";
import Controls from "./Controls";

/* Assets */
import homeImg from "@/assets/sidebar/rain.png";
import aboutImg from "@/assets/sidebar/together.png";
import projImg from "@/assets/sidebar/proud.png";
import blogImg from "@/assets/sidebar/beauty.png";

/* Icons */
import { PanelLeft } from "lucide-react";
import { Music } from "lucide-react";

/* Styles */
import styles from "./layout.module.css";

const NewFront = () => {
  // Instead of default false:
  // Check localStorage immediately when state is created
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (window.innerWidth < 1024) {
      return false;
    }

    const saved = localStorage.getItem("sidebarPref");
    // If key doesn't exist -> default to true (open)
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    console.log(`isSidebarOpen is initially set to ${isSidebarOpen}`);
  }, []);

  // Use effect for saving & logging
  useEffect(() => {
    console.log(
      `isSidebarOpen is now: ${isSidebarOpen ? "Open" : "Collapsed"}`,
    );
    localStorage.setItem("sidebarPref", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const handleClick = () => {
    // If it was true, NOW becomes -> false
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="main">
      {/* Sidebar */}
      <div className={isSidebarOpen ? styles.column : styles.minimizedColumn}>
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
            <HomeLink
              path="/settings"
              isSetting={true}
              title="Settings"
            ></HomeLink>
          </aside>
        </div>
        {/* Music Component */}
        {isSidebarOpen && <MusicCard />}
      </div>
      <main id="content-display">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default NewFront;
