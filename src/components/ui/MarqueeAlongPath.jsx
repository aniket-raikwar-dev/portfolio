import React, { useEffect, useRef, useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const MarqueeItem = ({
  child,
  itemIndex,
  totalItems,
  baseOffset,
  path,
  repeatIndex,
  easing,
  scaleRange,
  opacityRange,
  autoRotate,
}) => {
  const itemOffset = useTransform(baseOffset, (v) => {
    const position = (itemIndex * 100) / totalItems;
    const wrappedValue = wrap(0, 100, v + position);
    return `${easing ? easing(wrappedValue / 100) * 100 : wrappedValue}%`;
  });

  const currentOffset = useMotionValue(0);

  useEffect(() => {
    return itemOffset.on("change", (value) => {
      const match = value.match(/^([\d.]+)%$/);
      if (match?.[1]) currentOffset.set(parseFloat(match[1]));
    });
  }, [itemOffset, currentOffset]);

  const scale = useTransform(
    currentOffset,
    [0, 100],
    scaleRange || [1, 1]
  );
  const itemOpacity = useTransform(
    currentOffset,
    [0, 100],
    opacityRange || [1, 1]
  );
  const zIndex = useTransform(currentOffset, (v) => Math.round(v / 5));

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        offsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        offsetRotate: autoRotate ? "auto" : "0deg",
        willChange: "offset-distance",
        scale,
        opacity: itemOpacity,
        zIndex,
      }}
      aria-hidden={repeatIndex > 0}
    >
      {child}
    </motion.div>
  );
};

const MarqueeAlongPath = ({
  children,
  className = "",
  path,
  viewBox = "0 0 500 500",
  baseVelocity = 5,
  direction = "normal",
  easing,
  repeat = 3,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  responsive = false,
  style = {},
  speedMultiplierRef,
  scaleRange,
  opacityRange,
  autoRotate = false,
}) => {
  const containerRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const baseOffset = useMotionValue(0);
  const isHovered = useRef(false);
  const directionFactor = useRef(direction === "normal" ? 1 : -1);

  const hoverFactorValue = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactorValue, {
    damping: 50,
    stiffness: 400,
  });

  useEffect(() => {
    if (!responsive) return;
    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
    const originalWidth = vbWidth || 100;
    const originalHeight = vbHeight || 100;

    const updateScale = () => {
      const wrapper = containerRef.current;
      const marqueeContainer = marqueeContainerRef.current;
      if (!wrapper || !marqueeContainer) return;

      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;
      const scaleX = wrapperWidth / originalWidth;
      const scaleY = wrapperHeight / originalHeight;
      const s = Math.min(scaleX, scaleY);
      const scaledWidth = originalWidth * s;
      const scaledHeight = originalHeight * s;
      const offsetX = (wrapperWidth - scaledWidth) / 2;
      const offsetY = (wrapperHeight - scaledHeight) / 2;

      marqueeContainer.style.width = `${originalWidth}px`;
      marqueeContainer.style.height = `${originalHeight}px`;
      marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${s})`;
      marqueeContainer.style.transformOrigin = "top left";
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [responsive, viewBox]);

  const items = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => ({
        child,
        childIndex,
        repeatIndex,
        itemIndex: repeatIndex * childrenArray.length + childIndex,
        key: `${childIndex}-${repeatIndex}`,
      }))
    );
  }, [children, repeat]);

  useAnimationFrame((_, delta) => {
    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1);
    } else {
      hoverFactorValue.set(1);
    }

    const multiplier = speedMultiplierRef?.current ?? 1;
    const moveBy =
      directionFactor.current *
      baseVelocity *
      multiplier *
      (delta / 1000) *
      smoothHoverFactor.get();
    baseOffset.set(baseOffset.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", ...style }}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <div
        ref={marqueeContainerRef}
        style={{ position: "relative", contain: "layout style" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: "100%", height: "100%" }}
        >
          <path d={path} stroke="none" fill="none" />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <MarqueeItem
            key={key}
            child={child}
            itemIndex={itemIndex}
            totalItems={items.length}
            baseOffset={baseOffset}
            path={path}
            repeatIndex={repeatIndex}
            easing={easing}
            scaleRange={scaleRange}
            opacityRange={opacityRange}
            autoRotate={autoRotate}
          />
        ))}
      </div>
    </div>
  );
};

export default MarqueeAlongPath;
