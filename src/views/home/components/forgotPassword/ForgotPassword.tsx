import React from "react";
import { Card } from "react-bootstrap";
import ForgotPasswordForm from "../form/forgotPasswordForm/ForgotPasswordForm";
import useForm from "../../../../hooks/form/useForm";
import { TForgotPasswordInput } from "../form/forgotPasswordForm/type/forgotPasswordInputType";
import "./forgotPassword.css";

const ForgotPassword: React.FC = () => {
  const forgotPasswordInitInput = {
    useremail: "",
  };
  const [input, changeForgotPasswordInput] = useForm<TForgotPasswordInput>(
    forgotPasswordInitInput
  );

  const handleSubmitForgotPasswordForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Forgot Password</h2>
        <ForgotPasswordForm
          input={input}
          onChangeInput={changeForgotPasswordInput}
          onSubmitForm={handleSubmitForgotPasswordForm}
          isSubmitButtonDisabled={Object.values(input).includes("")}
          isLoading={false}
        />
      </Card.Body>
    </Card>
  );
};

export default ForgotPassword;
