import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SCROLL_THRESHOLD = 1000;
const PHASE2_SCROLL = 1000; // Extra scroll for phase 2 (text split + center image)
const TOTAL_SCROLL = SCROLL_THRESHOLD + PHASE2_SCROLL;
const LERP_SPEED = 0.12;
const COMPLETION_THRESHOLD = 0.98;

const CENTER_IMAGE =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop";

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
  const byRealRef = useRef(null);
  const peopleRef = useRef(null);
  const centerImageRef = useRef(null);
  const scrollAccumRef = useRef(0);
  const displayProgressRef = useRef(0);
  const hasTriggeredRef = useRef(false);
  const isActiveRef = useRef(false);
  const rafRef = useRef(null);
  const initialDeltasRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isActiveRef.current) return;

      // Scrolling up at 0 progress - allow going back to hero
      if (e.deltaY < 0 && scrollAccumRef.current <= 0) {
        isActiveRef.current = false;
        hasTriggeredRef.current = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        displayProgressRef.current = 0;
        applyTransforms(0);
        document.body.style.overflow = "";
        document.removeEventListener("wheel", handleWheel, { capture: true });
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        scrollAccumRef.current = Math.min(
          TOTAL_SCROLL,
          scrollAccumRef.current + e.deltaY
        );
      } else {
        scrollAccumRef.current = Math.max(0, scrollAccumRef.current + e.deltaY);
      }

      const targetProgress = Math.min(
        Math.max(scrollAccumRef.current / SCROLL_THRESHOLD, 0),
        2
      );

      // Complete when reaching end of phase 2
      if (targetProgress >= 1.98 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        isActiveRef.current = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        document.body.style.overflow = "";
        document.removeEventListener("wheel", handleWheel, { capture: true });
        displayProgressRef.current = 2;
        applyTransforms(2);
        setTimeout(() => onComplete?.(), 350);
      }
    };

    const applyTransforms = (progress) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      if (!initialDeltasRef.current) {
        initialDeltasRef.current = scatteredRefs.current.map((el) => {
          if (!el) return { dirX: 1, dirY: 0 };
          const rect = el.getBoundingClientRect();
          const imgCenterX = rect.left + rect.width / 2;
          const imgCenterY = rect.top + rect.height / 2;
          const dx = imgCenterX - centerX;
          const dy = imgCenterY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return {
            dirX: dx / dist,
            dirY: dy / dist,
          };
        });
      }

      const phase1Progress = Math.min(progress, 1);
      const phase2Progress = Math.max(0, progress - 1);

      const pushDistance =
        Math.max(window.innerWidth, window.innerHeight) * 0.8 * phase1Progress;
      const scale = 1 + phase1Progress * 2.5;

      scatteredRefs.current.forEach((el, i) => {
        if (!el) return;
        const { dirX, dirY } = initialDeltasRef.current[i] || {
          dirX: 1,
          dirY: 0,
        };

        const moveX = dirX * pushDistance;
        const moveY = dirY * pushDistance;

        gsap.set(el, { scale, x: moveX, y: moveY });
      });

      if (mainTextRef.current) {
        gsap.set(mainTextRef.current, {
          opacity: Math.max(0, 1 - phase1Progress),
          y: 0,
        });
      }

      const spreadAmount = 100;
      if (byRealRef.current) {
        gsap.set(byRealRef.current, {
          opacity: 1,
          x: -phase2Progress * spreadAmount,
        });
      }
      if (peopleRef.current) {
        gsap.set(peopleRef.current, {
          opacity: 1,
          x: phase2Progress * spreadAmount,
        });
      }
      if (centerImageRef.current) {
        const baseW = 240;
        const baseH = 144;
        gsap.set(centerImageRef.current, {
          opacity: phase2Progress > 0 ? Math.min(1, phase2Progress * 1.2) : 0,
          width: baseW * phase2Progress,
          height: baseH * phase2Progress,
        });
      }
    };

    const animate = () => {
      if (!isActiveRef.current) return;

      const targetProgress = Math.min(
        Math.max(scrollAccumRef.current / SCROLL_THRESHOLD, 0),
        2
      );
      const current = displayProgressRef.current;
      const diff = targetProgress - current;
      const next = Math.abs(diff) < 0.002 ? targetProgress : current + diff * LERP_SPEED;

      displayProgressRef.current = next;
      applyTransforms(next);

      rafRef.current = requestAnimationFrame(animate);
    };

    const activate = (isReEntry = false) => {
      isActiveRef.current = true;
      if (!isReEntry) initialDeltasRef.current = null;
      document.body.style.overflow = "hidden";
      document.addEventListener("wheel", handleWheel, { passive: false, capture: true });

      if (isReEntry) {
        scrollAccumRef.current = TOTAL_SCROLL;
        displayProgressRef.current = 2;
        applyTransforms(2);
      } else {
        displayProgressRef.current = 0;
        scrollAccumRef.current = 0;
        applyTransforms(0);
      }

      rafRef.current = requestAnimationFrame(animate);

      if (!isReEntry) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetScroll = scrollTop + rect.top - (window.innerHeight - rect.height) / 2;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !containerRef.current) return;

        const isReEntry = hasTriggeredRef.current;

        if (entry.intersectionRatio >= 0.8 && !isActiveRef.current) {
          if (isReEntry) {
            activate(true);
          } else {
            setTimeout(() => activate(false), 500);
          }
        }
      },
      { threshold: [0, 0.5, 0.8, 1] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("wheel", handleWheel, { capture: true });
      document.body.style.overflow = "";
    };
  }, [onComplete]);

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
          <div className="immersive-zoom__phrase-row">
            <span ref={byRealRef} className="immersive-zoom__phrase-left">
              by real
            </span>
            <div ref={centerImageRef} className="immersive-zoom__center-image">
              <img src={CENTER_IMAGE} alt="" />
            </div>
            <span ref={peopleRef} className="immersive-zoom__phrase-right">
              {" "}people
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveZoom;
