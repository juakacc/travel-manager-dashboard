import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import api from '../../services/api';
import Title from "../../components/Title";
import PageDefault from "../../components/PageDefault";

export default function Home(props) {
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
    <PageDefault>
      <Title title='Bem-vindo,' />

      {viagem ? (
        <div>
            <h2>Veículo que está com você:</h2>
            <p>{viagem.veiculo.nome}</p>
            <Button
                onClick={e => props.history.push('/concluir-viagem') }
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
                onClick={e => props.history.push('/escolher-veiculo') }
                fullWidth
                variant="contained"
                color="primary">
                Pegar Veículo
            </Button>

            <p>Sem viagem no momento...</p>
        </div>
        )}
    </PageDefault>
  );
}
