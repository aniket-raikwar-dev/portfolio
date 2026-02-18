import { useRef } from "react";
import "./styles/global.scss";
import { gsap } from "gsap";
import Home from "./pages/Home";
import Preloader from "./pages/Preloader";
import IntroSplash from "./pages/IntroSplash";

function App() {
  const loaderRef = useRef(null);
  const introRef = useRef(null);
  const mainRef = useRef(null);

  const startSequence = () => {
    const tl = gsap.timeline();

    tl.to(loaderRef.current, {
      y: "-100vh",
      duration: 0.2,
      ease: "power3.inOut",
    })
      .to(
        introRef.current,
        {
          y: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "<"
      )

      .to({}, { duration: 1 })

      .to(introRef.current, {
        y: "-100vh",
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        mainRef.current,
        {
          y: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "<"
      );
  };

  return (
    <div className="App">
      <Preloader ref={loaderRef} onComplete={startSequence} />
      <IntroSplash ref={introRef} />
      <Home ref={mainRef} />
    </div>
  );
}

export default App;
