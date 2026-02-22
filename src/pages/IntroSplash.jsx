import React, { forwardRef, useEffect, useRef, useState } from "react";
import MarqueeAlongPath from "../components/ui/MarqueeAlongPath";

const generateSpiralPath = (turns = 3.5, cx = 250, cy = 250, spacing = 11.5) => {
  const points = [];
  const numPoints = Math.floor(turns * 200);
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * turns * 2 * Math.PI;
    const radius = spacing * angle;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
};

const spiralPath = generateSpiralPath();

const SCROLL_THRESHOLD = 800;

const images = [
  "https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg",
  "https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg",
  "https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg",
  "https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg",
  "https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg",
  "https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg",
  "https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg",
  "https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg",
  "https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg",
  "https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg",
  "https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg",
  "https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg",
  "https://cdn.cosmos.so/cd346bce-f415-4ea7-8060-99c5f7c1741a?format=jpeg",
  "https://picsum.photos/seed/port1/200/200",
  "https://picsum.photos/seed/port2/200/200",
  "https://picsum.photos/seed/port3/200/200",
  "https://picsum.photos/seed/port4/200/200",
  "https://picsum.photos/seed/port5/200/200",
];

const IntroSplash = forwardRef(({ onScrollComplete }, ref) => {
  const speedMultiplierRef = useRef(1);
  const scrollAccumRef = useRef(0);
  const hasTriggeredRef = useRef(false);
  const decayRafRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = ref?.current;
    if (!container) return;

    const decayLoop = () => {
      speedMultiplierRef.current = Math.max(
        1,
        speedMultiplierRef.current * 0.95
      );
      decayRafRef.current = requestAnimationFrame(decayLoop);
    };
    decayRafRef.current = requestAnimationFrame(decayLoop);

    const handleWheel = (e) => {
      e.preventDefault();
      if (hasTriggeredRef.current) return;

      const absDelta = Math.abs(e.deltaY);
      speedMultiplierRef.current = Math.min(
        speedMultiplierRef.current + absDelta * 0.03,
        10
      );

      if (e.deltaY > 0) {
        scrollAccumRef.current += e.deltaY;
        const progress = Math.min(
          scrollAccumRef.current / SCROLL_THRESHOLD,
          1
        );
        setScrollProgress(progress);

        if (progress >= 1) {
          hasTriggeredRef.current = true;
          onScrollComplete?.();
        }
      }
    };

    const touchStartY = { current: 0 };
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (hasTriggeredRef.current) return;

      const currentY = e.touches[0].clientY;
      const delta = touchStartY.current - currentY;
      touchStartY.current = currentY;

      speedMultiplierRef.current = Math.min(
        speedMultiplierRef.current + Math.abs(delta) * 0.05,
        10
      );

      if (delta > 0) {
        scrollAccumRef.current += delta;
        const progress = Math.min(
          scrollAccumRef.current / SCROLL_THRESHOLD,
          1
        );
        setScrollProgress(progress);

        if (progress >= 1) {
          hasTriggeredRef.current = true;
          onScrollComplete?.();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      if (decayRafRef.current) cancelAnimationFrame(decayRafRef.current);
    };
  }, [ref, onScrollComplete]);

  return (
    <div ref={ref} className="intro-container">
      <div className="intro-orbit-wrapper">
        <div className="intro-center-content">
          <span className="intro-subtitle">Frontend Engineer</span>
          <h1 className="intro-center-text">Portfolio</h1>
        </div>
        <MarqueeAlongPath
          path={spiralPath}
          viewBox="0 0 500 500"
          baseVelocity={2}
          repeat={2}
          responsive
          speedMultiplierRef={speedMultiplierRef}
          scaleRange={[0.15, 1.2]}
          opacityRange={[0, 1.5]}
          autoRotate
          className="intro-orbit"
        >
          {images.map((src, i) => (
            <div key={i} className="orbit-box">
              <img src={src} alt="" draggable={false} />
            </div>
          ))}
        </MarqueeAlongPath>
      </div>

      <div
        className="scroll-indicator"
        style={{ opacity: 1 - scrollProgress }}
      >
        <span>scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>

      <div className="intro-progress-bar">
        <div
          className="intro-progress-fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
});

export default IntroSplash;
