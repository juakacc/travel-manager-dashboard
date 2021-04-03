import React, { useEffect, useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";

import api from '../../services/api';
import { isAuthenticated, login } from '../../services/auth';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Title from '../../components/Title';
import useStyles from "./styles";

export default function Login(props) {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated()) {
      props.history.push('/home');
    }
  }, [props])

  const isValid = () => {
    if (apelido.trim() === '') {
      window.flash('Preencha o apelido');
      return false;
    }
    if (senha.trim() === '') {
      window.flash('Preencha a senha');
      return false;
    }
    return true;
  };

  const handleLogin = e => {
    e.preventDefault()

    if (isValid()) {

      api.post('login', {
          apelido: apelido,
          senha: senha,
        })
        .then(res => {
          const token = res.data.token;
          login(token);
          props.history.push('/home');
        })
        .catch(err => {
          window.flash(err.response.data.mensagem);
        });
    }
  }

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Title title='Login' />
          
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Apelido"
              name="apelido"
              autoFocus
              onChange={e => setApelido(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setSenha(e.target.value)}
            />
            <div>
              <Button
                onClick={e => handleLogin(e) }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
