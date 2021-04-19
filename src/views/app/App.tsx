import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../home/Home";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
