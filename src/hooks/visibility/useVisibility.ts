import { useState } from "react";

const useVisibility = <T>(initValue: T) => {
  const [isVisible, setVisibility] = useState<T>(initValue);

  const handleVisibility = (value: T) => setVisibility(value);

  return [isVisible, handleVisibility] as const;
};

export default useVisibility;
