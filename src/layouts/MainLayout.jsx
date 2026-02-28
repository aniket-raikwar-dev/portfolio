import { Fragment } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import RouteTransitionOverlay from "@/components/ui/RouteTransitionOverlay";
import { useRouteTransition } from "@/context/RouteTransitionContext";

const MainLayout = () => {
  const { isAnimating, onTransitionComplete } = useRouteTransition();

  return (
    <Fragment>
      {createPortal(<Navbar />, document.body)}
      <div className="main-content">
        <Outlet />
      </div>
      {isAnimating && (
        <RouteTransitionOverlay onComplete={onTransitionComplete} />
      )}
    </Fragment>
  );
};

export default MainLayout;
