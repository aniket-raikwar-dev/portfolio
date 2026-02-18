import React, { useRef, useState } from "react";

const Typography = () => {
  const rangeRef = useRef(null);
  const [fontWeightValue, setFontWeightValue] = useState(100);

  const handleFontWeightSize = (e) => {
    setFontWeightValue(e.target.value);
  };

  const getBoxClass = () => `box ${fontWeightValue > 650 ? "box-blue" : ""}`;
  const rangeInputStyle = `calc(${((fontWeightValue - 100) / 600) * 90}% + ${
    5 - ((fontWeightValue - 100) / 600) * 14
  }%)`;

  return (
    <div className="craft-layout">
      <div
        className="typography-layout"
        style={fontWeightValue > 650 ? { background: "#5675ff" } : {}}
      >
        <div className={getBoxClass()} style={{ alignItems: "flex-start" }}>
          <p>aniket</p>
        </div>
        <div className={getBoxClass()} style={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <p>Typography</p>
          <p>08</p>
        </div>
        <div className={getBoxClass()} style={{ alignItems: "flex-start" }}>
          <p>raikwar</p>
        </div>
        <div className={getBoxClass()}></div>
        <div className={getBoxClass()}>
          <div className="typo-container">
            <h3
              className="typo-text"
              style={{
                fontWeight: fontWeightValue,
                color: fontWeightValue > 650 ? "#ffffff" : "",
              }}
            >
              a
            </h3>
          </div>
        </div>
        <div className={getBoxClass()}></div>
        <div className={getBoxClass()}></div>
        <div className={getBoxClass()}>
          <div className="range-wrapper">
            <input
              type="range"
              min="100"
              max="700"
              value={fontWeightValue}
              onChange={handleFontWeightSize}
              ref={rangeRef}
              className="custom-range"
            />
            <div
              className="range-thumb-label"
              style={{
                left: rangeInputStyle,
              }}
            >
              Weight
            </div>
            <div
              className="range-tooltip"
              style={{
                left: rangeInputStyle,
              }}
            >
              {fontWeightValue}
            </div>
          </div>
        </div>
        <div className={getBoxClass()}></div>
      </div>
    </div>
  );
};

export default Typography;
