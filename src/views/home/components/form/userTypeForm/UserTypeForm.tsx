import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { TUserTypeInput } from "./type/userTypeInputType";
import "./userTypeForm.css";

type TOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => void;
type TOnSubmitInput = (e: React.FormEvent) => void;
type TOnCancelForm = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

interface IUserTypeFormProps {
  input: TUserTypeInput;
  onChangeInput: TOnChangeInput;
  onSubmitInput: TOnSubmitInput;
  onCancelForm: TOnCancelForm;
  isSubmitButtonDisabled: boolean;
  isLoading: boolean;
}

const UserTypeForm: React.FC<IUserTypeFormProps> = ({
  input,
  onChangeInput,
  onSubmitInput,
  onCancelForm,
  isSubmitButtonDisabled,
  isLoading,
}) => {
  const formOptions = {
    optionValues: ["youtuber", "brand"],
    optionLabels: ["Youtuber", "Firma"],
  };

  return (
    <Form className="form" onSubmit={onSubmitInput}>
      <Form.Group controlId="userTypeFormUserType">
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
          disabled={isSubmitButtonDisabled}
        >
          OK
        </Button>
      )}
      <Button className="form_btn" variant="light" onClick={onCancelForm}>
        Anuluj
      </Button>
    </Form>
  );
};

export default UserTypeForm;
