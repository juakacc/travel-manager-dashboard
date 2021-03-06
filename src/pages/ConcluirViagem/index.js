import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Checkbox, FormControlLabel } from "@material-ui/core";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useStyles from './styles';

import api from '../../services/api';
import Title from "../../components/Title";
import { useHistory } from "react-router";

export default function ConcluirViagem(props) {
    const [viagemId, setViagemId] = useState(0);
    const [quilometragem, setQuilometragem] = useState(0);
    const [kmInicial, setKmInicial] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [sem_movimentacao, setSemMovimentacao] = useState(false);
    
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
      api
        .get(`viagens/atual`)
        .then(res => {
          const { id, km_inicial, descricao, veiculo } = res.data;

          setViagemId(id);
          setQuilometragem(veiculo.quilometragem);
          setDescricao(descricao);
          setKmInicial(km_inicial);
        })
        .catch(err => {
          window.flash('Sem viagem no momento!');
          history.push('/home');
        });
    }, [history]);

    const isValid = () => {

      if (sem_movimentacao) {
        return true;
      }
      
      if (isNaN(quilometragem)) {
        window.flash('Insira uma quilometragem válida!');
        return false;
      }
      
      if (parseFloat(quilometragem) < parseFloat(kmInicial)) {
        window.flash('A quilometragem final não pode ser menor que a inicial!');
        return false;
      }
  
      if (kmInicial === quilometragem) {
        window.flash('Para viagens sem movimentação marque a opção!');
        return false;
      }  
      return true;
    };

  const handleSubmit = e => {
    e.preventDefault();

    if (isValid()) {
      const viagem = {
        descricao: sem_movimentacao ? `Sem movimentação ${descricao}` : descricao,
        km_final: quilometragem,
      }

      api
        .put(`viagens/${viagemId}`, viagem)
          .then(() => {
            window.flash('Viagem concluída!');
            props.history.push('/home');
          })
          .catch(err => {
            window.flash('Ocorreu um erro, tente novamente!');
          });
    }
  }

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          <Title title='Concluir Viagem' />

          <h2>Viagem: #{viagemId}</h2>

          <p>Complete os dados a seguir sobre a viagem</p>
          <p>(Altere a quilometragem para a qual é registrada no painel do veículo)</p>

          <form className={classes.form} noValidate>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sem_movimentacao}
                  onChange={e => setSemMovimentacao(e.target.checked)}
                  name="sem_movimentacao"
                  color="primary"
                />
              }
              label="Viagem sem movimentação?"
            />

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
              disabled={sem_movimentacao}
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
                Concluir Viagem
              </Button>
            </div>
          </form>          
        </div>
      </Container>
      <Footer />
    </div>
  );
}
