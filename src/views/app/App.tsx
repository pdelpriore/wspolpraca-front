import React from "react";
import withSnackbar from "../../components/notification/withSnackbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../config/apollo/client/ApolloClient";
import { useReactiveVar } from "@apollo/client";
import getUser from "../../shared/getUser";
import Home from "../home/Home";
import Main from "../main/Main";
import "./App.css";

const App: React.FC = () => {
  const user = useReactiveVar(getUser);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/main" exact component={Main} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default withSnackbar(App);
