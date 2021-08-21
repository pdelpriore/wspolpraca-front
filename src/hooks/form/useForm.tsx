import { useState } from "react";

const useForm = () => {
  type input = {
    [key: string]: string;
  };

  const [input, setInput] = useState<input>({});

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  return [input, handleOnInputChange] as const;
};

export default useForm;
