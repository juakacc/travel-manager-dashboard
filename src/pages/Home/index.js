import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import api from '../../services/api';

export default function Home() {
    const [viagem, setViagem] = useState(null);

    useEffect(() => {
        api.get(`viagens/atual`)
        .then(res => {
            setViagem(res.data);
        })
        .catch(err => {
            setViagem(null);
            console.log(err);
        });
    }, []);

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Bem-vindo, usuário.
          </Typography>

          {viagem ? (
            <div>
                <h2>Veículo que está com você:</h2>
                <p>{viagem.veiculo.nome}</p>
                <Button
                    onClick={e => console.log('pegar veiculo...') }
                    fullWidth
                    variant="contained"
                    color="primary">
                    Entregar Veículo
                </Button>

                <div>
                    <p>Detalhes da viagem <b>#{viagem.id}</b></p>
                    <p>Momento da saída: <b>{viagem.saida}</b></p>
                    <p>KM registrado na saída: <b>{viagem.km_inicial} KM</b></p>
                </div>
            </div>
            ) : (
            <div>
                <Button
                    onClick={e => console.log('pegar veiculo...') }
                    fullWidth
                    variant="contained"
                    color="primary">
                    Pegar Veículo
                </Button>

                <p>Sem viagem no momento...</p>
            </div>
            )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}
