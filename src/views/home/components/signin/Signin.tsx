import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import SigninForm from "../form/signinForm/SigninForm";
import useForm from "../../../../hooks/form/useForm";
import { TSigninInput } from "../form/signinForm/type/signinInputType";
import "./signin.css";
import getSigninMutation from "./method/getSigninMutation";
import { useLazyQuery, useMutation } from "@apollo/client";
import getUserId from "../../../../shared/getUserId";
import { client } from "../../../../config/apollo/client/ApolloClient";
import {
  auth,
  loginUser,
  userSignout,
} from "../../../../config/firebase/Firebase";
import useLoader from "../../../../hooks/loader/useLoader";
import { FirebaseError } from "@firebase/app";
import showMessage from "../../../../shared/showMessage";
import {
  AuthError,
  firebaseAuthError,
} from "../../../../shared/firebaseAuthErrors";
import { GET_USER_TYPE } from "../google/query/GetUserType";
import { User } from "@firebase/auth";

const Signin: React.FC = () => {
  const signinInitInput = {
    useremail: "",
    userpassword: "",
  };
  const [input, changeSigninInput] = useForm<TSigninInput>(signinInitInput);
  const [isLoading, setLoader] = useLoader<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [
    getUserType,
    { ["loading"]: userTypeLoading, ["error"]: userTypeError, data },
  ] = useLazyQuery(GET_USER_TYPE, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
  });

  const signinMutation = getSigninMutation(data?.getUserType.userType);

  const [
    signinUser,
    { ["loading"]: signinUserLoading, ["error"]: signinUserError },
  ] = useMutation(signinMutation, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
    onCompleted: async ({
      [`signin${data?.getUserType.userType}`]: signinUser,
    }) => {
      if (signinUser) {
        await userSignout(auth);
        client.resetStore();

        localStorage.setItem("user", JSON.stringify(signinUser));
        localStorage.setItem(
          "userId",
          JSON.stringify({ userId: signinUser["id"] })
        );

        getUserId(JSON.parse(localStorage.getItem("userId") as string));
      }
    },
  });

  const handleSubmitSigninForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);
      const credentials = await loginUser(
        auth,
        input.useremail,
        input.userpassword
      );
      const idToken = await credentials.user.getIdToken();
      const { email } = credentials.user as User;

      setTokenId(idToken);
      setUserEmail(email as string);

      getUserType({ variables: { getUserTypeEmail: email as string } });
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

  useEffect(() => {
    if (data?.getUserType.userType && userEmail)
      signinUser({
        variables: {
          [`signin${data.getUserType.userType}Data`]: {
            email: userEmail,
          },
        },
      });
  }, [data, userEmail, signinUser]);

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign in</h2>
        <SigninForm
          input={input}
          onChangeInput={changeSigninInput}
          onSubmitForm={handleSubmitSigninForm}
          isSubmitButtonDisabled={Object.values(input).includes("")}
          isLoading={isLoading || userTypeLoading || signinUserLoading}
        />
      </Card.Body>
    </Card>
  );
};

export default Signin;
