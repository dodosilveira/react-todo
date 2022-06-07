
const ESTADO_INICIAL = {
    msg: '',
    showMsg: false
}

export const ACTIONS = {
    SHOW_MSG: 'SHOW_MESSAGE',
    HIDE_MSG: 'HIDE_MESSAGE'
}

export function msgReducer(state = ESTADO_INICIAL, action){
    switch(action.type){
        case ACTIONS.SHOW_MSG:
            return {...state, msg: action.msg, showMsg: true}
        case ACTIONS.HIDE_MSG:
            return {...state, msg: '', showMsg: false}
        default:
            return state;
    }
}

export function showMsg(msg){
    return {
        type: ACTIONS.SHOW_MSG,
        msg: msg
    }
}

export function hideMsg(){
    return {
        type: ACTIONS.HIDE_MSG
    }
}