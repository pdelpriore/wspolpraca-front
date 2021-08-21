import { useState } from "react";
import { signupInput } from "../../components/form/signupForm/SignupForm";

type input = signupInput;

const useForm = (initInput: input) => {
  const [input, setInput] = useState<input>(initInput);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  return [input, handleOnInputChange] as const;
};

export default useForm;
