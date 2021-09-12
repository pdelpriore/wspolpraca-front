import React, { useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { TSigninInput } from "./type/signinInputType";
import { ShowingFormContext } from "../../../../../context/signing/ShowingFormContext";
import "./signinForm.css";

type TOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => void;
type TOnSubmitForm = (e: React.FormEvent) => void;

interface ISigninFormProps {
  input: TSigninInput;
  onChangeInput: TOnChangeInput;
  onSubmitForm: TOnSubmitForm;
  isSubmitButtonDisabled: boolean;
}

const SigninForm: React.FC<ISigninFormProps> = ({
  input,
  onChangeInput,
  onSubmitForm,
  isSubmitButtonDisabled,
}) => {
  const { showForm } = useContext(ShowingFormContext);

  const handleShowSignupFormOnClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    showForm({ component: "signupForm" });
  };

  const handleShowForgotPasswordFormOnClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    showForm({ component: "forgotPasswordForm" });
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
      <Form.Group controlId="signinFormUserPassword">
        <Form.Label className="form__label">Hasło</Form.Label>
        <Form.Control
          className="form__control"
          size="lg"
          name="userpassword"
          type="password"
          onChange={onChangeInput}
          value={input.userpassword || ""}
        />
      </Form.Group>
      <span className="form__span" onClick={handleShowSignupFormOnClick}>
        zarejestruj się
      </span>
      <span
        className="form__span"
        onClick={handleShowForgotPasswordFormOnClick}
      >
        zapomniałeś hasła ?
      </span>
      <Button
        type="submit"
        className="form_btn"
        disabled={isSubmitButtonDisabled}
      >
        Zaloguj się
      </Button>
    </Form>
  );
};

export default SigninForm;
