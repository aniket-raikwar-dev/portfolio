import { useRef, useState, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteTransition } from "../../context/RouteTransitionContext";

const useLocalTime = (timeZone = "Asia/Kolkata") => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    })
  );

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      });
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
};

const useNagpurWeather = () => {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=21.1458&longitude=79.0882&current=temperature_2m"
        );
        const data = await res.json();
        if (data?.current?.temperature_2m != null) {
          setTemp(Math.round(data.current.temperature_2m));
        }
      } catch {
        setTemp(null);
      }
    };
    fetchWeather();
    const id = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return temp;
};
import AsterickLoader from "../../assets/asterisk.svg";
import { gsap } from "gsap";

import {
  RiArrowRightUpLine,
  RiMapPin2Fill,
  RiTimerFlashFill,
} from "react-icons/ri";
import ThemeToggle from "../ui/ThemeToggle";
import { NavCard, NAV_CARDS } from "../ui/NavCard";

const NAV_ITEMS = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "works", path: "/works" },
  { id: "crafts", path: "/crafts" },
  { id: "contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { navigateWithTransition } = useRouteTransition();
  const localTime = useLocalTime("Asia/Kolkata");

  const handleNavClick = (e, path) => {
    const targetPath = path === "/home" ? "/" : path;
    if (pathname === targetPath || (pathname === "/" && targetPath === "/")) return;
    e.preventDefault();
    navigateWithTransition(targetPath);
  };
  const nagpurTemp = useNagpurWeather();
  const activeItem =
    pathname === "/" || pathname === "/home"
      ? "home"
      : pathname.slice(1) || "home";
  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navCardsRef = useRef(null);
  const lastFlipRef = useRef(null);

  const animateFlip = useCallback((textEl) => {
    if (lastFlipRef.current && lastFlipRef.current !== textEl) {
      gsap.killTweensOf(lastFlipRef.current);
      gsap.set(lastFlipRef.current, { yPercent: 0 });
    }

    lastFlipRef.current = textEl;

    gsap.fromTo(
      textEl,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(textEl, { yPercent: 0 });
          if (lastFlipRef.current === textEl) lastFlipRef.current = null;
        },
      }
    );
  }, []);

  const setupFlipListeners = useCallback(
    (containerEl) => {
      if (!containerEl) return () => {};

      const items = containerEl.querySelectorAll(".nav-text");
      const handlers = new Map();

      items.forEach((el) => {
        const handler = () => animateFlip(el);
        el.addEventListener("mouseenter", handler);
        el.addEventListener("touchstart", handler, { passive: true });
        handlers.set(el, handler);
      });

      return () => {
        handlers.forEach((handler, el) => {
          el.removeEventListener("mouseenter", handler);
          el.removeEventListener("touchstart", handler);
        });
      };
    },
    [animateFlip]
  );

  useEffect(() => {
    return setupFlipListeners(desktopMenuRef.current);
  }, [setupFlipListeners]);

  useEffect(() => {
    if (isOpen) return setupFlipListeners(mobileMenuRef.current);
  }, [isOpen, setupFlipListeners]);

  useEffect(() => {
    if (!navCardsRef.current) return;
    const images = navCardsRef.current.querySelectorAll(".nav-card__img-wrap img");
    if (isOpen) {
      gsap.to(images, {
        xPercent: -50,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      gsap.set(images, { xPercent: -50, y: "100%" });
    }
  }, [isOpen]);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <NavLink to="/" className="navbar__brand" onClick={(e) => handleNavClick(e, "/")}>
          <img className="asterick-sm" src={AsterickLoader} alt="loader" />
          <span className="navbar__name">a r<span className="navbar__dot">.</span></span>
        </NavLink>

        <ul ref={desktopMenuRef} className="navbar__menu_1">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            >
              <NavLink
                to={item.path}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.path)}
              >
                <span className="nav-text" data-text={item.id}>
                  {item.id}
                </span>
              </NavLink>
            </li>
          ))}
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
        <ul ref={mobileMenuRef} className="navbar__menu_2">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeItem === item.id ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <NavLink
                to={item.path}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.path)}
              >
                <span className="nav-text" data-text={item.id}>
                  {item.id}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div ref={navCardsRef} className="nav-cards-wrapper">
          <div className="nav-box-item-container">
            {NAV_CARDS.slice(0, 2).map((card) => (
              <NavCard key={card.id} label={card.label} image={card.image} />
            ))}
          </div>
          <div className="nav-box-item-container">
            {NAV_CARDS.slice(2, 4).map((card) => (
              <NavCard key={card.id} label={card.label} image={card.image} />
            ))}
          </div>
        </div>
        <div className="mrg-top-25">
          <div className="nav-email-text">
            <p className="flex items-center gap-1.5">
              <RiMapPin2Fill />
              Based in Nagpur, India
            </p>
            <p className="flex items-center gap-1.5">
              <RiTimerFlashFill />
              {localTime} IST
              {nagpurTemp != null && (
                <>
                  {" · "}
                  {nagpurTemp}° C
                </>
              )}
            </p>
          </div>
          <a
            href="mailto:aniket.raikwar.101@gmail.com?subject=Let's%20build%20something%20great%20%E2%80%94%20Project%20%2F%20Hire%20inquiry&body=Hi%20Aniket%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20connecting%20about%20a%20project%2C%20collaboration%2C%20or%20opportunity.%0A%0AI'd%20love%20to%20share%20more%20details.%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards"
            className="nav-email-text nav-email-text--link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="flex items-center gap-2.5 tracking-wide">
              <span className="online-indicator" />
              aniket.raikwar.101@gmail.com
            </p>
            <span className="nav-email-text__icon">
              <RiArrowRightUpLine size={20} />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
