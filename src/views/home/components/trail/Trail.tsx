import React, { useEffect, useState } from "react";
import { useTrail, animated } from "react-spring";
import "./trail.css";

interface TrailProps {
  children: React.ReactNode;
}

const Trail: React.FC<TrailProps> = ({ children }) => {
  const [isMount, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: isMount ? 1 : 0,
    x: isMount ? 0 : 20,
    height: isMount ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div className="trail">
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} className="trail__text" style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
};

export default Trail;
