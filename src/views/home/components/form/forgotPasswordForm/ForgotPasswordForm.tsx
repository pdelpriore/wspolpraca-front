import React, { useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { TForgotPasswordInput } from "./type/forgotPasswordInputType";
import { ShowingFormContext } from "../../../../../context/signing/ShowingFormContext";
import "./forgotPasswordForm.css";

type TOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => void;
type TOnSubmitForm = (e: React.FormEvent) => void;

interface IForgotPasswordFormProps {
  input: TForgotPasswordInput;
  onChangeInput: TOnChangeInput;
  onSubmitForm: TOnSubmitForm;
  isSubmitButtonDisabled: boolean;
  isLoading: boolean;
}

const ForgotPasswordForm: React.FC<IForgotPasswordFormProps> = ({
  input,
  onChangeInput,
  onSubmitForm,
  isSubmitButtonDisabled,
  isLoading,
}) => {
  const { showForm } = useContext(ShowingFormContext);

  const handleShowSigninFormOnClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    showForm("signinForm");
  };

  return (
    <Form className="form" onSubmit={onSubmitForm}>
      <Form.Group controlId="signinFormUserEmail">
        <Form.Label className="form__label">Email</Form.Label>
        <Form.Control
          className="form__control"
          size="lg"
          name="useremail"
          type="email"
          onChange={onChangeInput}
          value={input.useremail || ""}
        />
      </Form.Group>
      {isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <Button
          type="submit"
          className="form_btn"
          disabled={isSubmitButtonDisabled}
        >
          Resetuj hasło
        </Button>
      )}
      <Button
        className="form_btn"
        variant="light"
        onClick={handleShowSigninFormOnClick}
        disabled={isLoading}
      >
        Anuluj
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
