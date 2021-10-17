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
import getUserId, { IReactiveUserId } from "../../shared/getUserId";
import Home from "../home/Home";
import Main from "../main/Main";
import "./App.css";

const App: React.FC = () => {
  const { userId } =
    useReactiveVar<IReactiveUserId>(getUserId) || ({} as IReactiveUserId);
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          {userId && <Route path="/" exact component={Home} /> ? (
            <Redirect from="/" to="/main" exact />
          ) : (
            <Route path="/" exact component={Home} />
          )}
          {userId ? (
            <Route path="/main" exact component={Main} />
          ) : (
            <Redirect to="/" exact />
          )}
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default withSnackbar(App);
