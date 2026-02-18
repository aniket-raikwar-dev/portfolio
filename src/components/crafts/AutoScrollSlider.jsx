import React from "react";

const AutoScrollSlider = ({ items = [], direction, duration }) => {
  const duplicatedItems = [...items, ...items];

  const trackStyle = {
    display: "flex",
    gap: "20px",
    animation: `${
      direction === "left" ? "scroll-left" : "scroll-right"
    } ${duration}s linear infinite`,
  };

  return (
    <div className="auto-scroll-container">
      <div className="auto-scroll-track" style={trackStyle}>
        {duplicatedItems.map((item, index) => (
          <div className="auto-scroll-card" key={index}>
            <div className="logo-img">
              <img src={item.imgSrc} alt="" />
            </div>
            <div>
              <p className="logo-head">{item.name}</p>
              <p className="logo-para">{item.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollSlider;
