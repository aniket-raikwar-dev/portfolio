import { motion } from "framer-motion";
import LightshipCard from "../components/crafts/LightshipCard";

import Img1 from "../assets/images/carousel/img1.jpeg";
import Img2 from "../assets/images/carousel/img2.jpeg";
import Img3 from "../assets/images/carousel/img3.jpeg";
import Img4 from "../assets/images/carousel/img4.jpeg";

const CRAFT_PLACEHOLDERS = [
  { id: 1, label: "Image Carousel", desc: "Smooth infinite carousel with gestures", image: Img1 },
  { id: 2, label: "Pixel Grid", desc: "Interactive grid animation playground", image: Img2 },
  { id: 3, label: "Checkout Flow", desc: "Swipe-to-add cart experience", image: Img3 },
  { id: 4, label: "Lightship Cards", desc: "3D tilt-on-hover card stack", image: Img4 },
];

const Crafts = () => {
  return (
    <main className="page crafts-page">
      <motion.div
        className="crafts-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="crafts-heading">Crafts</h1>
        <p className="crafts-description">
          Experiments, side projects & playful builds. From interactive UI toys to pixel-perfect
          explorations—each craft is a small window into how I think and ship. Hover to peek inside.
        </p>
      </motion.div>

      <motion.div
        className="crafts-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {CRAFT_PLACEHOLDERS.map((craft) => (
          <motion.div
            key={craft.id}
            className="crafts-grid__item"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 80, damping: 14 },
              },
            }}
          >
            <LightshipCard>
              <div className="craft-card">
                <div className="craft-card__img">
                  <img src={craft.image} alt={craft.label} />
                </div>
                <div className="craft-card__text">
                  <span className="craft-card__label">{craft.label}</span>
                  <span className="craft-card__desc">{craft.desc}</span>
                </div>
              </div>
            </LightshipCard>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Crafts;
