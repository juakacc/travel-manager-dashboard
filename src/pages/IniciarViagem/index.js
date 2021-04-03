import React, { useEffect, useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useStyles from './styles';

import api from '../../services/api';
import Title from "../../components/Title";
import { useHistory } from "react-router";

export default function IniciarViagem(props) {
    const [veiculoNome, setVeiculoNome] = useState('');
    const [quilometragem, setQuilometragem] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [idVeiculo] = useState(props.location.state?.idVeiculo);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
      
      if (idVeiculo) {

        api.get(`veiculos/${idVeiculo}`)
          .then(res => {
            setVeiculoNome(res.data.nome);
            setQuilometragem(res.data.quilometragem);
          })
          .catch(err => {
            window.flash('Veículo não encontrado!');
            history.push('/home');
          });
      } else {
        history.push('/home');
      }
    }, [history, idVeiculo]);

    const isValid = () => {
        
      if (isNaN(quilometragem) || quilometragem <= 0) {
        window.flash('Insira uma quilometragem válida!');
        setQuilometragem(0);
        return false;
      }
      return true;
    };

    const handleSubmit = e => {
      e.preventDefault();

      if (isValid()) {
        const viagem = {
          descricao,
          km_inicial: quilometragem,
          veiculo: idVeiculo,
        };
        
        api
          .post('viagens', viagem)
          .then(res => {
            window.flash('Viagem iniciada!');
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
        <div>
          <Title title='Iniciar Viagem' />

          <h2>Veículo: {veiculoNome}</h2>

          <Button
            onClick={e => history.push('/escolher-veiculo') }
            fullWidth
            variant="contained"
            color="primary">
            Alterar Veículo
          </Button>

          <p>Qual a quilometragem atual registrada no veículo?</p>
          <p>(Altere o valor prosposto para o valor marcado no painel do veículo)</p>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="km"
              label="Quilometragem"
              name="km"
              type="number"
              autoFocus
              value={quilometragem}
              onChange={e => setQuilometragem(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="descricao"
              label="Descrição"
              name="descricao"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
            <div>
              <Button
                onClick={e => handleSubmit(e) }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Iniciar Viagem
              </Button>
            </div>
          </form>          
        </div>
      </Container>
      <Footer />
    </div>
  );
}
