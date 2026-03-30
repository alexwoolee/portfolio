import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef(new Audio('/audio/sophias-shop.mp3'))

    useEffect(() => {
        const audio = audioRef.current
        audio.loop = true
        audio.volume = 0.05

        function startAudio() {
            audio.play().catch(() => {})
            window.removeEventListener('click', startAudio) // Stops future triggers
        }

        window.addEventListener('click', startAudio)

        function handleVisibilityChange() { 
            if (document.visibilityState == "hidden") { 
                audio.pause()
            } else {
                audio.play().catch(() => {})
            }
        }

        // Event listener
        document.addEventListener('visibilitychange', handleVisibilityChange); 
        // Cleanup event listener when component unmounts
        return () => { 
            document.removeEventListener('visibilitychange', handleVisibilityChange) 
            window.removeEventListener('click', startAudio)
            audio.pause()
        } 
    }, []);
}
