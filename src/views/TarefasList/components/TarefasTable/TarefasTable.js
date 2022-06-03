import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  IconButton,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteForeverIcon from '@material-ui/icons/Delete';

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas'
const headers = {'x-tenant-id' : 'douglas.infa@gmail.com'}

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const deletar = (tarefa) => {
  axios.delete(API_URL, tarefa, {
    headers: headers
  }).then( response => {
    listar()
  }).catch ( erro => {
    console.log(erro)
  })
}

const TarefasTable = props => {
  const { className, tarefas, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align='center'>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map( tarefa => {
                    return(
                      <TableRow key={tarefa.id}>
                        <TableCell>{tarefa.id}</TableCell>
                        <TableCell>{tarefa.descricao}</TableCell>
                        <TableCell>{tarefa.categoria}</TableCell>
                        <TableCell>{tarefa.done ? 'Feito' : 'Pendente'}</TableCell>
                        <TableCell align='center'>
                          
                          <IconButton onClick={e => props.alterarstatus(tarefa.id)} color="secondary">
                            {tarefa.done ? 
                              (
                                <DoneAllIcon />
                              ) : 
                              (
                                <TimerIcon />
                              )
                            }
                          </IconButton>

                          <IconButton onClick={e => props.deletetarefa(tarefa.id)} aria-label="delete">
                            <DeleteForeverIcon />
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TarefasTable.propTypes = {
  className: PropTypes.string,
  tarefas: PropTypes.array.isRequired
};

export default TarefasTable;
