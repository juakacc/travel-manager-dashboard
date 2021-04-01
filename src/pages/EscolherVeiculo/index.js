import React, { useEffect, useState } from "react";
import { Button, Typography, Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import api from '../../services/api';

export default function EscolherVeiculo(props) {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        api.get('veiculos/disponiveis')
            .then(res => {
                console.log(res.data);
                setVeiculos(res.data);
            })
            .catch(err => {
                console.log(err);
                setVeiculos([]);
            });
    }, []);

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Escolha um veículo:
          </Typography>
            {veiculos.map(v => (
                <Button
                    onClick={e => {
                        console.log(v.id);
                        props.history.push('/iniciar-viagem');
                    }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    key={v.id} >
                    {v.nome}
                </Button>
            ))}          
        </div>
      </Container>
      <Footer />
    </div>
  );
}
