import React from "react";
import { Card } from "react-bootstrap";
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
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign in</h2>
        <SigninForm
          input={input as signinInput}
          onChangeInput={changeSigninInput}
          onSubmitForm={handleSubmitSigninForm}
          isSubmitButtonDisabled={Object.values(input).includes("")}
        />
      </Card.Body>
    </Card>
  );
};

export default Signin;
