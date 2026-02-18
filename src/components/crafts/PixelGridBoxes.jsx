import { useState, useRef, useEffect } from "react";

// const boxes = Array.from({ length: 386 }, (_, i) => i + 1);
const bgClasses = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6"];

const PixelGridBoxes = () => {
  const [activeBoxes, setActiveBoxes] = useState({});
  const [boxCount, setBoxCount] = useState(0);
  const pixelContainerRef = useRef(null);
  const boxSize = 35;

  const getRandomBgClass = () => {
    const index = Math.floor(Math.random() * bgClasses.length);
    return bgClasses[index];
  };

  useEffect(() => {
    const resize = () => {
      const width = pixelContainerRef.current?.offsetWidth || 0;
      const height = pixelContainerRef.current?.offsetHeight || 0;
      const cols = Math.floor(width / boxSize);
      const rows = Math.floor(height / boxSize);
      setBoxCount(cols * rows);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const container = pixelContainerRef.current;

    const handleMouseOver = (e) => {
      const box = e.target.closest(".pixel-box");
      if (!box || !container.contains(box)) return;

      const related = e.relatedTarget;
      if (box.contains(related)) return;

      const index = box.dataset.index;
      setActiveBoxes((prev) => ({
        ...prev,
        [index]: getRandomBgClass(),
      }));
    };

    const handleMouseOut = (e) => {
      const box = e.target.closest(".pixel-box");
      if (!box || !container.contains(box)) return;

      const related = e.relatedTarget;
      if (box.contains(related)) return;

      const index = box.dataset.index;
      setTimeout(() => {
        setActiveBoxes((prev) => {
          const newState = { ...prev };
          delete newState[index];
          return newState;
        });
      }, 700);
    };

    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);

    return () => {
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="craft-layout">
      <div className="pixel-grid-container" ref={pixelContainerRef}>
        {Array.from({ length: boxCount }, (item, index) => (
          <div
            key={item}
            className={`pixel-box ${activeBoxes[index] || ""}`}
            data-index={index}
          ></div>
        ))}
        <p className="pixel-text">PIXEL GRID BOXES</p>
      </div>
    </div>
  );
};

export default PixelGridBoxes;
