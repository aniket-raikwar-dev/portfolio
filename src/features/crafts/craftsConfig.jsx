import ImageCarousel from "./ImageCarousel";
import MultiFilterSetup from "./MultiFilterSetup";
import Typography from "./Typography";
import Checkout from "./Checkout";
import PixelGridBoxes from "./PixelGridBoxes";
import RotatableImages from "./RotatableImages";
import Sidebar from "./Sidebar";
import ScrollableNames from "./ScrollableNames";
import AutoScrollSlider from "./AutoScrollSlider";

import Superior from "@/assets/images/logos/superior.jpeg";
import Flower from "@/assets/images/logos/flower.jpeg";
import Synder from "@/assets/images/logos/synder.jpeg";
import Img1 from "@/assets/images/carousel/img1.jpeg";
import Img2 from "@/assets/images/carousel/img2.jpeg";
import Img3 from "@/assets/images/carousel/img3.jpeg";
import Img4 from "@/assets/images/carousel/img4.jpeg";
import Img5 from "@/assets/images/carousel/img5.jpeg";
import Img6 from "@/assets/images/carousel/img6.jpeg";
import Img7 from "@/assets/images/carousel/img7.jpeg";
import Img8 from "@/assets/images/carousel/img8.jpeg";
import Img9 from "@/assets/images/carousel/img9.jpeg";

const DEFAULT_SLIDER_ITEMS = [
  { id: 1, name: "Superior Type", tagline: "Digital Type Foundry", imgSrc: Superior },
  { id: 2, name: "Flower Zone", tagline: "Motion Made Simple", imgSrc: Flower },
  { id: 3, name: "Synder Cut", tagline: "DC Extended Universe", imgSrc: Synder },
];

export const CRAFT_DIMENSIONS = {
  width: 900,
  height: 600,
};

export const CRAFTS_CONFIG = [
  {
    id: "image-carousel",
    name: "Image Carousel",
    handle: "@imagecarousel",
    previewImage: Img1,
    component: ImageCarousel,
    resourcesUsed: 4,
  },
  {
    id: "multi-filter",
    name: "Multi Filter",
    handle: "@multifilter",
    previewImage: Img2,
    component: MultiFilterSetup,
    resourcesUsed: 5,
  },
  {
    id: "typography",
    name: "Typography",
    handle: "@typography",
    previewImage: Img3,
    component: Typography,
    resourcesUsed: 3,
  },
  {
    id: "checkout",
    name: "Checkout",
    handle: "@checkout",
    previewImage: Img4,
    component: Checkout,
    resourcesUsed: 6,
  },
  {
    id: "pixel-grid",
    name: "Pixel Grid",
    handle: "@pixelgrid",
    previewImage: Img5,
    component: PixelGridBoxes,
    resourcesUsed: 4,
  },
  {
    id: "rotatable-images",
    name: "Rotatable Images",
    handle: "@rotatable",
    previewImage: Img6,
    component: RotatableImages,
    resourcesUsed: 5,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    handle: "@sidebar",
    previewImage: Img7,
    component: Sidebar,
    resourcesUsed: 4,
  },
  {
    id: "scrollable-names",
    name: "Scrollable Names",
    handle: "@scrollablenames",
    previewImage: Img8,
    component: ScrollableNames,
    resourcesUsed: 7,
  },
  {
    id: "auto-scroll",
    name: "Auto Scroll",
    handle: "@autoscroll",
    previewImage: Img9,
    component: () => (
      <AutoScrollSlider items={DEFAULT_SLIDER_ITEMS} direction="right" duration={6} />
    ),
    resourcesUsed: 2,
  },
];
