import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Button, 
  TextField, 
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TarefasToolbar = props => {
  const { className, ...rest } = props;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const tarefa = {
      descricao: descricao,
      categoria: categoria
    }
    props.salvar(tarefa)
    setDescricao('')
    setCategoria('')
  }

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
      </div>
      <div className={classes.row}>
        <Grid container>
          <Grid item md={5}>
            <TextField
              className={classes.SearchInput}
              placeholder=""
              label="Descrição:"
              fullWidth
              onChange={e => setDescricao(e.target.value)}
              value={descricao}
            />
          </Grid>
          <Grid item md={5}>
            <FormControl fullWidth>
              <InputLabel>Categoria:</InputLabel>
              <Select value={categoria} onChange={e => setCategoria(e.target.value)}>
                <MenuItem value={""}>Selecione</MenuItem>
                <MenuItem value={"TRABALHO"}>Trabalho</MenuItem>
                <MenuItem value={"ESTUDOS"}>Estudos</MenuItem>
                <MenuItem value={"OUTROS"}>Outros</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <Button onClick={submit} variant='contained' color='secondary'>Adicionar</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

TarefasToolbar.propTypes = {
  className: PropTypes.string
};

export default TarefasToolbar;
