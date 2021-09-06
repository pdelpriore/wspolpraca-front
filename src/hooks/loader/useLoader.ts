import { useState } from "react";

const useLoader = <T>(initValue: T) => {
  const [isLoading, setLoader] = useState<T>(initValue);

  const handleSetLoader = (value: T) => setLoader(value);

  return [isLoading, handleSetLoader] as const;
};

export default useLoader;
