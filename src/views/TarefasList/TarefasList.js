import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import axios from 'axios';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas'

const TarefasList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
    }).then( response => {
      const novaTarefa = response.data
      setTarefas( [...tarefas], novaTarefa )
      setMensagem('Tarefa adicionada com sucesso.')
      setOpenDialog(true)
      listar();
    }).catch ( erro => {
      setMensagem(erro.message)
      setOpenDialog(true)
    })
  }

  const listar = () => {
    axios.get(API_URL,{
      headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
    }).then( response => {
      const listaTarefas = response.data
      setTarefas(listaTarefas)
    }).catch ( erro => {
      setMensagem(erro)
      setOpenDialog(true)
    })
  }

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
    }).then( response => {
      setMensagem('Status alterado com sucesso.')
      setOpenDialog(true)
      listar();
    }).catch ( erro => {
      setMensagem(erro)
      setOpenDialog(true)
    })
  }

  const deletar = (id) => {
    axios.delete(`${API_URL}/${id}`, {
      headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
    }).then( response => {
      setMensagem('Tarefa excluída com sucesso.')
      setOpenDialog(true)
      listar();
    }).catch ( erro => {
      setMensagem(erro)
      openDialog(true)
    })
  }

  useEffect(() => {
    listar();
  }, [] )

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable deletetarefa={deletar} alterarstatus={alterarStatus} tarefas={tarefas} />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{mensagem}</DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefasList;
