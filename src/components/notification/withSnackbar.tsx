import React, { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { Toast, Fade } from "react-bootstrap";
import useVisibility from "../../hooks/visibility/useVisibility";
import showMessage from "../../shared/showMessage";
import "./snackbar.css";

const withSnackbar = (Component: React.FC) => () => {
  const { title, message, variant } = useReactiveVar(showMessage);

  const [isToastVisible, setToastVisible] = useVisibility<boolean>(false);

  const handleHideToast = () => {
    setToastVisible({ val: false });
    showMessage({});
  };

  useEffect(() => {
    if (title && message) setToastVisible({ val: true });
  }, [title, message]);

  return (
    <div className="wrapper">
      <Component />
      <Toast
        className="wrapper_toast"
        show={isToastVisible}
        onClose={handleHideToast}
        bg={variant}
        delay={2500}
        autohide
        animation
        transition={Fade}
      >
        <Toast.Header closeButton={false}>
          <strong>{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default withSnackbar;
function _(_: any, arg1: boolean) {
  throw new Error("Function not implemented.");
}
