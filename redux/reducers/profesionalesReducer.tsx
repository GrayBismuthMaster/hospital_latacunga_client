//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const profesionalesReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_PROFESIONALES':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'FETCH_PROFESIONALES_BY_ESPECIALIDAD_ID':
            return {  ..._.mapKeys(action.payload, 'id')};
        case 'CREATE_PROFESIONAL':
            return { ...state, [action.payload.id] : action.payload};
        case 'EDIT_PROFESIONAL': 
            return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_PROFESIONAL':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
