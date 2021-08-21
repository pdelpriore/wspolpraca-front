import { useState } from "react";

const useVisibility = (initValue: boolean) => {
  const [isVisible, setVisibility] = useState<boolean>(initValue);

  const handleVisibility = (value: boolean) => setVisibility(value);

  return [isVisible, handleVisibility] as const;
};

export default useVisibility;
