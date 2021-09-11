import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import SignupForm from "../form/signupForm/SignupForm";
import useForm from "../../../../hooks/form/useForm";
import useLoader from "../../../../hooks/loader/useLoader";
import { TSignupInput } from "../form/signupForm/type/signupInputType";
import { auth, createUser } from "../../../../config/firebase/Firebase";
import { useMutation } from "@apollo/client";
import getMutation from "./method/getMutation";
import { capitalizeFirst } from "../../../../shared/capitalize";
import showMessage from "../../../../shared/showMessage";
import { SigningContext } from "../../../../context/signing/SigningContext";
import {
  firebaseAuthError,
  TAuthError,
} from "../../../../shared/firebaseAuthErrors";
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

  const { showSignupForm } = useContext(SigningContext);

  const mutation = getMutation(capitalizeFirst(input.usertype));

  const [signupUser, { loading, error }] = useMutation(mutation, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
    onCompleted: ({
      [`signup${capitalizeFirst(input.usertype)}`]: signupUser,
    }) => {
      if (signupUser) {
        console.log("signed up successfully !");
        showSignupForm(false);
        showMessage({
          title: "Rejestracja",
          message: "Zarejestrowales sie !",
          variant: "light",
        });
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
      if (err instanceof Error) {
        setLoader(false);
        console.log(err.message);
      }
    }
  };

  if (error)
    showMessage({
      title: "Rejestracja",
      message: firebaseAuthError[error.message as TAuthError],
    });

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
