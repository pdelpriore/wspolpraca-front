import React from "react";
import SignupForm from "../form/signupForm/SignupForm";
import useForm from "../../../../hooks/form/useForm";
import { signupInput } from "../form/signupForm/type/signupInputType";
import "./signup.css";

const Signup: React.FC = () => {
  const signupInitInput = {
    username: "",
    useremail: "",
    userpassword: "",
    usertype: "",
  };
  const [input, changeSignupInput] = useForm(signupInitInput);

  const handleSubmitSignupForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <SignupForm
      input={input as signupInput}
      onChangeInput={changeSignupInput}
      onSubmitForm={handleSubmitSignupForm}
      isSubmitFormDisabled={Object.values(input).includes("")}
    />
  );
};

export default Signup;
