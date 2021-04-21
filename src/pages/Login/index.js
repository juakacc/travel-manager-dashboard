import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import api from '../../services/api';
import { isAuthenticated, login } from '../../services/auth';

import Title from '../../components/Title';
import useStyles from "./styles";
import PageDefault from "../../components/PageDefault";

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
          apelido: apelido.toLowerCase(),
          senha,
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
    <PageDefault>
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
          value={apelido}
          onChange={e => setApelido(e.target.value.toLowerCase())}
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
          value={senha}
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
    </PageDefault>
  );
}
