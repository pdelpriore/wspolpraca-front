import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import SignupForm from "../form/signupForm/SignupForm";
import useForm from "../../../../hooks/form/useForm";
import useLoader from "../../../../hooks/loader/useLoader";
import { TSignupInput } from "../form/signupForm/type/signupInputType";
import {
  auth,
  createUser,
  sendVerificationEmail,
} from "../../../../config/firebase/Firebase";
import {
  firebaseAuthError,
  AuthError,
} from "../../../../shared/firebaseAuthErrors";
import { User } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useMutation } from "@apollo/client";
import getMutation from "./method/getMutation";
import { capitalizeFirst } from "../../../../shared/capitalize";
import showMessage from "../../../../shared/showMessage";
import { ShowingFormContext } from "../../../../context/signing/ShowingFormContext";
import "./signup.css";

const Signup: React.FC = () => {
  const signupInitInput = {
    username: "",
    useremail: "",
    userpassword: "",
    usertype: "",
  };
  const [input, changeSignupInput] = useForm<TSignupInput>(signupInitInput);
  const [isLoading, setLoader] = useLoader<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");

  const { showForm } = useContext(ShowingFormContext);

  const mutation = getMutation(capitalizeFirst(input.usertype));

  const [signupUser, { loading, error }] = useMutation(mutation, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
    onCompleted: async ({
      [`signup${capitalizeFirst(input.usertype)}`]: signupUser,
    }) => {
      if (signupUser) {
        try {
          await sendVerificationEmail(auth.currentUser as User);

          showForm({ component: "signinForm" });

          showMessage({
            title: "Rejestracja",
            message: "Zarejestrowałeś się pomyślnie. Potwierdź swój email.",
            variant: "light",
          });
        } catch (err) {
          if (err instanceof Error) console.log(err.message);
        }
      }
    },
  });

  const handleSubmitSignupForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);
      const credentials = await createUser(
        auth,
        input.useremail,
        input.userpassword
      );
      const idToken = await credentials.user.getIdToken();
      setTokenId(idToken);

      signupUser({
        variables: {
          [`signup${capitalizeFirst(input.usertype)}Data`]: {
            userType: input.usertype,
            name: input.username,
            email: input.useremail,
          },
        },
      });
      setLoader(false);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setLoader(false);
        showMessage({
          title: "Rejestracja",
          message: firebaseAuthError[err.code as AuthError],
          variant: "danger",
        });
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign up</h2>
        <SignupForm
          input={input}
          onChangeInput={changeSignupInput}
          onSubmitForm={handleSubmitSignupForm}
          isSubmitButtonDisabled={Object.values(input).includes("")}
          isLoading={isLoading || loading}
        />
      </Card.Body>
    </Card>
  );
};

export default Signup;
