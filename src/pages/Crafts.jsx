import { motion } from "framer-motion";
import ScrollCardStack from "../components/crafts/ScrollCardStack";

const Crafts = () => {
  return (
    <main className="page crafts-page" style={{ pointerEvents: "auto" }}>
      <motion.div
        className="crafts-header"
        style={{ pointerEvents: "auto" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="crafts-header__top">
          <h1 className="crafts-heading">Crafts</h1>
          <span className="crafts-header__number">07</span>
        </div>
        <div className="crafts-header__bottom">
          <p className="crafts-description">
            Experiments, side projects & playful builds. From interactive UI toys to pixel-perfect
            explorations—each craft is a small window into how I think and ship. Scroll to see them
            shuffle into place.
          </p>
        </div>
      </motion.div>

      <ScrollCardStack />
    </main>
  );
};

export default Crafts;
