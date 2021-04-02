import React from "react";

import { Typography, Link } from "@material-ui/core";
import useStyles from "./styles";

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://olivedos.pb.gov.br">
          Viagens PMO
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
}
