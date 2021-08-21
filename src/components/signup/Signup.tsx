import React from "react";
import SignupForm from "../form/signupForm/SignupForm";
import useForm from "../../hooks/form/useForm";
import "./signup.css";

const Signup: React.FC = () => {
  const initInput = {
    username: "",
    useremail: "",
    userpassword: "",
    usertype: "",
  };
  const [input, changeSignupInput] = useForm(initInput);

  const handleSubmitSignupForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  console.log(input);

  return (
    <SignupForm
      input={input}
      onChangeInput={changeSignupInput}
      onSubmitForm={handleSubmitSignupForm}
      isSubmitFormDisabled={
        Object.values(input).length !== Object.values(initInput).length
      }
    />
  );
};

export default Signup;
