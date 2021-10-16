import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
} from "react";
import { useHistory } from "react-router-dom";
import {
  auth,
  googleProvider,
  continueWithGoogle,
  getUserAdditionalInfo,
  setUserPersistence,
  userSignout,
} from "../../../../config/firebase/Firebase";
import { useMutation, useLazyQuery } from "@apollo/client";
import { client } from "../../../../config/apollo/client/ApolloClient";
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
import { GET_USER_TYPE } from "./query/GetUserType";
import { IUser } from "../shared/types/user/UserType";
import {
  TUserSignin,
  IUserSigninParams,
  ISigninVariables,
} from "../signin/types/SigninTypes";
import {
  TUserSignup,
  IUserSignupParams,
  ISignupVariables,
} from "../signup/types/SignupTypes";
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

  const history = useHistory();

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

  const [getUserType, { loading, error, data }] = useLazyQuery(GET_USER_TYPE, {
    context: {
      headers: {
        "x-auth": tokenId,
        "Content-Type": "application/json",
      },
    },
  });

  const signinMutation = getSigninMutation(
    capitalizeFirst(userType || data?.getUserType.userType)
  );
  const signupMutation = getSignupMutation(capitalizeFirst(userType));

  const [signinUser, { ["loading"]: signinLoading, ["error"]: signinError }] =
    useMutation<
      { signinYoutuber: IUser } | { signinBrand: IUser },
      | { signinYoutuberData?: IUserSigninParams }
      | { signinBrandData?: IUserSigninParams }
    >(signinMutation, {
      context: {
        headers: {
          "x-auth": tokenId,
          "Content-Type": "application/json",
        },
      },
      onCompleted: async ({
        [`signin${capitalizeFirst(
          userType || data?.getUserType.userType
        )}` as keyof TUserSignin]: signinUser,
      }) => {
        if (signinUser) {
          await userSignout(auth);
          client.resetStore();

          localStorage.setItem("user", JSON.stringify(signinUser));
          localStorage.setItem(
            "userId",
            JSON.stringify({ id: signinUser["id"] })
          );
          setIsUserCreated(Object.keys(signinUser).length > 0);

          history.push("/main");
        }
      },
    });

  const [signupUser, { ["loading"]: signupLoading, ["error"]: signupError }] =
    useMutation<
      { signupYoutuber: IUser } | { signupBrand: IUser },
      | { signupYoutuberData?: IUserSignupParams }
      | { signupBrandData?: IUserSignupParams }
    >(signupMutation, {
      context: {
        headers: {
          "x-auth": tokenId,
          "Content-Type": "application/json",
        },
      },
      onCompleted: ({
        [`signup${capitalizeFirst(userType)}` as keyof TUserSignup]: signupUser,
      }) => {
        if (signupUser) {
          setGoogleUserCredentials({} as UserCredential);
          setHandleRef({} as IGoogleAuth);
          signinUser({
            variables: {
              [`signin${capitalizeFirst(
                userType
              )}Data` as keyof ISigninVariables]: {
                email: userEmail,
              },
            },
          });
        }
      },
    });

  useImperativeHandle(ref, () => handleRef);

  useEffect(() => {
    if (Object.keys(googleUserCredentials).length > 0) {
      const { displayName, email, photoURL } =
        googleUserCredentials.user as User;

      const { isNewUser } = getUserAdditionalInfo(
        googleUserCredentials
      ) as AdditionalUserInfo;

      if (userEmail.length === 0) setUserEmail(email as string);

      if (userType.length > 0) {
        setHandleRef((ref) => ({
          ...ref,
          signGoogleUserCallback: () =>
            signupUser({
              variables: {
                [`signup${capitalizeFirst(
                  userType
                )}Data` as keyof ISignupVariables]: {
                  userType: userType as string,
                  name: displayName as string,
                  email: email as string,
                  picture: photoURL as string,
                },
              },
            }),
        }));
      } else if (isNewUser) {
        showUserTypeSnackbar({ val: true });
      } else {
        getUserType({ variables: { getUserTypeEmail: email } });
      }
    }
  }, [
    googleUserCredentials,
    userType,
    userEmail,
    signinUser,
    signupUser,
    getUserType,
    showUserTypeSnackbar,
  ]);

  useEffect(() => {
    if (data?.getUserType.userType && userEmail) {
      signinUser({
        variables: {
          [`signin${capitalizeFirst(
            data.getUserType.userType
          )}Data` as keyof ISigninVariables]: {
            email: userEmail,
          },
        },
      });
    }
  }, [data, userEmail, signinUser]);

  useEffect(() => {
    setUserDataLoader(signupLoading || signinLoading);
  }, [signupLoading, signinLoading, setUserDataLoader]);

  return isLoading || loading ? (
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
