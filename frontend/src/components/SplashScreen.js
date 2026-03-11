import React from "react";
import Lottie from "lottie-react";
import basketball from "../animations/basketball.json";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      
      <div style={{ width: 300 }}>
        <Lottie animationData={basketball} loop={true} />
      </div>

    </div>
  );
};

export default SplashScreen;