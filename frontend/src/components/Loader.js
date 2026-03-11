import Lottie from "lottie-react";
import dribble from "../animations/dribble.json";

function Loader() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Lottie animationData={dribble} loop={true} />
    </div>
  );
}

export default Loader;