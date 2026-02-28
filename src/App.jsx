import { useRef, useEffect, useState } from "react";
import "@/styles/global.scss";
import { gsap } from "gsap";
import { Preloader, IntroSplash } from "@/features/onboarding";
import { AppRouter } from "@/routes/router";

function App() {
  const loaderRef = useRef(null);
  const introRef = useRef(null);
  const mainRef = useRef(null);
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    if (!showMainContent) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMainContent]);

  const startSequence = () => {
    setIsIntroActive(true);
    const tl = gsap.timeline();

    tl.to(loaderRef.current, {
      y: "-100vh",
      duration: 0.2,
      ease: "power3.inOut",
    }).to(
      introRef.current,
      {
        y: 0,
        duration: 1.2,
        ease: "power3.inOut",
      },
      "<"
    );
  };

  const handleIntroComplete = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setShowMainContent(true);
      },
    });

    tl.to(introRef.current, {
      y: "-100vh",
      duration: 0.8,
      ease: "power3.inOut",
    }).to(
      mainRef.current,
      {
        y: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    );
  };

  if (showMainContent) {
    return (
      <div className="App">
        <div className="main-container main-container--visible">
          <AppRouter />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Preloader ref={loaderRef} onComplete={startSequence} />
      <IntroSplash ref={introRef} isActive={isIntroActive} onScrollComplete={handleIntroComplete} />
      <div ref={mainRef} className="main-container" aria-hidden="true" />
    </div>
  );
}

export default App;
