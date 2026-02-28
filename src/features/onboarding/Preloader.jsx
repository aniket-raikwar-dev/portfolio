import React, { forwardRef, useEffect, useState } from "react";
import AsterickLoader from "@/assets/asterisk.svg";

const Preloader = forwardRef(({ onComplete }, ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 100);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={ref} className={`loader-container`}>
      <img className="asterick" src={AsterickLoader} alt="loader" />
      <div className="progress-container">
        <div style={{ width: `${progress}%` }} className="progress-bar"></div>
      </div>
      <button onClick={onComplete} style={{ display: "none" }} />
    </div>
  );
});

export default Preloader;
