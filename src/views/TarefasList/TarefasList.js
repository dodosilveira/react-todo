import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar, salvar, deletar, alterarStatus } from '../../store/tarefasReducer'

import { hideMsg } from '../../store/dialogReducer'

import { TarefasToolbar, TarefasTable } from './components';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefasList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, [] )

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable deletetarefa={props.deletar} alterarstatus={props.alterarStatus} tarefas={props.tarefas} />
      </div>
      <Dialog open={props.showMessage} onClose={props.hideMsg}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{props.messages}</DialogContent>
        <DialogActions>
          <Button onClick={props.hideMsg}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas,
  messages: state.messages.msg,
  showMessage: state.messages.showMsg
})

const mapDispatchToProps = dispatch => bindActionCreators({listar, salvar, deletar, alterarStatus, hideMsg}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (TarefasList);
