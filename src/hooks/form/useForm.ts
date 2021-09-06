import { useState } from "react";

const useForm = <T>(initInput: T) => {
  const [input, setInput] = useState<T>(initInput);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  return [input, handleOnInputChange] as const;
};

export default useForm;
