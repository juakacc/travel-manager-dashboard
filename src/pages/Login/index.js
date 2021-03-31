import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@material-ui/core";
import api from '../../services/api';
import { login } from '../../services/auth';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useStyles from "./styles";
import ShowMessage from "../../components/ShowMessage";

export default function Login() {
  const [loginOK, setLoginOk] = useState(false);
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const classes = useStyles();

  const isValid = () => {
    if (apelido.trim() === '') {
      console.log('Preencha o apelido');
      return false;
    }
    if (senha.trim() === '') {
      console.log('Preencha a senha');
      return false;
    }
    return true;
  };

  const handleLogin = e => {
    e.preventDefault()
    // setLoginOk(true);

    if (isValid()) {

      api.post('login', {
          apelido: apelido,
          senha: senha,
        })
        .then(res => {
          const token = res.data.token;
          login(token)
          // verificar necessidade posterior
          // api.get(`motoristas/${res.data.id}`, {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   })
          //   .then(motorista => {
          //     // salvar no localStorage
          //     user.id = motorista.data.id;
          //     user.nome = motorista.data.nome;
          //     user.token = token;
          //     user.permissoes = motorista.data.permissoes;

          //     console.log(user);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
        })
        .catch(err => {
          console.log(err);
        });
    }
    // setLoginOk(false);
  }

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
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
        {loginOK && <ShowMessage />}
      </Container>
      <Footer />
    </div>
  );
}
