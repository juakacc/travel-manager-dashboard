import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { isAuthenticated } from './services/auth';

import Login from "./pages/Login";
import Home from "./pages/Home";

const PrivateRoute = ({ component: Component }) => (
  <Route
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/'}} />
      )} />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
