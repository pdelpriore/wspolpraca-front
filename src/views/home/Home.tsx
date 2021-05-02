import React from "react";
import Trail from "../../components/trail/Trail";
import { capitalizeFirst } from "../../methods/capitalize";
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
      <div className="home__form">forms</div>
      <div className="home__slogan">slogan</div>
    </div>
  );
};

export default Home;
