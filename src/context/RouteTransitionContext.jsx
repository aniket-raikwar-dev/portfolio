import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const RouteTransitionContext = createContext(null);

export const useRouteTransition = () => {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) {
    throw new Error("useRouteTransition must be used within RouteTransitionProvider");
  }
  return ctx;
};

export const RouteTransitionProvider = ({ children }) => {
  const [pendingPath, setPendingPath] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const navigateWithTransition = useCallback(
    (to) => {
      if (isAnimating) return;
      setPendingPath(to);
      setIsAnimating(true);
    },
    [isAnimating]
  );

  const onTransitionComplete = useCallback(() => {
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
    setIsAnimating(false);
  }, [navigate, pendingPath]);

  return (
    <RouteTransitionContext.Provider
      value={{
        pendingPath,
        isAnimating,
        navigateWithTransition,
        onTransitionComplete,
      }}
    >
      {children}
    </RouteTransitionContext.Provider>
  );
};
