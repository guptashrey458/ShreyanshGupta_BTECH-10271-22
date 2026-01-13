import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface LandingScrollAnimationProps {
  frameCount?: number;
}

export default function LandingScrollAnimation({ frameCount = 25 }: LandingScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll progress (0 to 1) attached to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Helper to load a single image
    const loadImage = (index: number) => {
      const img = new Image();
      // Frames are stored as /frames/ezgif-frame-XXX.jpg (1-indexed based on file listing)
      // Files are ezgif-frame-001.jpg to ezgif-frame-025.jpg
      const paddedIndex = (index + 1).toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
      
      img.onload = () => {
        if (isMounted) {
            loadedImages[index] = img;
            loadedCount++;
            if (loadedCount === frameCount) {
              setImages(loadedImages);
              setIsLoading(false);
            }
        }
      };
      
       img.onerror = () => {
             console.warn(`Failed to load frame ezgif-frame-${paddedIndex}.jpg`);
             loadedCount++;
             if (loadedCount === frameCount) {
                setImages(loadedImages);
                setIsLoading(false);
             }
        };
    };

    for (let i = 0; i < frameCount; i++) {
      loadImage(i);
    }

    return () => {
      isMounted = false;
    };
  }, [frameCount]);

  // Draw to canvas
  useEffect(() => {
    const render = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = images[Math.round(index)];
      if (!img) return;

      // Handle scaling (contain)
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Use 'contain' logic instead of cover if we want to see the whole object, 
      // but 'cover' usually looks better for full-screen backgrounds.
      // Let's stick to 'contain' for this specific task visualization so cards aren't cut off.
      // Re-calculating for 'contain':
      const scaleContain = Math.min(canvas.width / img.width, canvas.height / img.height);
      const xContain = (canvas.width - img.width * scaleContain) / 2;
      const yContain = (canvas.height - img.height * scaleContain) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#050505'; // Match background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, xContain, yContain, img.width * scaleContain, img.height * scaleContain);
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });
    
    // Initial render
    if (!isLoading && images.length > 0) {
        render(0);
    }

    return () => unsubscribe();
  }, [frameIndex, images, isLoading]);

  return (
    <div ref={containerRef} className="h-[400vh] w-full relative bg-cinematic-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cinematic-bg z-50">
            <div className="h-12 w-12 rounded-full border-4 border-cyan-glow border-t-transparent animate-spin"></div>
          </div>
        )}
        <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
        />
      </div>
      
      {/* Scroll Logic is handled, but we define the height here to drive it */}
    </div>
  );
}
