/* React hooks */
import { useState, useEffect, useRef } from "react";

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
    // If window is less than 1024px
    if (window.innerWidth <= 1024) {
      // make the sidebar false (closed)
      return false;
    }
    // check if pref exists in localStorage using the key "sidebarPref"
    const saved = localStorage.getItem("sidebarPref");
    // If key doesn't exist -> default to true (open)
    return saved !== null ? JSON.parse(saved) : true;
  });

  const handleClick = () => {
    // If pref was true, set it to false
    // If pres was false, set it to true
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = () => {
    console.log("handleNavClick was called!")

    if (window.innerWidth <= 1024) {
      console.log("hello world")
      setIsSidebarOpen(false);
    }
  }

  // sidebarRef to hold the sidebar DOM element
  const sidebarRef = useRef(null);

  // useEffect to check the space outside of the layout
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If width is <= 1024, then enable clicking outside of layout, to set sidebar to false (closed)
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth <= 1024
      ) {
        setIsSidebarOpen(false);
      }
    };
    // listen to mousedown events, perform handleClickOutside if so
    document.addEventListener("mousedown", handleClickOutside);
    // clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Use effect for saving & logging
  useEffect(() => {
    console.log(
      `isSidebarOpen is now: ${isSidebarOpen ? "Open" : "Collapsed"}`,
    );
    localStorage.setItem("sidebarPref", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div id="main">
      {/* Sidebar */}
      <div
        className={`${styles.column} ${!isSidebarOpen ? styles.minimizedColumn : ""}`}
        ref={sidebarRef}
      >
        {/* List */}
        <div className={styles.linkListWrapper}>
          {/* Header */}
          <div className={styles.linkListHeader}>
            <div className={styles.textLogo}>
              <img src="\logo.png" alt="website logo" className={styles.logo}/>
              <h1 className={styles.linkListTitle}>AWL</h1>
            </div>
            <button onClick={handleClick} className={styles.panelIconWrapper}>
              <PanelLeft size={20} className={styles.panelLeft} />
            </button>
          </div>
          {/* Links */}
          <aside>
            <HomeLink
              path="/home"
              img={homeImg}
              title="Home"
              onLinkClick={handleNavClick}
            ></HomeLink>
            <HomeLink
              path="/about"
              img={aboutImg}
              title="About"
              onLinkClick={handleNavClick}
            ></HomeLink>
            <HomeLink
              path="/proj"
              img={projImg}
              title="Projects"
              onLinkClick={handleNavClick}
            ></HomeLink>
            <HomeLink
              path="/blog"
              img={blogImg}
              title="Blog"
              onLinkClick={handleNavClick}
            ></HomeLink>
            <HomeLink
              path="/settings"
              isSetting={true}
              title="Settings"
              onLinkClick={handleNavClick}
            ></HomeLink>
          </aside>
        </div>
        {/* Music Component */}
        <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
          <MusicCard />
        </div>
      </div>
      <main id="content-display">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default NewFront;
