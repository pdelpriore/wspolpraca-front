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
  setUserPersistence,
  userSignout,
} from "../../../../config/firebase/Firebase";
import { useMutation } from "@apollo/client";
import {
  AdditionalUserInfo,
  User,
  UserCredential,
  inMemoryPersistence,
} from "@firebase/auth";
import { IGoogleAuth } from "../userTypeSnackbar/withUserTypeSnackbar";
import useLoader from "../../../../hooks/loader/useLoader";
import { UserTypeContext } from "../../context/UserTypeContext";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import getSignupMutation from "../signup/method/getSignupMutation";
import getSigninMutation from "../signin/method/getSigninMutation";
import { capitalizeFirst } from "../../../../shared/capitalize";

const GoogleAuth: React.FC = () => {
  const [isLoading, setLoader] = useLoader<boolean>(false);

  const [tokenId, setTokenId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [googleUserCredentials, setGoogleUserCredentials] =
    useState<UserCredential>({} as UserCredential);

  const [handleRef, setHandleRef] = useState<IGoogleAuth>({} as IGoogleAuth);

  const {
    userType,
    ref,
    showUserTypeSnackbar,
    setUserDataLoader,
    setIsUserCreated,
  } = useContext(UserTypeContext);

  const signGoogleUser = async () => {
    try {
      setLoader(true);
      await setUserPersistence(auth, inMemoryPersistence);

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

  const signinMutation = getSigninMutation(capitalizeFirst(userType));
  const signupMutation = getSignupMutation(capitalizeFirst(userType));

  const [signinUser, { ["loading"]: signinLoading, ["error"]: signinError }] =
    useMutation(signinMutation, {
      context: {
        headers: {
          "x-auth": tokenId,
          "Content-Type": "application/json",
        },
      },
      onCompleted: async ({
        [`signin${capitalizeFirst(userType)}`]: signinUser,
      }) => {
        if (signinUser) {
          await userSignout(auth);
          setIsUserCreated(Object.keys(signinUser).length > 0);
          console.log("user logged in");
        }
      },
    });

  const [signupUser, { ["loading"]: signupLoading, ["error"]: signupError }] =
    useMutation(signupMutation, {
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
          signinUser({
            variables: {
              [`signin${capitalizeFirst(userType)}Data`]: {
                email: userEmail,
              },
            },
          });
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

      if (!userEmail) setUserEmail(email as string);

      if (userType.length > 0) {
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
      } else if (isNewUser) {
        showUserTypeSnackbar({ val: true });
      } else {
        console.log("signin will be called here");
      }
    }
  }, [
    googleUserCredentials,
    userType,
    userEmail,
    signupUser,
    showUserTypeSnackbar,
  ]);

  useEffect(() => {
    setUserDataLoader(signupLoading);
    setUserDataLoader(signinLoading);
  }, [signupLoading, signinLoading, setUserDataLoader]);

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
