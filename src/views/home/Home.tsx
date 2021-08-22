import React from "react";
import useVisibility from "../../hooks/visibility/useVisibility";
import { SigningContext } from "../../context/signing/SigningContext";
import Trail from "./components/trail/Trail";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import "./home.css";

const Home: React.FC = () => {
  const [isSignupVisible, setSignupVisible] = useVisibility(false);

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
        {isSignupVisible ? (
          <SigningContext.Provider
            value={{
              showSignupForm: setSignupVisible,
            }}
          >
            <Signup />
          </SigningContext.Provider>
        ) : (
          <SigningContext.Provider
            value={{
              showSignupForm: setSignupVisible,
            }}
          >
            <Signin />
          </SigningContext.Provider>
        )}
      </div>
      <div className="home__slogan">slogan</div>
    </div>
  );
};

export default Home;
