import React, { forwardRef } from "react";

const IntroSplash = forwardRef((_, ref) => {
  return (
    <div ref={ref} className="intro-container">
      <h1 className="intro-text">
        {/* <span>Hey! </span> */}
        Hey !
        <br />
        You're experiencing <br />
        one of the best <br />
        portfolio.
        {/* <span>portfolio.</span> */}
      </h1>
    </div>
  );
});

export default IntroSplash;
