//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const evolucionesPrescripcionesReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_EVOLUCIONES_PRESCRIPCIONES':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'FETCH_EVOLUCIONES_PRESCRIPCIONES_BY_HISTORIA_CLINICA_ID':
            return {  ..._.mapKeys(action.payload, 'id')};
        case 'CREATE_EVOLUCION_PRESCRIPCION':
            return { ...state, [action.payload.id] : action.payload};
        case 'EDIT_EVOLUCION_PRESCRIPCION': 
            return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_EVOLUCION_PRESCRIPCION':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
