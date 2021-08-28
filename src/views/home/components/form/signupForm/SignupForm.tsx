import React, { useContext } from "react";
import { SigningContext } from "../../../../../context/signing/SigningContext";
import { Form, Button, Spinner } from "react-bootstrap";
import { signupInput } from "./type/signupInputType";
import "./signupForm.css";

type onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => void;
type onSubmitForm = (e: React.FormEvent) => void;

interface SignupFormProps {
  input: signupInput;
  onChangeInput: onChangeInput;
  onSubmitForm: onSubmitForm;
  isSubmitFormDisabled: boolean;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  input,
  onChangeInput,
  onSubmitForm,
  isSubmitFormDisabled,
  isLoading,
}) => {
  const formOptions = {
    optionValues: ["youtuber", "brand"],
    optionLabels: ["Youtuber", "Firma"],
  };

  const { showSignupForm } = useContext(SigningContext);

  const handleHideSignupFormOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    showSignupForm(false);
  };

  return (
    <Form className="form" onSubmit={onSubmitForm}>
      <Form.Group controlId="signupFormUserName">
        <Form.Label className="form__label">Nazwa użytkownika</Form.Label>
        <Form.Control
          className="form__control"
          size="lg"
          name="username"
          type="text"
          onChange={onChangeInput}
          value={input.username || ""}
        />
      </Form.Group>
      <Form.Group controlId="signupFormUserEmail">
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
      <Form.Group controlId="signupFormUserPassword">
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
      <Form.Group controlId="signupFormUserType">
        <Form.Label className="form__label">Typ użytkownika</Form.Label>
        <Form.Control
          className="form__control"
          size="lg"
          name="usertype"
          as="select"
          onChange={onChangeInput}
          value={input.usertype || ""}
        >
          <option className="form__option" disabled={true} value="">
            Wybierz typ użytkownika
          </option>
          {formOptions.optionValues.map((optionValue, index) => {
            let optionLabel = formOptions.optionLabels[index];
            return (
              <option
                className="form__option"
                key={index}
                value={optionValue || ""}
              >
                {optionLabel}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      {isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <Button
          type="submit"
          className="form_btn"
          disabled={isSubmitFormDisabled}
        >
          Zarejestruj się
        </Button>
      )}
      <Button
        className="form_btn"
        variant="light"
        onClick={handleHideSignupFormOnClick}
      >
        Anuluj
      </Button>
    </Form>
  );
};

export default SignupForm;
