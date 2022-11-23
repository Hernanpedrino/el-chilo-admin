import { createAction, props } from '@ngrx/store';

export const crearCliente = createAction(
    '[Cliente] Crear Cliente',
    props<{texto:string}>()
);