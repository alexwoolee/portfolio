import { useRef, useEffect } from "react";
import styles from "./blog.module.css";

const LiquidWavyStripe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Configuration for wavy stripes
    const numStripes = 6;
    const baseSpeed = 0.02;
    const amplitude = 60;
    const frequency = 0.01;
    let time = 0;

    const stripes = [];
    for (let i = 0; i < numStripes; i++) {
      stripes.push({
        y: (window.innerHeight / numStripes) * i,
        speed: baseSpeed * (0.5 + Math.random() * 0.5),
        phase: Math.random() * Math.PI * 2,
        amplitude: amplitude * (0.4 + Math.random() * 0.3),
        frequency: frequency * (0.8 + Math.random() * 0.4),
        color: `rgba(${Math.floor(255 * (0.3 + Math.random() * 0.2))}, ${Math.floor(255 * (0.4 + Math.random() * 0.2))}, ${Math.floor(255 * (0.5 + Math.random() * 0.3))}, 0.3)`,
      });
    }

    const handleResize = () => {
      resizeCanvas();
      // Recalculate stripe positions
      stripes.forEach((stripe, i) => {
        stripe.y = (window.innerHeight / numStripes) * i;
      });
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      stripes.forEach((stripe, index) => {
        ctx.beginPath();
        ctx.moveTo(0, stripe.y);

        // Draw wavy path using sine waves
        for (let x = 0; x <= window.innerWidth; x += 2) {
          const y = stripe.y + 
            Math.sin(x * stripe.frequency + time * stripe.speed + stripe.phase) * stripe.amplitude +
            Math.sin(x * stripe.frequency * 2 + time * stripe.speed * 1.5 + stripe.phase) * (stripe.amplitude * 0.3);
          ctx.lineTo(x, y);
        }

        // Fill the area between this stripe and the next one
        if (index < stripes.length - 1) {
          const nextStripe = stripes[index + 1];
          for (let x = window.innerWidth; x >= 0; x -= 2) {
            const y = nextStripe.y + 
              Math.sin(x * nextStripe.frequency + time * nextStripe.speed + nextStripe.phase) * nextStripe.amplitude +
              Math.sin(x * nextStripe.frequency * 2 + time * nextStripe.speed * 1.5 + nextStripe.phase) * (nextStripe.amplitude * 0.3);
            ctx.lineTo(x, y);
          }
        } else {
          // Last stripe - close to bottom of screen
          ctx.lineTo(window.innerWidth, window.innerHeight);
          ctx.lineTo(0, window.innerHeight);
        }

        ctx.closePath();
        ctx.fillStyle = stripe.color;
        ctx.fill();
      });

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="seaweedCanvas"
      className={styles.liquidBackground}
    />
  );
};

export default LiquidWavyStripe;

