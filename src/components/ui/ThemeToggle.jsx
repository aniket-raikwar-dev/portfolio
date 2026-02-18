import { useEffect, useState } from "react";
import { RiMoonFill, RiMoonLine, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <button
      className={`theme-button ${isDark ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="icon">{isDark ? <RiMoonFill /> : <RiSunLine />}</span>
    </button>
  );
};

export default ThemeToggle;
