import React, { useEffect, useState } from "react";
import { Button, TextField, Container } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useStyles from './styles';

import api from '../../services/api';
import Title from "../../components/Title";

export default function IniciarViagem(props) {
    const [veiculoNome, setVeiculoNome] = useState('');
    const [quilometragem, setQuilometragem] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [idVeiculo] = useState(props.location.state?.idVeiculo);

    const classes = useStyles();

    useEffect(() => {
      
      if (idVeiculo) {
        // const { idVeiculo } = props.location.state;

        api.get(`veiculos/${idVeiculo}`)
          .then(res => {
            setVeiculoNome(res.data.nome);
            setQuilometragem(res.data.quilometragem);
          })
          .catch(err => {
            //this.props.setMensagem('Veículo inválido');
            console.log(err);
            props.history.goBack();
          });
      } else {
        //this.props.setMensagem('Veículo inválido');
        props.history.goBack();
      }
    }, [props, idVeiculo]);

    const isValid = () => {
        
      if (isNaN(quilometragem) || quilometragem <= 0) {
        console.log('Insira uma quilometragem válida!');
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
            // dispatch(setMensagem('Viagem iniciada. Siga as leis de trânsito'));
            props.history.push('/home');
          })
          .catch(err => {
            console.log(err);
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
            onClick={e => props.history.goBack() }
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
