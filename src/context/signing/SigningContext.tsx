import React, { createContext } from "react";

type TShowSignupForm = (value: boolean) => void;

interface SigningContextInterface {
  showSignupForm: TShowSignupForm;
}

export const SigningContext = createContext({} as SigningContextInterface);
