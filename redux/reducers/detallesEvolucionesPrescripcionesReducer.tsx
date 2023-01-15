//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const detallesEvolucionesPrescripcionesReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_DETALLES_EVOLUCIONES_PRESCRIPCIONES':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'FETCH_DETALLES_EVOLUCIONES_PRESCRIPCIONES_BY_EVOLUCION_PRESCRIPCION_ID':
            return {  ..._.mapKeys(action.payload, 'id')};
        case 'CREATE_DETALLE_EVOLUCION_PRESCRIPCION':
            return { ...state, [action.payload.id] : action.payload};
        case 'EDIT_DETALLE_EVOLUCION_PRESCRIPCION': 
            return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_DETALLE_EVOLUCION_PRESCRIPCION':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
