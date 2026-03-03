import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiArrowRightUpLine, RiCloseLine, RiHeartLine } from "react-icons/ri";
import Lenis from "lenis";
import AsteriskIcon from "@/assets/asterisk.svg";
import { CRAFTS_CONFIG } from "./craftsConfig";
import CraftWrapper from "./CraftWrapper";

const ShowcaseCard = ({ craft, index, onViewClick }) => (
  <motion.article
    className="showcase-card-new"
    initial={{ y: 60, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-40px 0px -40px 0px" }}
    transition={{
      duration: 0.65,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {/* Simple image preview */}
    <div className="showcase-card-new__preview">
      <img src={craft.previewImage} alt={craft.name} />
    </div>

    {/* Metadata — below image, on page background */}
    <div className="showcase-card-new__meta">
      <div className="showcase-card-new__meta-left">
        <div className="showcase-card-new__meta-row">
          <div className="showcase-card-new__avatar">
            <img src={craft.previewImage} alt="" />
          </div>
          <div className="showcase-card-new__text">
            <h3 className="showcase-card-new__owner">{craft.name}</h3>
            <p className="showcase-card-new__handle">{craft.handle}</p>
          </div>
        </div>
        <p className="showcase-card-new__resources">
          <span className="showcase-card-new__asterisk-wrap">
            <img src={AsteriskIcon} alt="" className="showcase-card-new__asterisk" />
          </span>
          <span className="showcase-card-new__resources-text">{craft.resourcesUsed} RESOURCES USED</span>
        </p>
      </div>
      <button
        type="button"
        className="showcase-card-new__view-btn"
        onClick={() => onViewClick?.(craft)}
      >
        View
        <RiArrowRightUpLine className="showcase-card-new__view-btn-icon" size={14} />
      </button>
    </div>
  </motion.article>
);

const CraftsModal = ({ isOpen, onClose, selectedCraft }) => {
  const CraftComponent = selectedCraft
    ? typeof selectedCraft.component === "function"
      ? selectedCraft.component
      : selectedCraft.component
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="crafts-modal"
          className="crafts-modal__wrapper"
          initial={{
            clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          exit={{
            clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ transformOrigin: "bottom left" }}
        >
          <motion.div
            className="crafts-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <div className="crafts-modal">
            <div className="crafts-modal__inner">
              <button
                type="button"
                className="crafts-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <RiCloseLine size={24} />
              </button>
              <div className="crafts-modal__content">
                {CraftComponent ? (
                  <div className="crafts-modal__craft-wrap">
                    <div className="crafts-modal__craft">
                      <CraftWrapper fitViewport>
                        <CraftComponent />
                      </CraftWrapper>
                    </div>
                    <p className="crafts-modal__tagline" aria-hidden>
                      crafted with care <RiHeartLine className="crafts-modal__tagline-icon" size={18} aria-hidden /> & curiosity
                    </p>
                  </div>
                ) : (
                  <p className="crafts-modal__placeholder">Select a craft to view</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ShowcaseLayout = () => {
  const lenisRef = useRef(null);
  const heroRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0.7]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.25]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="showcase-page" style={{ pointerEvents: "auto" }}>
      {createPortal(
        <CraftsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCraft(null);
          }}
          selectedCraft={selectedCraft}
        />,
        document.body
      )}
      <motion.div
        ref={heroRef}
        className="showcase-hero"
        style={{
          scale: heroScale,
          opacity: heroOpacity,
          y: heroY,
        }}
      >
        <motion.header
          className="showcase-header"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-30px 0px -30px 0px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="showcase-header__inner">
            <span className="showcase-header__pill">crafts</span>
            <div className="showcase-header__title-row">
              <img
                src={AsteriskIcon}
                alt=""
                className="showcase-header__icon"
                aria-hidden
              />
              <h1 className="showcase-header__heading">
                <span className="showcase-header__heading-bold">Show</span>
                <span className="showcase-header__heading-italic">case</span>
              </h1>
            </div>
          </div>
        </motion.header>

        <motion.section
          className="showcase-cta"
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-30px 0px -30px 0px" }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="showcase-cta__heading">
            A collection of UI experiments, micro-interactions, and side projects
            that I build to explore new ideas. Each craft is a small window into
            how I think, design, and ship — from playful animations to
            production-ready components.
          </p>
          <p className="showcase-cta__sub">Explore all crafts below</p>
          <button type="button" className="showcase-cta__btn">
            View source
            <RiArrowRightLine className="showcase-cta__btn-icon" size={16} />
          </button>
        </motion.section>
      </motion.div>

      {/* 2 rows × 3 cards */}
      <section className="showcase-grid-new">
        {CRAFTS_CONFIG.map((craft, index) => (
          <ShowcaseCard
            key={craft.id}
            craft={craft}
            index={index}
            onViewClick={(c) => {
              setSelectedCraft(c);
              setIsModalOpen(true);
            }}
          />
        ))}
      </section>
    </main>
  );
};

export default ShowcaseLayout;
