import React, { useEffect, useRef, useState } from "react";
import Image1 from "@/assets/images/rotatables/image1.gif";
import Image2 from "@/assets/images/rotatables/image2.gif";
import Image3 from "@/assets/images/rotatables/image3.gif";
import Image4 from "@/assets/images/rotatables/image4.gif";
import Image5 from "@/assets/images/rotatables/image5.gif";
import Image6 from "@/assets/images/rotatables/image6.gif";
import Image7 from "@/assets/images/rotatables/image7.gif";
import Image8 from "@/assets/images/rotatables/image8.gif";
import Image9 from "@/assets/images/rotatables/image9.gif";
import Image10 from "@/assets/images/rotatables/image10.jpeg";

const RotatableImages = () => {
  const images = [
    Image1,
    Image10,
    Image2,
    Image3,
    Image4,
    Image6,
    Image8,
    Image5,
  ];
  const count = images.length;
  const radius = 230;
  const [angle, setAngle] = useState(0);
  const requestRef = useRef();

  const animate = () => {
    setAngle((prev) => (prev + 0.5) % 360);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  return (
    <div className="circle-container">
      <div className="rotating-circle">
        <p>aniket</p>
        <p>raikwar</p>
      </div>
      {images.map((item, index) => {
        const offsetAngle = angle + (360 / count) * index;
        const x = radius * Math.cos((offsetAngle * Math.PI) / 180);
        const y = radius * Math.sin((offsetAngle * Math.PI) / 180);

        return (
          <div
            key={index}
            className="image-wrapper"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <img src={item} alt="img" />
          </div>
        );
      })}
    </div>
  );
};

export default RotatableImages;
