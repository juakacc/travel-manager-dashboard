import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import api from '../../services/api';

export default function IniciarViagem(props) {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        // api.get('veiculos/disponiveis')
        //     .then(res => {
        //         console.log(res.data);
        //         setVeiculos(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setVeiculos([]);
        //     });
    }, []);

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Iniciar Viagem
          </Typography>
          <p>Qual a quilometragem atual registrada no veículo?</p>
          <p>(Altere o valor prosposto para o valor marcado no painel do veículo)</p>
            <Button
                onClick={e => console.log('iniciando viagem...') }
                fullWidth
                variant="contained"
                color="primary">
                Iniciar Viagem
            </Button>          
        </div>
      </Container>
      <Footer />
    </div>
  );
}
