import React, { useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { signinInput } from "./type/signinInputType";
import { SigningContext } from "../../../../../context/signing/SigningContext";
import "./signinForm.css";

type onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => void;
type onSubmitForm = (e: React.FormEvent) => void;

interface SigninFormProps {
  input: signinInput;
  onChangeInput: onChangeInput;
  onSubmitForm: onSubmitForm;
  isSubmitFormDisabled: boolean;
}

const SigninForm: React.FC<SigninFormProps> = ({
  input,
  onChangeInput,
  onSubmitForm,
  isSubmitFormDisabled,
}) => {
  const { showSignupForm } = useContext(SigningContext);
  const handleShowSignupFormOnClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    showSignupForm(true);
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
      <Button className="form_btn" disabled={isSubmitFormDisabled}>
        Zaloguj się
      </Button>
    </Form>
  );
};

export default SigninForm;
