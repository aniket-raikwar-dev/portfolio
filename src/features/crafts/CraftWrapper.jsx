import { useEffect, useRef, useState } from "react";
import { CRAFT_DIMENSIONS } from "./craftsConfig";

/**
 * Wraps a craft component with consistent dimensions and background.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The craft component to render
 * @param {boolean} [props.scaled] - If true, scales the craft to fit a smaller container (for card preview)
 * @param {boolean} [props.fitViewport] - If true, scales to fit viewport (for modal) without scroll
 * @param {string} [props.className] - Additional class names
 */
const CraftWrapper = ({ children, scaled = false, fitViewport = false, className = "" }) => {
  const { width, height } = CRAFT_DIMENSIONS;
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!fitViewport) return;

    const updateScale = () => {
      const el = containerRef.current;
      const parent = el?.parentElement;
      let maxW = parent?.clientWidth ?? 0;
      let maxH = (parent?.clientHeight ?? 0) - 80;
      if (maxW <= 0 || maxH <= 0) {
        maxW = window.innerWidth * 0.9;
        maxH = window.innerHeight * 0.85 - 80;
      }
      const scaleX = maxW / width;
      const scaleY = maxH / height;
      setScale(Math.max(0.2, Math.min(1, scaleX, scaleY)));
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    const target = containerRef.current?.parentElement ?? document.body;
    ro.observe(target);

    return () => ro.disconnect();
  }, [fitViewport, width, height]);

  return (
    <div
      ref={fitViewport ? containerRef : undefined}
      className={`craft-wrapper ${scaled ? "craft-wrapper--scaled" : ""} ${fitViewport ? "craft-wrapper--fit-viewport" : ""} ${className}`.trim()}
      style={{
        width: scaled ? "100%" : width,
        height: scaled ? "100%" : height,
        minWidth: scaled ? 0 : width,
        minHeight: scaled ? 0 : height,
        ...(fitViewport && { transform: `scale(${scale})` }),
      }}
    >
      <div
        className="craft-wrapper__inner"
        style={{
          width,
          height,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CraftWrapper;
