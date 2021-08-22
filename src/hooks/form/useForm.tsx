import { useState } from "react";
import { signupInput } from "../../views/home/components/form/signupForm/type/signupInputType";
import { signinInput } from "../../views/home/components/form/signinForm/type/signinInputType";

type input = signupInput | signinInput;

const useForm = (initInput: input) => {
  const [input, setInput] = useState<input>(initInput);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  return [input, handleOnInputChange] as const;
};

export default useForm;
