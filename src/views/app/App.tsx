import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import showMessage from "../../shared/showMessage";
import { client } from "../../config/apollo/client/ApolloClient";
import Home from "../home/Home";
import Snackbar from "../../components/notification/Snackbar";
import "./App.css";

const App: React.FC = () => {
  const { title, message, variant } = useReactiveVar(showMessage);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home}></Route>
          </Switch>
          <Snackbar
            className="container__snackbar"
            title={title}
            message={message}
            variant={variant}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
