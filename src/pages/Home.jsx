import { useState, useEffect } from "react";
import HeroSection from "../components/layout/HeroSection";
import ImmersiveZoom from "../components/home/ImmersiveZoom";

const Home = () => {
  const [showNextSection, setShowNextSection] = useState(false);

  const handleImmersiveComplete = () => {
    setShowNextSection(true);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <HeroSection />
      <ImmersiveZoom onComplete={handleImmersiveComplete} />
      {showNextSection && (
        <div style={{ minHeight: "100vh", background: "#000", padding: "100px 20px" }}>
          <h2 style={{ color: "#fff", textAlign: "center" }}>Next Section Content</h2>
        </div>
      )}
    </>
  );
};

export default Home;
