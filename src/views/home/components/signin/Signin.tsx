import React from "react";
import SigninForm from "../form/signinForm/SigninForm";
import useForm from "../../../../hooks/form/useForm";
import { signinInput } from "../form/signinForm/type/signinInputType";
import "./signin.css";

const Signin: React.FC = () => {
  const signinInitInput = {
    useremail: "",
    userpassword: "",
  };
  const [input, changeSigninInput] = useForm(signinInitInput);

  const handleSubmitSigninForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <SigninForm
      input={input as signinInput}
      onChangeInput={changeSigninInput}
      onSubmitForm={handleSubmitSigninForm}
      isSubmitFormDisabled={Object.values(input).includes("")}
    />
  );
};

export default Signin;
