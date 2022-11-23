import { ActionReducerMap } from '@ngrx/store';
import * as pruebas from './pages/clientes/clientes.reducer';


export interface AppState {
   prueba: pruebas.Cliente
}



export const appReducers: ActionReducerMap<AppState> = {
   prueba: pruebas.crearClienteReducer,
}