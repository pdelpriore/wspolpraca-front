import React, { useState } from "react";
import { Card } from "react-bootstrap";
import SignupForm from "../form/signupForm/SignupForm";
import useForm from "../../../../hooks/form/useForm";
import useLoader from "../../../../hooks/loader/useLoader";
import { TSignupInput } from "../form/signupForm/type/signupInputType";
import { auth, createUser } from "../../../../config/firebase/Firebase";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "./query/SignupUser";
import { capitalizeFirst } from "../../../../shared/capitalize";
import "./signup.css";

const Signup: React.FC = () => {
  const signupInitInput = {
    username: "",
    useremail: "",
    userpassword: "",
    usertype: "",
  };
  const [input, changeSignupInput] = useForm(signupInitInput);
  const [isLoading, setLoader] = useLoader(false);

  const [tokenId, setTokenId] = useState<string>("");

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
    onCompleted: ({
      [`signup${capitalizeFirst((input as TSignupInput).usertype)}`]:
        signupUser,
    }) => {
      if (signupUser) {
        console.log("signed up successfully !");
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
      if (credentials) {
        const idToken = await credentials.user.getIdToken();
        if (idToken) {
          setTokenId(idToken);
          signupUser({
            variables: {
              [`signup${capitalizeFirst(
                (input as TSignupInput).usertype
              )}Data`]: {
                userType: (input as TSignupInput).usertype,
                name: (input as TSignupInput).username,
                email: (input as TSignupInput).useremail,
              },
            },
          });
          setLoader(false);
        }
      }
    } catch (err) {
      if (err) {
        setLoader(false);
        console.log(err);
      }
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign up</h2>
        <SignupForm
          input={input as TSignupInput}
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
