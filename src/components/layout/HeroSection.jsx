import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Img2 from "../../assets/images/carousel/img2.jpeg";
import Img3 from "../../assets/images/carousel/img3.jpeg";
import Img4 from "../../assets/images/carousel/img4.jpeg";
import Img5 from "../../assets/images/carousel/img7.jpeg";
import Img6 from "../../assets/images/carousel/img6.jpeg";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&";

const ScrambleText = ({ text, isActive }) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = 20;
    const scrambleDuration = 12;

    const interval = setInterval(() => {
      frame++;

      if (frame <= scrambleDuration) {
        setDisplay(
          text
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              return SCRAMBLE_CHARS[
                Math.floor(Math.random() * SCRAMBLE_CHARS.length)
              ];
            })
            .join("")
        );
      } else {
        const revealProgress = (frame - scrambleDuration) / (totalFrames - scrambleDuration);
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (revealProgress * text.length > i) return char;
              return SCRAMBLE_CHARS[
                Math.floor(Math.random() * SCRAMBLE_CHARS.length)
              ];
            })
            .join("")
        );
      }

      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return <span>{display}</span>;
};

const HERO_CARDS = [
  { image: Img2, x: -180, y: -6, rotateY: 28, zIndex: 2, label: "Creative" },
  { image: Img3, x: -78, y: -14, rotateY: 14, zIndex: 3, label: "Frontend" },
  { image: Img4, x: 18, y: -10, rotateY: -4, zIndex: 4, label: "Take a Coffee" },
  { image: Img5, x: 114, y: -2, rotateY: -20, zIndex: 3, label: "Motion" },
  { image: Img6, x: 204, y: 10, rotateY: -36, zIndex: 2, label: "Code" },
];

const SLAM_STAGGER = 240;
const SLAM_DURATION = 0.38;
const SPREAD_DELAY =
  HERO_CARDS.length * SLAM_STAGGER + SLAM_DURATION * 1000 + 200;

const HeroSection = () => {
  const [animPhase, setAnimPhase] = useState("hidden");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimPhase("slamming");

          setTimeout(() => setAnimPhase("settled"), SPREAD_DELAY);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="hero__cards" ref={cardsRef}>
        {HERO_CARDS.map((card, i) => {
          const isHovered = animPhase === "settled" && hoveredIndex === i;
          const isOtherHovered = animPhase === "settled" && hoveredIndex !== null && hoveredIndex !== i;

          const zIndex = isHovered
            ? 20
            : animPhase === "slamming"
              ? i + 1
              : card.zIndex;

          const getAnimate = () => {
            if (animPhase === "hidden") return undefined;

            if (animPhase === "slamming") {
              return {
                opacity: 1,
                scale: [0.4, 1.15, 1],
                x: 0,
                y: 0,
                rotateY: 0,
              };
            }

            return {
              opacity: isOtherHovered ? 0.4 : 1,
              x: card.x,
              y: isHovered ? card.y - 40 : card.y,
              rotateY: card.rotateY,
              scale: isHovered ? 1.35 : 1,
              boxShadow: isHovered
                ? "0 30px 60px rgba(0,0,0,0.45)"
                : "0 8px 30px rgba(0,0,0,0.18)",
            };
          };

          const getTransition = () => {
            if (animPhase === "slamming") {
              return {
                duration: SLAM_DURATION,
                delay: i * (SLAM_STAGGER / 1000),
                ease: [0.22, 1, 0.36, 1],
              };
            }

            if (isHovered) {
              return { type: "spring", stiffness: 260, damping: 20 };
            }

            return { type: "spring", stiffness: 65, damping: 14 };
          };

          return (
            <motion.div
              key={i}
              className="hero-card"
              initial={{ opacity: 0, scale: 0.4, x: 0, y: 0, rotateY: 0 }}
              animate={getAnimate()}
              transition={getTransition()}
              onHoverStart={() =>
                animPhase === "settled" && setHoveredIndex(i)
              }
              onHoverEnd={() => setHoveredIndex(null)}
              onMouseEnter={() =>
                animPhase === "settled" && setHoveredIndex(i)
              }
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ zIndex }}
            >
              <img src={card.image} alt="" style={{ pointerEvents: "none" }} />

              <span className="hero-card__number">
                {String(i + 1).padStart(2, "0")}
              </span>

              <motion.div
                className="hero-card__overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered && animPhase === "settled" ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ pointerEvents: "none" }}
              >
                <motion.div
                  className="hero-card__line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered && animPhase === "settled" ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
                <motion.div
                  className="hero-card__tag"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{
                    opacity: isHovered && animPhase === "settled" ? 1 : 0,
                    x: isHovered && animPhase === "settled" ? 0 : -6,
                  }}
                  transition={{ duration: 0.3, delay: isHovered ? 0.15 : 0 }}
                >
                  <ScrambleText text={card.label} isActive={isHovered && animPhase === "settled"} />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="hero__text">
        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={animPhase === "settled" ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          Hey, I'm <span>Aniket</span>
        </motion.h1>
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={animPhase === "settled" ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          I'm a <strong>Frontend Engineer</strong> & creative coder with a
          passion for building memorable experiences and pixel-perfect
          interfaces.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
