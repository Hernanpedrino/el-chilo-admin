import { Action, createReducer, on } from '@ngrx/store';
import { crearCliente } from './clientes.actions';

export interface Cliente {
    id: Number,
    nombre: String,
    apellido: String 
}

export const initialState: Cliente = {
   id: 1,
   nombre:'dfghdf',
   apellido: 'Pedrino'
}

const _crearClienteReducer = createReducer(initialState,

    on(crearCliente, state => ({ ...state})),

);

export function crearClienteReducer(state: Cliente | undefined, action: Action) {
    return _crearClienteReducer(state, action);
}