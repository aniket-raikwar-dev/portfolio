import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const GRID_ROWS = 4;
const GRID_COLS = 4;
const BOX_COLOR = "#a3e635";

const RouteTransitionOverlay = ({ onComplete }) => {
  const gridRef = useRef(null);
  const cellsRef = useRef([]);

  useEffect(() => {
    const cells = cellsRef.current.filter(Boolean);
    if (cells.length === 0) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // Phase 1: Grid fill-in (random jitter)
    tl.fromTo(
      cells,
      {
        scale: 0,
        opacity: 0,
        backgroundColor: "transparent",
      },
      {
        scale: 1,
        opacity: 1,
        backgroundColor: BOX_COLOR,
        duration: 0.25,
        stagger: {
          each: 0.03,
          from: "random",
          amount: 0.4,
        },
        ease: "power2.out",
      }
    );

    // Phase 2: Green layout hold
    tl.to({}, { duration: 0.15 });

    // Phase 3: Fade out (random jitter)
    tl.to(cells, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      stagger: {
        each: 0.03,
        from: "random",
        amount: 0.4,
      },
      ease: "power2.in",
    });
  }, [onComplete]);

  return (
    <div className="route-transition-overlay" ref={gridRef}>
      <div className="route-transition-grid">
        {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => (
          <div
            key={i}
            className="route-transition-cell"
            ref={(el) => {
              cellsRef.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteTransitionOverlay;
