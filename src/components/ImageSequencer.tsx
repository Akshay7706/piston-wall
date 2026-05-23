import { useState, useEffect, useRef } from 'react';

export default function ImageSequencer() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const frameCount = 192;
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const fps = 24; // 24 frames per second
  const interval = 1000 / fps;

  useEffect(() => {
    // Optional: Preload next few frames to prevent loading flashes
    const preloadFrames = (start: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const frameIndex = ((start + i - 1) % frameCount) + 1;
        const formattedFrame = String(frameIndex).padStart(4, '0');
        const img = new Image();
        img.src = `/image/langing%20video/${formattedFrame}.jpg`;
      }
    };

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }
      const elapsed = time - lastTimeRef.current;

      if (elapsed > interval) {
        setCurrentFrame((prev) => {
          const next = prev >= frameCount ? 1 : prev + 1;
          // Preload 5 frames ahead of the current frame
          preloadFrames(next, 5);
          return next;
        });
        lastTimeRef.current = time - (elapsed % interval);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const formattedFrame = String(currentFrame).padStart(4, '0');
  const imagePath = `/image/langing%20video/${formattedFrame}.jpg`;

  return (
    <img 
      src={imagePath} 
      alt="Car animation background" 
      className="hero-video" 
      style={{ 
        objectFit: 'cover', 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -2,
        opacity: 1,
        filter: 'grayscale(10%) contrast(105%) brightness(90%)'
      }}
    />
  );
}
