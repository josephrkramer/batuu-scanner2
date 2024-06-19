import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  console.log(screen.orientation.type);

  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    function handleRotation() {
      console.log("SCREEN ROTATED");
      handleResize();
    }

    //window resize
    window.addEventListener("resize", handleResize);
    //phone screen orientation
    screen.orientation.addEventListener("change", handleRotation);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
