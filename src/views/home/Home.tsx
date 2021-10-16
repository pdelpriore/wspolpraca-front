import React from "react";
import useVisibility, {
  IVisibility,
} from "../../hooks/visibility/useVisibility";
import withUserTypeSnackbar from "./components/userTypeSnackbar/withUserTypeSnackbar";
import { ShowingFormContext } from "../../context/signing/ShowingFormContext";
import Trail from "./components/trail/Trail";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import GoogleAuth from "./components/google/GoogleAuth";
import "./home.css";

const Home: React.FC = () => {
  const initFormVisibility = {
    signinForm: true,
    signupForm: false,
    forgotPasswordForm: false,
  };
  const [isFormVisible, setFormVisibility] =
    useVisibility<IVisibility>(initFormVisibility);

  return (
    <div className="home">
      <div className="home__logo">logo</div>
      <div className="home__trail">
        <Trail>
          <span>Nawiąż</span>
          <span>Współpracę</span>
          <span>Youtuber</span>
          <span>Marka</span>
        </Trail>
      </div>
      <div className="home__form">
        <GoogleAuth />
        {isFormVisible.signupForm ? (
          <ShowingFormContext.Provider
            value={{
              showForm: setFormVisibility,
            }}
          >
            <Signup />
          </ShowingFormContext.Provider>
        ) : isFormVisible.signinForm ? (
          <ShowingFormContext.Provider
            value={{
              showForm: setFormVisibility,
            }}
          >
            <Signin />
          </ShowingFormContext.Provider>
        ) : (
          <ShowingFormContext.Provider
            value={{
              showForm: setFormVisibility,
            }}
          >
            <ForgotPassword />
          </ShowingFormContext.Provider>
        )}
      </div>
      <div className="home__slogan">slogan</div>
    </div>
  );
};

export default withUserTypeSnackbar(Home);
