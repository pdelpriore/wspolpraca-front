import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../config/apollo/client/ApolloClient";
import { auth, onAuthChanged } from "../../config/firebase/Firebase";
import Home from "../home/Home";
import "./App.css";

const App: React.FC = () => {
  const [isUserLogged, setUserLogged] = useState<boolean>(false);

  onAuthChanged(auth, (user) => {
    setUserLogged(user !== null);
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
