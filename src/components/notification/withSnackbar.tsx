import React, { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { Toast, Fade } from "react-bootstrap";
import useVisibility from "../../hooks/visibility/useVisibility";
import showMessage from "../../shared/showMessage";
import "./snackbar.css";

const withSnackbar = (Component: React.FC) => () => {
  const { title, message, variant } = useReactiveVar(showMessage);

  const [isToastVisible, setToastVisibility] = useVisibility<boolean>(false);

  const handleHideToast = () => {
    setToastVisibility({ val: false });
  };

  useEffect(() => {
    if (title && message) setToastVisibility({ val: true });
  }, [title, message, setToastVisibility]);

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
