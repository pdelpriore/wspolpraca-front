import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import ForgotPasswordForm from "../form/forgotPasswordForm/ForgotPasswordForm";
import useForm from "../../../../hooks/form/useForm";
import useLoader from "../../../../hooks/loader/useLoader";
import showMessage from "../../../../shared/showMessage";
import { ShowingFormContext } from "../../../../context/signing/ShowingFormContext";
import { auth, resetPassword } from "../../../../config/firebase/Firebase";
import {
  AuthError,
  firebaseAuthError,
} from "../../../../shared/firebaseAuthErrors";
import { FirebaseError } from "@firebase/util";
import { TForgotPasswordInput } from "../form/forgotPasswordForm/type/forgotPasswordInputType";
import "./forgotPassword.css";

const ForgotPassword: React.FC = () => {
  const forgotPasswordInitInput = {
    useremail: "",
  };

  const [input, changeForgotPasswordInput] = useForm<TForgotPasswordInput>(
    forgotPasswordInitInput
  );
  const [isLoading, setLoader] = useLoader<boolean>(false);
  const { showForm } = useContext(ShowingFormContext);

  const handleSubmitForgotPasswordForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);
      await resetPassword(auth, input.useremail);

      setLoader(false);
      showForm({ component: "signinForm" });

      showMessage({
        title: "Reset hasła",
        message: "Instrukcje dot. zmiany hasła wysłane na maila.",
        variant: "light",
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setLoader(false);

        showMessage({
          title: "Reset hasła",
          message: firebaseAuthError[err.code as AuthError],
          variant: "danger",
        });
      }
    }
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
          isLoading={isLoading}
        />
      </Card.Body>
    </Card>
  );
};

export default ForgotPassword;
