import { useState } from "react";

export interface IVisibility {
  [key: string]: boolean;
}

const useVisibility = <T extends IVisibility | boolean>(initValue: T) => {
  const [isVisible, setVisibile] = useState<T>(initValue);

  const handleVisibility = (component?: string, val?: boolean) =>
    setVisibile((isShown) => {
      if (component) {
        const entries = Object.entries(isShown).map(([key, value]) =>
          key === component
            ? [component, (value = true)]
            : [key, (value = false)]
        );
        return Object.fromEntries(entries);
      } else if (val) {
        return val;
      }
    });

  return [isVisible, handleVisibility] as const;
};

export default useVisibility;
