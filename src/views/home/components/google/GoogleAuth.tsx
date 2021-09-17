import React, { useState } from "react";
import {
  auth,
  googleProvider,
  continueWithGoogle,
  getUserAdditionalInfo,
} from "../../../../config/firebase/Firebase";
import { AdditionalUserInfo } from "@firebase/auth";
import useLoader from "../../../../hooks/loader/useLoader";
import getUserType from "./method/getUserType";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleAuth: React.FC = () => {
  const [isLoading, setLoader] = useLoader<boolean>(false);
  const [userType, setUserType] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");

  const handleContinueWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoader(true);
      // const user = await getUserType()
      // setUserType(user)

      const credentials = await continueWithGoogle(auth, googleProvider);
      const idToken = await credentials.user.getIdToken();

      const { isNewUser } = getUserAdditionalInfo(
        credentials
      ) as AdditionalUserInfo;

      // isNewUser ? signup : signin

      setTokenId(idToken);
      setLoader(false);
    } catch (err) {
      if (err) {
        setLoader(false);
        console.log(err);
      }
    }
  };
  return isLoading ? (
    <Spinner animation="border" size="sm" />
  ) : (
    <Button variant="warning" onClick={handleContinueWithGoogle}>
      <FontAwesomeIcon icon={faGoogle} />
      Kontynuuj z Google
    </Button>
  );
};

export default GoogleAuth;
