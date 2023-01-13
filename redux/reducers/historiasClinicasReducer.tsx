//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const historiasClinicasReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_HISTORIAS_CLINICAS':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'FETCH_HISTORIAS_CLINICAS_BY_ESPECIALIDAD_ID':
            return {  ..._.mapKeys(action.payload, 'id')};
        case 'CREATE_HISTORIA_CLINICA':
            return { ...state, [action.payload.id] : action.payload};
        case 'EDIT_HISTORIA_CLINICA': 
            return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_HISTORIA_CLINICA':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
