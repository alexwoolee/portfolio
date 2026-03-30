// React hooks 
import { useRef } from "react"
// Third-party libraries 
import { ChevronLeft, ChevronRight } from 'lucide-react'
// Components  
import ImageWithSkeleton from "../shared/ImageWithSkeleton"
// Styles
import styles from './gallery.module.css'
// Data
import { galleryImages } from "./about-data"


const Gallery = () => {
  const galleryRef = useRef(null)

  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        top: 0,
        left: -260,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        top: 0,
        left: 260,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={styles.galleryWrapper}>
      <div className={`${styles.chevron} ${styles.chevronLeft}`} onClick={scrollLeft}>
        <ChevronLeft color="white" />
      </div>
      <div className={styles.galleryCtn} ref={galleryRef}>
        {galleryImages.map((image, i) => (    
          <ImageWithSkeleton key={i} image={image} customClassName={styles.galleryPic}/>
        ))}
      </div>
      <div className={`${styles.chevron} ${styles.chevronRight}`} onClick={scrollRight}>
        <ChevronRight color="white" />
      </div>
    </div>
  );
};

export default Gallery;