import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { isAuthenticated, logout } from './services/auth';

import Login from "./pages/Login";
import Home from "./pages/Home";
import EscolherVeiculo from "./pages/EscolherVeiculo";
import IniciarViagem from "./pages/IniciarViagem";
import ConcluirViagem from "./pages/ConcluirViagem";

const PrivateRoute = ({ component: Component }) => (
  <Route
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/'}} />
      )} />
);

const Logout = props => {
  logout();
  props.history.push('/');
  return null;
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/escolher-veiculo" component={EscolherVeiculo} />
        <PrivateRoute path="/iniciar-viagem" component={IniciarViagem} />
        <PrivateRoute path="/concluir-viagem" component={ConcluirViagem} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}
