import React from "react";
import useVisibility, {
  IVisibility,
} from "../../hooks/visibility/useVisibility";
import { ShowingFormContext } from "../../context/signing/ShowingFormContext";
import Trail from "./components/trail/Trail";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import Google from "./components/google/Google";
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
          <span>Lorem</span>
          <span>Ipsum</span>
          <span>Dolor</span>
          <span>Sit</span>
        </Trail>
      </div>
      <div className="home__form">
        <Google />
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

export default Home;
