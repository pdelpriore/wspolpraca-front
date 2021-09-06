import { createContext } from "react";

type TShowSignupForm = (value: boolean) => void;

interface ISigningContext {
  showSignupForm: TShowSignupForm;
}

export const SigningContext = createContext({} as ISigningContext);
