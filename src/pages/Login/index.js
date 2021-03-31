import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useStyles from "./styles";
import ShowMessage from "../../components/ShowMessage";

export default function Login() {
  const [loginOK, setLoginOk] = useState(false);

  const classes = useStyles();

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
            />
            <div>
              <Button
                onClick={(a) => {
                  a.preventDefault();
                  setLoginOk(true);
                }}
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
