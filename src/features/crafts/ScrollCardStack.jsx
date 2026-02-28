import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Img1 from "@/assets/images/carousel/img1.jpeg";
import Img2 from "@/assets/images/carousel/img2.jpeg";
import Img3 from "@/assets/images/carousel/img3.jpeg";
import Img4 from "@/assets/images/carousel/img4.jpeg";
import Img5 from "@/assets/images/carousel/img5.jpeg";
import Img6 from "@/assets/images/carousel/img6.jpeg";
import Img7 from "@/assets/images/carousel/img7.jpeg";
import Img8 from "@/assets/images/carousel/img8.jpeg";
import Img9 from "@/assets/images/carousel/img9.jpeg";

const CARDS = [
  { id: 1, image: Img1, label: "Image Carousel" },
  { id: 2, image: Img2, label: "Pixel Grid" },
  { id: 3, image: Img3, label: "Checkout Flow" },
  { id: 4, image: Img4, label: "Lightship Cards" },
];

const STATIC_CARDS = [
  { id: 5, image: Img5, label: "Rotatable Images" },
  { id: 6, image: Img6, label: "Typography" },
  { id: 7, image: Img7, label: "Multi Filter" },
  { id: 8, image: Img8, label: "Checkout Flow" },
  { id: 9, image: Img9, label: "Auto Scroll" },
  { id: 10, image: Img5, label: "Sidebar" },
];

// Smooth easing: ease-out cubic for natural deceleration at end
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Grid: 2x2. All 4 cards start stacked at center (same big square), then split to corners.
// endScale 0.82 = smaller cards; positions relative to parent for responsive layout.
const CARD_CONFIGS = [
  { endX: -0.5, endY: -0.5, startScale: 2, startZ: 4, coverThreshold: 0 },
  { endX: 0.5, endY: -0.5, startScale: 2, startZ: 1, coverThreshold: 0.35 },
  { endX: -0.5, endY: 0.5, startScale: 2, startZ: 1, coverThreshold: 0.45 },
  { endX: 0.5, endY: 0.5, startScale: 2, startZ: 1, coverThreshold: 0.55 },
];

// Gap compensation: scale cards up during animation so they overlap (no gap). At progress=1, gap appears.
const GAP_SCALE = 1.11; // 50% / (50% - 40px) ≈ 1.11 for cards to touch during scroll

const StackCard = ({ card, config, progress }) => {
  const x = useTransform(progress, (v) => {
    const eased = easeOutCubic(v);
    const xVal = config.endX * eased;
    return `calc(-50% + ${xVal * 100}%)`;
  });
  const y = useTransform(progress, (v) => {
    const eased = easeOutCubic(v);
    const yVal = config.endY * eased;
    return `calc(-50% + ${yVal * 100}%)`;
  });
  const scale = useTransform(progress, (v) => {
    const eased = easeOutCubic(v);
    const endScale = 0.82;
    const baseScale = config.startScale + (endScale - config.startScale) * eased;
    // No gap while scrolling: scale up so cards overlap. Gap only when fully settled (eased=1).
    // Apply only when cards are in grid phase (eased > 0.4) to avoid affecting initial single-card state.
    const gapCompensation =
      eased < 0.4 ? 1 : 1 + (GAP_SCALE - 1) * (1 - (eased - 0.4) / 0.6);
    return baseScale * gapCompensation;
  });
  const zIndex = useTransform(progress, (v) => {
    // Card 1 always on top during scroll; others stay behind until fully separated (v === 1)
    if (config.coverThreshold === 0) {
      return 10; // Card 1 always highest
    }
    return v >= 1 ? 5 : config.startZ; // Cards 2–4: low z until settled, then visible in their quadrants
  });
  const opacity = useTransform(
    progress,
    [0, 0.25],
    [config.startScale > 1 ? 1 : 0, 1]
  );

  return (
    <motion.div
      className="crafts-stack-card"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x,
        y,
        scale,
        zIndex,
        opacity,
        willChange: "transform",
        transformOrigin: "center center",
      }}
    >
      <div className="crafts-stack-card__inner">
        <div className="crafts-stack-card__img">
          <img src={card.image} alt={card.label} />
        </div>
      </div>
    </motion.div>
  );
};

const ScrollCardStack = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 300px", "end start"],
  });

  // Clamp progress at 1 so animation stops
  const progress = useTransform(scrollYProgress, (v) => Math.min(v, 1));

  // Show 6 static cards only after animation ends (progress >= 1)
  const staticGridOpacity = useTransform(progress, [0.92, 1], [0, 1]);

  return (
    <div
      ref={sectionRef}
      className="crafts-scroll-section"
      style={{ height: "300vh" }}
    >
      <section
        className="crafts-card-stack"
        style={{
          position: "sticky",
          top: "200px",
          height: "calc(100vh - 200px)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          perspective: "1200px",
          overflow: "hidden",
        }}
      >
        <div
          className="crafts-card-stack__viewport"
          style={{
            position: "relative",
            aspectRatio: "1",
            overflow: "hidden",
          }}
        >
          {CARDS.map((card, i) => (
            <StackCard
              key={card.id}
              card={card}
              config={CARD_CONFIGS[i]}
              progress={progress}
            />
          ))}
        </div>
      </section>

      <motion.section
        className="crafts-static-grid"
        style={{ opacity: staticGridOpacity }}
      >
        <div className="crafts-static-grid__viewport">
          {STATIC_CARDS.map((card) => (
            <div key={card.id} className="crafts-static-grid__card">
              <div className="crafts-stack-card__inner">
                <div className="crafts-stack-card__img">
                  <img src={card.image} alt={card.label} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ScrollCardStack;
