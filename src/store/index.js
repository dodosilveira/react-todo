import { combineReducers } from "redux"; 

import { tarefaReducer } from "./tarefasReducer";
import { msgReducer } from "./dialogReducer";


const mainReducer = combineReducers({
    tarefas: tarefaReducer,
    messages:  msgReducer
})

export default mainReducer;