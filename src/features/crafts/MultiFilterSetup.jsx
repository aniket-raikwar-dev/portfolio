import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Dog from "@/assets/images/filters/dog.gif";
import Cat from "@/assets/images/filters/cat.gif";
import Gorilla from "@/assets/images/filters/gorilla.gif";
import Cow from "@/assets/images/filters/cow.gif";
import Panda from "@/assets/images/filters/panda.gif";
import Sheep from "@/assets/images/filters/sheep.gif";
import Squirrel from "@/assets/images/filters/Squirrel.gif";
import Duck from "@/assets/images/filters/duck.gif";
import Crow from "@/assets/images/filters/crow.gif";
import Sparrow from "@/assets/images/filters/sparrow.gif";
import Ostrich from "@/assets/images/filters/Ostrich.gif";
import Crab from "@/assets/images/filters/crab.gif";
import Jellyfish from "@/assets/images/filters/jellyfish.gif";
import Clownfish from "@/assets/images/filters/fish.gif";
import Whale from "@/assets/images/filters/whale.gif";
import Octopus from "@/assets/images/filters/octopus.gif";
import Chameleon from "@/assets/images/filters/chameleon.gif";
import Frog from "@/assets/images/filters/frog.gif";
import Snake from "@/assets/images/filters/snake.gif";

const animals = [
  { id: 1, name: "Dog", type: "mammals", image: Dog },
  { id: 2, name: "Cat", type: "mammals", image: Cat },
  { id: 16, name: "Jellyfish", type: "aquatic", image: Jellyfish },
  { id: 4, name: "Cow", type: "mammals", image: Cow },
  { id: 7, name: "Sheep", type: "mammals", image: Sheep },
  { id: 3, name: "Gorilla", type: "mammals", image: Gorilla },
  { id: 10, name: "Sparrow", type: "birds", image: Sparrow },
  { id: 15, name: "Blue Whale", type: "aquatic", image: Whale },
  { id: 5, name: "Panda", type: "mammals", image: Panda },
  { id: 14, name: "Ostrich", type: "birds", image: Ostrich },
  { id: 24, name: "Frog", type: "reptiles", image: Frog },
  { id: 11, name: "Crow", type: "birds", image: Crow },
  { id: 9, name: "Duck", type: "birds", image: Duck },
  { id: 19, name: "Crab", type: "aquatic", image: Crab },
  { id: 30, name: "Octopus", type: "aquatic", image: Octopus },
  { id: 21, name: "Clownfish", type: "aquatic", image: Clownfish },
  { id: 8, name: "Squirrel", type: "mammals", image: Squirrel },
  { id: 22, name: "Snake", type: "reptiles", image: Snake },
  { id: 25, name: "Chameleon", type: "reptiles", image: Chameleon },
];

const animalTypes = ["All", "Mammals", "Birds", "Aquatic", "Reptiles"];

const MultiFilterSetup = () => {
  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState(
    new Set(["all"])
  );
  const lenisRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const resetFilter = () => {
    setSelectedAnimalTypes(new Set(["all"]));
  };

  const handleAnimalTypeSelect = (type) => {
    const typeKey = type.toLowerCase();

    setSelectedAnimalTypes((prev) => {
      const updatedSet = new Set(prev);

      if (typeKey === "all") return new Set(["all"]);
      updatedSet.delete("all");

      updatedSet.has(typeKey)
        ? updatedSet.delete(typeKey)
        : updatedSet.add(typeKey);

      return updatedSet.size === 0 ? new Set(["all"]) : updatedSet;
    });
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="craft-layout multi-filter-container">
      <h3>Multi Filter Setup</h3>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {animalTypes.map((type) => {
            const typeKey = type.toLowerCase();
            return (
              <div
                key={typeKey}
                onClick={() => handleAnimalTypeSelect(type)}
                className={`filter-option ${
                  selectedAnimalTypes.has(typeKey)
                    ? "filter-option--active"
                    : ""
                }`}
              >
                {type}
              </div>
            );
          })}
        </div>
        <div className="filter-option reset" onClick={resetFilter}>
          Reset
        </div>
      </div>
      <div ref={scrollContainerRef} className="card-container scrollable">
        <motion.div layout className="card-grid">
          <AnimatePresence>
            {animals.map((animal) => {
              const isAllSelected = selectedAnimalTypes.has("all");
              const isTypeSelected = selectedAnimalTypes.has(animal.type);

              if (isAllSelected || isTypeSelected) {
                return (
                  <motion.div
                    layout
                    key={animal.id}
                    className="card"
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="img-box">
                      <img src={animal.image} alt={animal.name} />
                    </div>
                    <p>{animal.name}</p>
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MultiFilterSetup;
