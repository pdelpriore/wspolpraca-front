import React, { useState, useContext, useImperativeHandle } from "react";
import {
  auth,
  googleProvider,
  continueWithGoogle,
  getUserAdditionalInfo,
} from "../../../../config/firebase/Firebase";
import { AdditionalUserInfo, User, UserCredential } from "@firebase/auth";
import useLoader from "../../../../hooks/loader/useLoader";
import { UserTypeContext } from "../../context/UserTypeContext";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleAuth: React.FC = () => {
  const [isLoading, setLoader] = useLoader<boolean>(false);

  const [googleUserCredentials, setGoogleUserCredentials] =
    useState<UserCredential>({} as UserCredential);

  const [tokenId, setTokenId] = useState<string>("");

  const { userType, ref, showUserTypeSnackbar } = useContext(UserTypeContext);

  const signGoogleUser = async () => {
    try {
      setLoader(true);
      const credentials = await continueWithGoogle(auth, googleProvider);
      setGoogleUserCredentials(credentials);

      const idToken = await credentials.user.getIdToken();
      setTokenId(idToken);

      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  const { displayName, email, photoURL } = googleUserCredentials.user as User;

  const { isNewUser } = getUserAdditionalInfo(
    googleUserCredentials
  ) as AdditionalUserInfo;

  if (isNewUser) {
    // pass signupUser instead of signGoogleUser
    // useImperativeHandle(ref, () => ({
    //   signGoogleUserCallback: signGoogleUser,
    // }));
    // showUserTypeSnackbar({ val: true })
    // pass signup loading data status to the snackbar
    // signup is call from snackbar and
    // displayName, email; photoURL is passed to the backend
    // onCompleted signin is called
    // pass sigin loading data status to the snackbar
    // on signin data loaded close snackbar
  } else {
    // signin is called
  }

  const handleSignGoogleUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signGoogleUser();
  };

  return isLoading ? (
    <Spinner animation="border" size="sm" />
  ) : (
    <Button
      variant="warning"
      onClick={handleSignGoogleUser}
      disabled={Object.keys(googleUserCredentials).length > 0}
    >
      <FontAwesomeIcon icon={faGoogle} />
      Kontynuuj z Google
    </Button>
  );
};

export default GoogleAuth;
