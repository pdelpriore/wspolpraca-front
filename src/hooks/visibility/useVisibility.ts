import { useState } from "react";

export interface IVisibility {
  [key: string]: boolean;
}

export interface IHandleVisibilityParams {
  component?: string;
  val?: boolean;
}

const useVisibility = <T extends IVisibility | boolean>(initValue: T) => {
  const [isVisible, setVisibile] = useState<T>(initValue);

  const handleVisibility = ({ component, val }: IHandleVisibilityParams) =>
    setVisibile(
      component
        ? (isShown) => {
            const entries = Object.entries(isShown).map(([key, value]) =>
              key === component
                ? [component, (value = true)]
                : [key, (value = false)]
            );
            return Object.fromEntries(entries) as T;
          }
        : (val as T)
    );

  return [isVisible, handleVisibility] as const;
};

export default useVisibility;
