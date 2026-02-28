import { CRAFT_DIMENSIONS } from "./craftsConfig";

/**
 * Wraps a craft component with consistent dimensions and background.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The craft component to render
 * @param {boolean} [props.scaled] - If true, scales the craft to fit a smaller container (for card preview)
 * @param {string} [props.className] - Additional class names
 */
const CraftWrapper = ({ children, scaled = false, className = "" }) => {
  const { width, height } = CRAFT_DIMENSIONS;

  return (
    <div
      className={`craft-wrapper ${scaled ? "craft-wrapper--scaled" : ""} ${className}`.trim()}
      style={{
        width: scaled ? "100%" : width,
        height: scaled ? "100%" : height,
        minWidth: scaled ? 0 : width,
        minHeight: scaled ? 0 : height,
      }}
    >
      <div
        className="craft-wrapper__inner"
        style={{
          width,
          height,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CraftWrapper;
