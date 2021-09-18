import React, { useRef } from "react";
import { MutableRefObject } from "react";
import { Toast, Fade } from "react-bootstrap";
import { UserTypeContext } from "../../context/UserTypeContext";
import useForm from "../../../../hooks/form/useForm";
import useVisibility from "../../../../hooks/visibility/useVisibility";
import UserTypeForm from "../form/userTypeForm/UserTypeForm";
import { TUserTypeInput } from "../form/userTypeForm/type/userTypeInputType";
import "./userTypeSnackbar.css";

type TGoogleAuth = () => Promise<void>;

export interface IGoogleAuth {
  signGoogleUserCallback: TGoogleAuth;
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

  const handleSubmitUserTypeForm = (e: React.FormEvent) => {
    e.preventDefault();
    googleAuthRef.current?.signGoogleUserCallback();
    setToastVisibility({ val: false });
  };

  return (
    <div className="wrapper">
      <UserTypeContext.Provider
        value={{
          userType: input.usertype,
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
            onSubmitInput={handleSubmitUserTypeForm}
            onCancelForm={handleCancelUserTypeForm}
            isSubmitButtonDisabled={Object.values(input).includes("")}
          />
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default withUserTypeSnackbar;
