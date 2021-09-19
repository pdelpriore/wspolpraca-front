import React, { useState, useEffect, useRef } from "react";
import { MutableRefObject } from "react";
import { Toast, Fade } from "react-bootstrap";
import { UserTypeContext } from "../../context/UserTypeContext";
import useForm from "../../../../hooks/form/useForm";
import useVisibility from "../../../../hooks/visibility/useVisibility";
import useLoader from "../../../../hooks/loader/useLoader";
import UserTypeForm from "../form/userTypeForm/UserTypeForm";
import { TUserTypeInput } from "../form/userTypeForm/type/userTypeInputType";
import "./userTypeSnackbar.css";

type TGoogleAuth = () => void;

export interface IGoogleAuth {
  signGoogleUserCallback: TGoogleAuth;
}

const withUserTypeSnackbar = (Component: React.FC) => () => {
  const [isToastVisible, setToastVisibility] = useVisibility<boolean>(false);
  const [isUserDataLoading, setLoader] = useLoader<boolean>(false);
  const [isUserSignedup, setUserSignedup] = useState<boolean>(false);

  const googleAuthRef = useRef<IGoogleAuth>();

  const userTypeInitInput = {
    usertype: "",
  };
  const [input, changeUserTypeInput] =
    useForm<TUserTypeInput>(userTypeInitInput);

  const handleSubmitUserTypeForm = (e: React.FormEvent) => {
    e.preventDefault();
    googleAuthRef.current?.signGoogleUserCallback();
  };

  const handleLoadingUserData = (value: boolean) => setLoader(value);
  const handleUserSignedup = (value: boolean) => setUserSignedup(value);

  useEffect(() => {
    if (isUserSignedup) setToastVisibility({ val: false });
  }, [isUserSignedup, setToastVisibility]);

  return (
    <div className="wrapper">
      <UserTypeContext.Provider
        value={{
          userType: input.usertype,
          ref: googleAuthRef as MutableRefObject<IGoogleAuth>,
          showUserTypeSnackbar: setToastVisibility,
          setSnackbarLoader: handleLoadingUserData,
          setIsUserSignedup: handleUserSignedup,
        }}
      >
        <Component />
      </UserTypeContext.Provider>
      <Toast
        className="wrapper_toast"
        show={isToastVisible}
        bg="light"
        animation
        transition={Fade}
      >
        <Toast.Header closeButton={false}>
          <strong>Rejestracja</strong>
        </Toast.Header>
        <Toast.Body>
          <UserTypeForm
            input={input}
            onChangeInput={changeUserTypeInput}
            onSubmitInput={handleSubmitUserTypeForm}
            isSubmitButtonDisabled={Object.values(input).includes("")}
            isLoading={isUserDataLoading}
          />
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default withUserTypeSnackbar;
