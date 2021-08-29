import { useState } from "react";
import { TSignupInput } from "../../views/home/components/form/signupForm/type/signupInputType";
import { TSigninInput } from "../../views/home/components/form/signinForm/type/signinInputType";

type input = TSignupInput | TSigninInput;

const useForm = (initInput: input) => {
  const [input, setInput] = useState<input>(initInput);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  };

  return [input, handleOnInputChange] as const;
};

export default useForm;
