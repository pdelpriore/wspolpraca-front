import React, { useState } from "react";
import {
  auth,
  googleProvider,
  continueWithGoogle,
} from "../../../../config/firebase/Firebase";
import useLoader from "../../../../hooks/loader/useLoader";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Google: React.FC = () => {
  const [isLoading, setLoader] = useLoader<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");

  const handleContinueWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoader(true);
      const credentials = await continueWithGoogle(auth, googleProvider);
      const idToken = await credentials.user.getIdToken();

      setTokenId(idToken);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      if (err) console.log(err);
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

export default Google;
