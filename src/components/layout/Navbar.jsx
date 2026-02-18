import { useRef, useState, useEffect } from "react";
import AsterickLoader from "../../assets/asterisk.svg";
import { gsap } from "gsap";

import {
  RiArrowRightUpLine,
  RiMailFill,
  RiMailLine,
  RiMapPin2Fill,
  RiMapPin2Line,
  RiTimerFlashFill,
  RiTimerFlashLine,
} from "react-icons/ri";
import ThemeToggle from "../ui/ThemeToggle";

const CHARS = "ABCDEFGHIJKLMNOP";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const animateFlip = (el) => {
    if (el._animating || !el.dataset.text) return;

    el._animating = true;

    gsap
      .timeline({
        onComplete: () => (el._animating = false),
      })
      .to(el, {
        yPercent: -100,
        duration: 0.45,
        ease: "power2.inOut",
      })
      .set(el, { yPercent: 0 });
  };

  useEffect(() => {
    const items = menuRef.current.querySelectorAll("li");

    items.forEach((item) => {
      if (!item.dataset.text) return; // skip ThemeToggle

      const handler = () => animateFlip(item);
      item.addEventListener("mouseenter", handler);

      item._handler = handler;
    });

    return () => {
      items.forEach((item) => {
        if (item._handler)
          item.removeEventListener("mouseenter", item._handler);
      });
    };
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <img className="asterick-sm" src={AsterickLoader} alt="loader" />

        <ul ref={menuRef} className="navbar__menu_1">
          <li data-text="home" className="active">
            home
          </li>
          <li data-text="about">About</li>
          <li data-text="works">Works</li>
          <li data-text="crafts">Crafts</li>
          <li data-text="contact">Contact</li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <div className="navbar__mobile__btn">
          <ThemeToggle />
          <button
            className={`navbar__burger ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile ${isOpen ? "is-open" : ""}`}>
        <ul className="navbar__menu_2">
          <li className="active">Home</li>
          <li>About</li>
          <li>Works</li>
          <li>Crafts</li>
          <li>Contact</li>
        </ul>
        <div className="nav-box-item-container">
          <div className="nav-item-box">1</div>
          <div className="nav-item-box">1</div>
        </div>
        <div className="nav-box-item-container">
          <div className="nav-item-box">1</div>
          <div className="nav-item-box">1</div>
        </div>
        <div className="mrg-top-25">
          <div className="nav-email-text">
            <p className="flex items-center gap-1.5">
              <RiMapPin2Fill />
              Based in Nagpur, India
            </p>
            <p className="flex items-center gap-1.5">
              <RiTimerFlashFill />
              16:03 GMT+1.5<sup>o</sup>C
            </p>
          </div>
          <div className="nav-email-text">
            <p className="flex items-center gap-2.5 tracking-wide">
              <div className="online-indicator" />
              aniket.raikwar.101@gmail.com
            </p>
            <RiArrowRightUpLine size={20} cursor={"pointer"} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
