import { useState } from "react";

const useLoader = (initValue: boolean) => {
  const [isLoading, setLoader] = useState<boolean>(initValue);

  const handleSetLoader = (value: boolean) => setLoader(value);

  return [isLoading, handleSetLoader] as const;
};

export default useLoader;
