import React, { forwardRef } from "react";
import Navbar from "../components/layout/Navbar";

const Home = forwardRef((_, ref) => {
  return (
    <div ref={ref} className="main-container">
      <Navbar />
    </div>
  );
});

export default Home;
