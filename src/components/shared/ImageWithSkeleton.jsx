import { useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ImageWithSkeleton = ({ image, customClassName }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <>
            { !loaded && <Skeleton className={customClassName} /> } 
            <img 
                src={image.src} 
                alt={image.alt} 
                className={customClassName} 
                onLoad = {() =>  setLoaded(true)}
                style={{ display: loaded ? "block" : "none" }}
            /> 
        </>
    )
}

export default ImageWithSkeleton;