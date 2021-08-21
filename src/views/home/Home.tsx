import React from "react";
import Trail from "./components/trail/Trail";
import Signup from "../../components/signup/Signup";
import { capitalizeFirst } from "../../shared/capitalize";
import "./home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__logo">logo</div>
      <div className="home__trail">
        <Trail>
          <span>{capitalizeFirst("lorem")}</span>
          <span>{capitalizeFirst("ipsum")}</span>
          <span>{capitalizeFirst("dolor")}</span>
          <span>{capitalizeFirst("sit")}</span>
        </Trail>
      </div>
      <div className="home__form">
        <Signup />
      </div>
      <div className="home__slogan">slogan</div>
    </div>
  );
};

export default Home;
