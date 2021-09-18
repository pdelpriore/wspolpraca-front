import React, { useState, useContext, useImperativeHandle } from "react";
import {
  auth,
  googleProvider,
  continueWithGoogle,
  getUserAdditionalInfo,
} from "../../../../config/firebase/Firebase";
import { AdditionalUserInfo, User } from "@firebase/auth";
import useLoader from "../../../../hooks/loader/useLoader";
import { UserTypeContext } from "../../context/UserTypeContext";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleAuth: React.FC = () => {
  const [isLoading, setLoader] = useLoader<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");

  const { userType, ref, showUserTypeSnackbar } = useContext(UserTypeContext);

  const signGoogleUser = async () => {
    try {
      setLoader(true);
      const credentials = await continueWithGoogle(auth, googleProvider);

      const idToken = await credentials.user.getIdToken();
      setTokenId(idToken);

      const { displayName, email, photoURL } = credentials.user as User;

      const { isNewUser } = getUserAdditionalInfo(
        credentials
      ) as AdditionalUserInfo;

      // isNewUser ? signup && signin : signin
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useImperativeHandle(ref, () => ({
    signGoogleUserCallback: signGoogleUser,
  }));

  const handleShowUserTypeSnackbar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    showUserTypeSnackbar({ val: true });
  };

  return isLoading ? (
    <Spinner animation="border" size="sm" />
  ) : (
    <Button variant="warning" onClick={handleShowUserTypeSnackbar}>
      <FontAwesomeIcon icon={faGoogle} />
      Kontynuuj z Google
    </Button>
  );
};

export default GoogleAuth;
