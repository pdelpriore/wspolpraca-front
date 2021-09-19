import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
} from "react";
import {
  auth,
  googleProvider,
  continueWithGoogle,
  getUserAdditionalInfo,
} from "../../../../config/firebase/Firebase";
import { useMutation } from "@apollo/client";
import { AdditionalUserInfo, User, UserCredential } from "@firebase/auth";
import { IGoogleAuth } from "../userTypeSnackbar/withUserTypeSnackbar";
import useLoader from "../../../../hooks/loader/useLoader";
import { UserTypeContext } from "../../context/UserTypeContext";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import getMutation from "../signup/method/getMutation";
import { capitalizeFirst } from "../../../../shared/capitalize";

const GoogleAuth: React.FC = () => {
  const [isLoading, setLoader] = useLoader<boolean>(false);

  const [googleUserCredentials, setGoogleUserCredentials] =
    useState<UserCredential>({} as UserCredential);

  const [handleRef, setHandleRef] = useState<IGoogleAuth>({} as IGoogleAuth);

  const [tokenId, setTokenId] = useState<string>("");

  const {
    userType,
    ref,
    showUserTypeSnackbar,
    setSnackbarLoader,
    setIsUserSignedup,
  } = useContext(UserTypeContext);

  const mutation = getMutation(capitalizeFirst(userType));

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

  const handleSignGoogleUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signGoogleUser();
  };

  const [signupUser, { loading, error }] = useMutation(mutation, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
    onCompleted: ({ [`signup${capitalizeFirst(userType)}`]: signupUser }) => {
      if (signupUser) {
        setGoogleUserCredentials({} as UserCredential);
        setHandleRef({} as IGoogleAuth);
        // will be removed in the new implementation
        setIsUserSignedup(Object.keys(signupUser).length > 0);
        console.log("signin will be called");
        // onCompleted userSingin
        // setIsUserSignedup(Object.keys(signupUser).length > 0);
      }
    },
  });

  useImperativeHandle(ref, () => handleRef!, [handleRef]);

  useEffect(() => {
    if (Object.keys(googleUserCredentials).length > 0) {
      const { displayName, email, photoURL } =
        googleUserCredentials.user as User;

      const { isNewUser } = getUserAdditionalInfo(
        googleUserCredentials
      ) as AdditionalUserInfo;

      if (isNewUser) {
        setHandleRef((ref) => ({
          ...ref,
          signGoogleUserCallback: () =>
            signupUser({
              variables: {
                [`signup${capitalizeFirst(userType)}Data`]: {
                  userType: userType,
                  name: displayName,
                  email: email,
                  picture: photoURL,
                },
              },
            }),
        }));

        showUserTypeSnackbar({ val: true });
      } else {
        console.log("signin will be called");
      }
    }
  }, [googleUserCredentials, userType, signupUser, showUserTypeSnackbar]);

  useEffect(() => {
    setSnackbarLoader(loading);
  }, [loading, setSnackbarLoader]);

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
