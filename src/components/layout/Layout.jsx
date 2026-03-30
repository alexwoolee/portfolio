/* React hooks */
import { useState, useEffect, useRef } from "react";
/* Third-party libraries */
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
/* Components */
import HomeLink from "./HomeLink";
import MusicCard from "@/components/media/MusicCard";
/* Assets */
import homeImg from "@/assets/sidebar/rain.png";
import aboutImg from "@/assets/sidebar/together.png";
import projImg from "@/assets/sidebar/proud.png";
import blogImg from "@/assets/sidebar/beauty.png";
/* Icons */
import { PanelLeft, Music } from "lucide-react";
/* Styles */
import styles from "./layout.module.css";


// LAYER 1: The Orange "Border" (giant orange shape in the back)
const orangeVariants = {
  open: {
    d: [
      "M 0 0 L 300 0 C 395 128, 248 302, 326 482 C 392 650, 254 816, 340 1000 L 0 1000 Z",
      "M 0 0 L 300 0 C 418 142, 264 318, 338 500 C 404 666, 270 828, 340 1000 L 0 1000 Z",
      "M 0 0 L 300 0 C 395 128, 248 302, 326 482 C 392 650, 254 816, 340 1000 L 0 1000 Z",
    ],
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  },
  closed: {
    // Squeezes the orange curve down to just outside the 64px width of the minimized column
    d: [
      "M 0 0 L 104 0 C 148 168, 92 382, 124 592 C 146 780, 104 904, 120 1000 L 0 1000 Z",
      "M 0 0 L 104 0 C 162 184, 104 398, 132 602 C 154 792, 114 914, 120 1000 L 0 1000 Z",
      "M 0 0 L 104 0 C 148 168, 92 382, 124 592 C 146 780, 104 904, 120 1000 L 0 1000 Z",
    ],
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  },
  mobileOpen: { 
    d: []
  },
  mobileClosed: {
    d: []
  }
};

// LAYER 2: The White Background (layered on top, shifted left)
const whiteVariants = {
  open: {
    d: [
      "M 0 0 L 266 0 C 358 132, 218 300, 292 478 C 356 642, 226 806, 304 1000 L 0 1000 Z",
      "M 0 0 L 266 0 C 378 144, 232 312, 304 490 C 368 656, 242 818, 304 1000 L 0 1000 Z",
      "M 0 0 L 266 0 C 358 132, 218 300, 292 478 C 356 642, 226 806, 304 1000 L 0 1000 Z",
    ],
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  },
  closed: {
    // Squeezes the white curve inside the orange one, ensuring it is always at least 65px wide to cover the icons
    d: [
      "M 0 0 L 86 0 C 124 170, 74 384, 104 594 C 122 782, 84 904, 96 1000 L 0 1000 Z",
      "M 0 0 L 86 0 C 136 182, 86 398, 112 604 C 128 792, 94 916, 96 1000 L 0 1000 Z",
      "M 0 0 L 86 0 C 124 170, 74 384, 104 594 C 122 782, 84 904, 96 1000 L 0 1000 Z",
    ],
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
  },
  mobileOpen: { 
    d: [
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  mobileClosed: {
    d: [
      "M 0 0 L 0 0 Z",
      "",
      "",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  }
};

const NewFront = () => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const isPlainBackgroundPage =
    pathname.startsWith("/settings") || pathname.startsWith("/interface");

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (isMobile) {
      return false;
    }
    const saved = localStorage.getItem("sidebarPref");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const sidebarRef = useRef(null);

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobile
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)

      if (isMobile) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarPref", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div
      id="main"
      style={{ display: "flex", width: "100%" }}
      className={`${styles.layoutRoot} ${
        isPlainBackgroundPage ? styles.layoutRootPlain : ""
      }`}
    >
      {/* Unified Master Filter to apply continuous noise across entire sidebar perfectly */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <filter id="sidebarMasterNoise" x="-10%" y="-10%" width="150%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="desat" />
          <feComponentTransfer in="desat" result="alphaNoise">
            <feFuncA type="linear" slope="0.6" />
          </feComponentTransfer>
          {/* Clip noise precisely to the rendered pixels of the sidebar (waves + active link + text) */}
          <feComposite operator="in" in="alphaNoise" in2="SourceAlpha" result="clippedNoise" />
          <feBlend mode="overlay" in="clippedNoise" in2="SourceGraphic" />
        </filter>
      </svg>

      {/* Unified Sidebar */}
                {/* backgroundColor: "#38c5c4", */}

      <div
        className={`${styles.column} ${!isSidebarOpen ? styles.minimizedColumn : ""}`}
        ref={sidebarRef}
        style={{
          position: isMobile ? "relative" : "absolute",
          top: 0,
          left: 0,
          height: isMobile ? "" : "100vh",
          overflow: "visible", 
          borderRight: "none",
          zIndex: 100, 
          WebkitFilter: "drop-shadow(12px 0 18px rgba(4, 24, 40, 0.22)) url(#sidebarMasterNoise)",
          filter: "drop-shadow(12px 0 18px rgba(4, 24, 40, 0.22)) url(#sidebarMasterNoise)"
        }}
      >
        {/* BACKGROUND LAYER: The Magic SVG */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300px", // Remains fixed; the path coordinates do the shrinking
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
          className="magicSvg"
        >
          { !isMobile &&
          <svg
            style={{
              width: "100%",
              height: "100%",
              overflow: "visible", 
            }}
            viewBox="0 0 350 1000"
            preserveAspectRatio="none"
          >
            {/* The animate prop now dynamically switches based on state */}
            <motion.path 
              variants={orangeVariants} 
              animate={isSidebarOpen ? "open" : "closed"} 
              fill="#0e5f87"
            />
            <motion.path 
              variants={whiteVariants} 
              animate={isSidebarOpen ? "open" : "closed"} 
              fill="#7ecbe8"
            />
          </svg>}
        </div>

        {/* FOREGROUND LAYER */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className={styles.linkListWrapper}>
            {/* Header / Logo */}
            <div className={styles.linkListHeader}>
              <div className={styles.textLogo}>
                <img src="\logo.png" alt="website logo" className={styles.logo} />
                <h1 className={styles.linkListTitle}>AWL</h1>
              </div>
              <button onClick={handleClick} className={styles.panelIconWrapper}>
                <PanelLeft size={20} className={styles.panelLeft} />
              </button>
            </div>

            {/* Links Section */}
            <div 
              style={{ 
                padding: isSidebarOpen ? "50px 40px 40px 40px" : "50px 0.5rem 0.5rem 0.5rem", 
                textAlign: isSidebarOpen ? "right" : "center"
              }}
            >
              <aside>
                <HomeLink path="/home" img={homeImg} title="Home" onLinkClick={handleNavClick} waveReach={isSidebarOpen ? "20px" : "24px"} />
                <HomeLink path="/proj" img={projImg} title="Projects" onLinkClick={handleNavClick} waveReach={isSidebarOpen ? "14px" : "25px"} />
                <HomeLink path="/about" img={aboutImg} title="About" onLinkClick={handleNavClick} waveReach={isSidebarOpen ? "10px" : "25px"} />
                <HomeLink path="/blog" img={blogImg} title="Blog" onLinkClick={handleNavClick} waveReach={isSidebarOpen ? "4px" : "22px"} />
                <HomeLink path="/interface" img={projImg} title="Interface" onLinkClick={handleNavClick} waveReach={isSidebarOpen ? "8px" : "21px"} />
                <HomeLink path="/settings" isSetting={true} title="Settings" onLinkClick={handleNavClick} waveReach={isSidebarOpen ? "16px" : "22px"} />
              </aside>
            </div>
          </div>

          {/* Music Component - Temporarily Hidden per request */}
          {/* <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
            <MusicCard />
          </div> 
          */}
        </div>
      </div>

      {/* Main Content Area */}
      <main
        id="content-display"
        className={`${styles.mainContent} ${
          isSidebarOpen ? styles.mainContentOpen : styles.mainContentMinimized
        } ${isPlainBackgroundPage ? styles.mainContentNoOffset : ""}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default NewFront;