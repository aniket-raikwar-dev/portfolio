import React, { useState } from "react";

import Image1 from "@/assets/images/carousel/img1.jpeg";
import Image2 from "@/assets/images/carousel/img2.jpeg";
import Image3 from "@/assets/images/carousel/img3.jpeg";
import Image4 from "@/assets/images/carousel/img4.jpeg";
import Image5 from "@/assets/images/carousel/img5.jpeg";
import Image6 from "@/assets/images/carousel/img6.jpeg";
import Image7 from "@/assets/images/carousel/img7.jpeg";
import Image8 from "@/assets/images/carousel/img8.jpeg";
import Image9 from "@/assets/images/carousel/img9.jpeg";

const dummyImages = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex(
      (prev) => (prev - 1 + dummyImages.length) % dummyImages.length
    );
  };

  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % dummyImages.length);
  };

  const getVisibleIndices = () => {
    const total = dummyImages.length;
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleIndices();
  return (
    <div className="craft-layout img-carousel-layout">
      <div className="header">
        <p>Image</p>
        <p>{`0${currentIndex} / 08`}</p>
        <p>studio</p>
      </div>
      <div className="img-carousel">
        {visibleIndices.map((index, i) => {
          let positionClass = "";

          if (i === 0) positionClass = "prev-slide";
          if (i === 1) positionClass = "active-slide";
          if (i === 2) positionClass = "next-slide";

          return (
            <div
              key={index}
              className={`carousel-item ${positionClass} ${direction}`}
            >
              <img src={dummyImages[index]} alt="" />
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={prevSlide}>⟵ Prev</button>
        <button onClick={nextSlide}>Next ⟶</button>
      </div>
    </div>
  );
};

export default ImageCarousel;
