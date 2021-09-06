import React, { useEffect, useState } from "react";
import { Toast, ToastContainer, Fade } from "react-bootstrap";
import showMessage from "../../shared/showMessage";
import "./snackbar.css";

interface ISnackbarProps {
  className?: string;
  title?: string;
  message?: string;
  variant?: string;
}

const Snackbar: React.FC<ISnackbarProps> = ({
  className,
  title,
  message,
  variant,
}) => {
  const [isToastVisible, setToastVisible] = useState<boolean>(false);

  const handleHideToast = () => {
    setToastVisible(false);
    showMessage({});
  };

  useEffect(() => {
    if (title && message) setToastVisible(true);
  }, [title, message]);

  return (
    <ToastContainer className={className} position="bottom-center">
      <Toast
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
    </ToastContainer>
  );
};

export default Snackbar;
