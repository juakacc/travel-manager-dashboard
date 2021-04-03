import React, { useEffect, useState } from "react";
import { Container, List, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import ChevronRight from '@material-ui/icons/ChevronRight';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import api from '../../services/api';
import Title from "../../components/Title";
import { useHistory } from "react-router";

export default function EscolherVeiculo(props) {
  const [veiculos, setVeiculos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get(`viagens/atual`)
      .then(() => {
        window.flash('Você já está viajando...');
        history.push('/home');
      })
      .catch(err => {});
  }, [history]);

  useEffect(() => {
    api.get('veiculos/disponiveis')
      .then(res => {
        setVeiculos(res.data);
      })
      .catch(err => {
          window.flash(err.response.data.mensagem);
          setVeiculos([]);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          <Title title="Escolha um veículo" />
          <List>
            {veiculos.map(v => (
              <ListItem button key={v.id} component="button" onClick={() => {
                  props.history.push({
                    pathname: '/iniciar-viagem',
                    state: { idVeiculo: v.id }
                  });
                }}>
                <ListItemIcon>
                  <ChevronRight />
                </ListItemIcon>
                <ListItemText primary={v.nome} />
              </ListItem>
            ))}
          </List>          
        </div>
      </Container>
      <Footer />
    </div>
  );
}
