import React, { useRef } from "react";
import { MutableRefObject } from "react";
import { Toast, Fade } from "react-bootstrap";
import { UserTypeContext } from "../../context/UserTypeContext";
import useForm from "../../../../hooks/form/useForm";
import useVisibility from "../../../../hooks/visibility/useVisibility";
import UserTypeForm from "../form/userTypeForm/UserTypeForm";
import { TUserTypeInput } from "../form/userTypeForm/type/userTypeInputType";
import "./userTypeSnackbar.css";

type TGoogleAuth = () => void;

export interface IGoogleAuth {
  googleAuthCallback: TGoogleAuth;
}

const withUserTypeSnackbar = (Component: React.FC) => () => {
  const [isToastVisible, setToastVisibility] = useVisibility<boolean>(false);

  const googleAuthRef = useRef<IGoogleAuth>();

  const userTypeInitInput = {
    usertype: "",
  };
  const [input, changeUserTypeInput] =
    useForm<TUserTypeInput>(userTypeInitInput);

  const handleCancelUserTypeForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setToastVisibility({ val: false });
  };

  const handleOnSubmitUserTypeForm = (e: React.FormEvent) => {
    e.preventDefault();
    googleAuthRef.current?.googleAuthCallback();
    setToastVisibility({ val: false });
  };

  return (
    <div className="wrapper">
      <UserTypeContext.Provider
        value={{
          user: input.usertype,
          ref: googleAuthRef as MutableRefObject<IGoogleAuth>,
          showUserTypeSnackbar: setToastVisibility,
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
            onSubmitInput={handleOnSubmitUserTypeForm}
            onCancelForm={handleCancelUserTypeForm}
            isSubmitButtonDisabled={Object.values(input).includes("")}
          />
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default withUserTypeSnackbar;
