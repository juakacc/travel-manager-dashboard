import React, { useEffect, useState } from "react";
import { Snackbar, IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import Bus from "../../services/Bus";

export default function ShowMessage() {
  const [open, setOpen] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    Bus.addListener('flash', message => {
      setOpen(true);
      setMensagem(message);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    })
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      //autoHideDuration={3000}
      onClose={handleClose}
      message={mensagem}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
