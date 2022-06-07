
import axios from 'axios'
import { showMsg } from './dialogReducer'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL
})

const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVER: 'TAREFAS_REMOVE',
    UPDATE_STATUS: 'TAREFAS_UPDATE_STATUS'
}

const ESTADO_INICIAL = {
    tarefas: [],
    qtd: 0
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch(action.type){
        case ACTIONS.LISTAR:
            return {
                ...state,
                tarefas: action.tarefas,
                qtd: action.tarefas.length                
            }
        case ACTIONS.ADD:
            const lista = [...state.tarefas, action.tarefa]
            return {
                ...state,
                tarefas: lista,
                qtd: lista.length
            }

        case ACTIONS.REMOVER:
            const id = action.id;
            const tarefas = state.tarefas.filter( tarefa => tarefa.id !== id )
            return {
                ...state,
                tarefas: tarefas,
                qtd: tarefas.length
            }
        case ACTIONS.UPDATE_STATUS:
            const listaAtualizada = [...state.tarefas]
            listaAtualizada.forEach(tarefa => {
                if(tarefa.id === action.id){
                    tarefa.done = true;
                }
            })
            return { ...state, tarefas: listaAtualizada }
        default:
            return state;
    }

    function newFunction() {
        console.log(action.tarefas.lenght)
    }
}

export function listar(){
    return dispatch => {
        http.get('/tarefas',{
            headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
        }).then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                tarefas: response.data
            })
        })
    }
}

export function salvar( tarefa ){
    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
        }).then(response => {
            dispatch([{
                type: ACTIONS.ADD,
                tarefa: response.data
            }, showMsg('Tarefa salva com sucesso.')])
        })
    }
}

export function deletar( id ){
    return dispatch => {
        http.delete(`/tarefas/${id}`, {
            headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
        }).then(response => {
            dispatch([{
                type: ACTIONS.REMOVER,
                id: id
            }, showMsg('Tarefa excluída com sucesso.')])
        })
    }
}

export function alterarStatus( id ){
    return dispatch => {
        http.patch(`/tarefas/${id}`, null, {
            headers: {'x-tenant-id' : localStorage.getItem('EMAIL_USUARIO')}
        }).then(response => {
            dispatch([{
                type: ACTIONS.UPDATE_STATUS,
                id: id
            }, showMsg('Status alterado com sucesso.')])
        })
    }
}