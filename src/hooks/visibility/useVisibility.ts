import { Component, useState } from "react";

export interface IVisibility {
  [key: string]: boolean;
}

const useVisibility = <T extends IVisibility>(initValue: T) => {
  const [isVisible, setVisibile] = useState<T>(initValue);

  const handleVisibility = (component: string) =>
    setVisibile((isVis) => {
      const entries = Object.entries(isVis).map(([key, value]) =>
        key === component ? [component, (value = true)] : [key, (value = false)]
      );
      return Object.fromEntries(entries);
    });

  return [isVisible, handleVisibility] as const;
};

export default useVisibility;
