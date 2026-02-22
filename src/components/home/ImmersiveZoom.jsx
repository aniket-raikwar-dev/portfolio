import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const SCROLL_THRESHOLD = 1200;

// Images of people WITH objects/doing activities
const IMAGES = [
  "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&h=400&fit=crop", // Person with VR headset
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", // Woman coding on laptop
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop", // Person using 3D printer
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop", // Designer at work
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=400&fit=crop", // Person with VR glasses
  "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=400&h=400&fit=crop", // Person with robot
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop", // Person wearing VR
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop", // People collaborating
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop", // Team working
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop", // Person with drone
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop", // Person on laptop
];

// Original scattered positions with slight bottom adjustments
const SCATTERED_POSITIONS = [
  { x: "5%", y: "8%", size: 150 },      // top-left
  { x: "23%", y: "5%", size: 100 },     // top
  { x: "38%", y: "1%", size: 180 },     // top-center
  { x: "62%", y: "4%", size: 120 },     // top-right
  { x: "82%", y: "6%", size: 110 },     // far top-right
  { x: "21%", y: "28%", size: 90 },     // left-middle
  { x: "68%", y: "18%", size: 160 },    // right-middle
  { x: "85%", y: "38%", size: 100 },    // right
  { x: "10%", y: "65%", size: 130 },    // bottom-left (adjusted)
  { x: "35%", y: "72%", size: 120 },    // bottom-center (adjusted)
  { x: "70%", y: "68%", size: 140 },    // bottom-right (adjusted)
];

const ImmersiveZoom = ({ onComplete }) => {
  const containerRef = useRef(null);
  const scatteredRefs = useRef([]);
  const mainTextRef = useRef(null);
  const subTextRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollAccumRef = useRef(0);
  const speedMultiplierRef = useRef(1);
  const hasTriggeredRef = useRef(false);
  const decayRafRef = useRef(null);
  const isActiveRef = useRef(false);

  useEffect(() => {
    // Decay loop for speed multiplier
    const decayLoop = () => {
      speedMultiplierRef.current = Math.max(1, speedMultiplierRef.current * 0.95);
      decayRafRef.current = requestAnimationFrame(decayLoop);
    };

    const handleWheel = (e) => {
      if (!isActiveRef.current) return;

      const absDelta = Math.abs(e.deltaY);
      speedMultiplierRef.current = Math.min(
        speedMultiplierRef.current + absDelta * 0.03,
        10
      );

      // Scrolling up at 0 progress - allow going back to hero
      if (e.deltaY < 0 && scrollAccumRef.current <= 0) {
        isActiveRef.current = false;
        document.body.style.overflow = "";
        document.removeEventListener("wheel", handleWheel, { capture: true });
        if (decayRafRef.current) cancelAnimationFrame(decayRafRef.current);
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Handle both scroll directions
      if (e.deltaY > 0) {
        // Scrolling down
        scrollAccumRef.current += e.deltaY;
      } else {
        // Scrolling up
        scrollAccumRef.current = Math.max(0, scrollAccumRef.current + e.deltaY);
      }

      const progress = Math.min(Math.max(scrollAccumRef.current / SCROLL_THRESHOLD, 0), 1);
      setScrollProgress(progress);

      // Complete when reaching 100%
      if (progress >= 1 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        document.body.style.overflow = "";
        document.removeEventListener("wheel", handleWheel, { capture: true });
        if (decayRafRef.current) cancelAnimationFrame(decayRafRef.current);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !isActiveRef.current) {
          // Scroll to center the section
          const rect = containerRef.current.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetScroll = scrollTop + rect.top - (window.innerHeight - rect.height) / 2;
          
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });

          setTimeout(() => {
            isActiveRef.current = true;
            document.body.style.overflow = "hidden";
            decayRafRef.current = requestAnimationFrame(decayLoop);
            document.addEventListener("wheel", handleWheel, { passive: false, capture: true });
          }, 500);
        }
      },
      { threshold: [0, 0.5, 0.8, 1] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (decayRafRef.current) cancelAnimationFrame(decayRafRef.current);
      document.removeEventListener("wheel", handleWheel, { capture: true });
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Apply animations based on scroll progress
  useEffect(() => {
    // Images zoom out and move outward from center (go outside viewport)
    scatteredRefs.current.forEach((el, i) => {
      if (!el) return;
      
      const pos = SCATTERED_POSITIONS[i];
      const rect = el.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;
      
      // Calculate direction from center
      const deltaX = imgCenterX - centerX;
      const deltaY = imgCenterY - centerY;
      
      // Scale up dramatically and push outward
      const scale = 1 + scrollProgress * 6;
      const moveX = deltaX * scrollProgress * 2;
      const moveY = deltaY * scrollProgress * 2;
      
      gsap.to(el, {
        scale,
        x: moveX,
        y: moveY,
        duration: 0.1,
        ease: "none",
      });
    });

    // Main text fades out
    if (mainTextRef.current) {
      gsap.to(mainTextRef.current, {
        opacity: 1 - scrollProgress * 1.5,
        y: -scrollProgress * 30,
        duration: 0.1,
        ease: "none",
      });
    }

    // Sub text stays visible
    if (subTextRef.current) {
      gsap.to(subTextRef.current, {
        scale: 1 + scrollProgress * 0.1,
        duration: 0.1,
        ease: "none",
      });
    }
  }, [scrollProgress]);

  return (
    <section ref={containerRef} className="immersive-zoom">
      <div className="immersive-zoom__content">
        {/* Scattered images */}
        {SCATTERED_POSITIONS.map((pos, i) => (
          <div
            key={i}
            ref={(el) => (scatteredRefs.current[i] = el)}
            className="immersive-zoom__scattered"
            style={{
              left: pos.x,
              top: pos.y,
              width: pos.size,
              height: pos.size,
            }}
          >
            <img src={IMAGES[i]} alt="" />
          </div>
        ))}

        {/* Center text */}
        <div className="immersive-zoom__text">
          <h2 ref={mainTextRef} className="immersive-zoom__text-main">
            Real Recommendations
          </h2>
          <p ref={subTextRef} className="immersive-zoom__text-sub">
            by real people
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveZoom;
