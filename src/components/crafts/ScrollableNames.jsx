import AutoScrollSlider from "./AutoScrollSlider";
import Superior from "../../assets/images/logos/superior.jpeg";
import Eye from "../../assets/images/logos/eye.jpeg";
import Flower from "../../assets/images/logos/flower.jpeg";
import Synder from "../../assets/images/logos/synder.jpeg";
import Konpo from "../../assets/images/logos/koven.jpeg";
import ORO from "../../assets/images/logos/oro.jpeg";

import Tokyo from "../../assets/images/logos/tokyo.jpeg";
import Zeta from "../../assets/images/logos/zeta.jpeg";
import Orando from "../../assets/images/logos/orando.jpeg";
import Nasa from "../../assets/images/logos/nasa.jpeg";
import DOcean from "../../assets/images/logos/digitalOcean.jpeg";

import Nike from "../../assets/images/logos/nike.jpeg";
import Rad from "../../assets/images/logos/rad.jpeg";
import SevenUps from "../../assets/images/logos/seven.jpeg";
import Leanordo from "../../assets/images/logos/leanordo.jpeg";
import Fuse from "../../assets/images/logos/fuse.jpeg";

import Kakoam from "../../assets/images/logos/kakoam.jpeg";
import Earth from "../../assets/images/logos/earth.jpeg";
import Unified from "../../assets/images/logos/unified.jpeg";
import Koven from "../../assets/images/logos/koven.jpeg";
import Native from "../../assets/images/logos/native.jpeg";

import Telescope from "../../assets/images/logos/telescope.jpeg";
import BlueGirl from "../../assets/images/peoples/blueGirl.jpeg";
import Frog from "../../assets/images/filters/frog.gif";

const ScrollableNames = () => {
  const firstRow = [
    {
      id: 1,
      name: "Superior Type",
      tagline: "Digital Type Foundry",
      imgSrc: Superior,
    },

    {
      id: 3,
      name: "Flower Zone",
      tagline: "Motion Made Simple",
      imgSrc: Flower,
    },
    {
      id: 5,
      name: "Kakoam",
      tagline: "Un-Niched Brand Studio",
      imgSrc: Kakoam,
    },
    {
      id: 4,
      name: "Synder Cut",
      tagline: "DC Extended Universe",
      imgSrc: Synder,
    },
    {
      id: 2,
      name: "Konpo Studio",
      tagline: "Full Stack Studio",
      imgSrc: Konpo,
    },
  ];
  const secondRow = [
    { id: 1, name: "Tokyo", tagline: "Japan Best City", imgSrc: Tokyo },
    { id: 2, name: "Zeta Suite", tagline: "Payment Gateway App", imgSrc: Zeta },
    { id: 3, name: "Orando", tagline: "Keep It Simple", imgSrc: Orando },
    { id: 4, name: "Nasa", tagline: "Digital Space Agency", imgSrc: Nasa },
    {
      id: 5,
      name: "Digital Ocean",
      tagline: "Digital Cloud Platform",
      imgSrc: DOcean,
    },
  ];
  const thirdRow = [
    { id: 1, name: "Nike", tagline: "Do it Now", imgSrc: Nike },
    { id: 2, name: "Radian", tagline: "Best is Coming Next", imgSrc: Rad },
    {
      id: 3,
      name: "7 - Up Drinks",
      tagline: "Taste lemon Thunder",
      imgSrc: SevenUps,
    },
    {
      id: 4,
      name: "Leanordo",
      tagline: "Creative Incubator",
      imgSrc: Leanordo,
    },
    { id: 5, name: "Fuse Talk", tagline: "Top Tier Mockups", imgSrc: Fuse },
  ];

  const fourthRow = [
    {
      id: 1,
      name: "Eye Digital One",
      tagline: "Found Root Zone",
      imgSrc: Eye,
    },
    {
      id: 2,
      name: "Earth 418",
      tagline: "Real People Live Studio",
      imgSrc: Earth,
    },
    {
      id: 3,
      name: "Unified One",
      tagline: "Premium template",
      imgSrc: Unified,
    },
    {
      id: 4,
      name: "Koven",
      tagline: "Digital Marketing Company",
      imgSrc: Koven,
    },
    {
      id: 5,
      name: "Native Studio",
      tagline: "Templates, Assets and Books",
      imgSrc: Native,
    },
  ];
  const fifthRow = [
    {
      id: 1,
      name: "O R O",
      tagline: "React Native Developer",
      imgSrc: ORO,
    },
    {
      id: 2,
      name: "Synder Cut",
      tagline: "DC Extended Universe",
      imgSrc: Synder,
    },
    {
      id: 3,
      name: "Telescope",
      tagline: "See the Universe",
      imgSrc: Telescope,
    },
    {
      id: 4,
      name: "Frog One",
      tagline: "Catch the Moments",
      imgSrc: Frog,
    },
    {
      id: 5,
      name: "Blue Girl",
      tagline: "Recreate the Beauty",
      imgSrc: BlueGirl,
    },
  ];

  return (
    <div className="craft-layout scrollable-name-layout">
      <AutoScrollSlider items={firstRow} direction="right" duration={6} />
      <AutoScrollSlider items={secondRow} direction="left" duration={8} />
      <AutoScrollSlider items={thirdRow} direction="right" duration={6} />
      <AutoScrollSlider items={fourthRow} direction="left" duration={8} />
      <AutoScrollSlider items={fifthRow} direction="right" duration={6} />
      {/* <AutoScrollSlider items={data} direction="left" duration={5} /> */}
    </div>
  );
};

export default ScrollableNames;
