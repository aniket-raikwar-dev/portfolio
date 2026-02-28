import { RiArrowRightLine } from "react-icons/ri";

import OnetaskImage from "@/assets/images/nav/onetask.png";

const NAV_CARDS = [
  { id: 1, label: "ONETASK", image: OnetaskImage },
  { id: 2, label: "WORDCRAFT", image: "https://cdn.undraw.co/illustrations/documents_9rcz.svg" },
  { id: 3, label: "STARBUCK", image: "https://cdn.undraw.co/illustrations/nature_yf30.svg" },
  { id: 4, label: "SNAKE GAME", image: "https://cdn.undraw.co/illustrations/cat_lqdj.svg" },
];

const NavCard = ({ label, image }) => {
  return (
    <div className="nav-card">
      <div className="nav-card__img-wrap">
        <img src={image} alt={label} />
      </div>
      <span className="nav-card__label">
        {label} <RiArrowRightLine className="nav-card__arrow" />
      </span>
    </div>
  );
};

export { NavCard, NAV_CARDS };
