//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const especialidadesReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_ESPECIALIDADES':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'FETCH_ESPECIALIDADES_BY_CONSULTORIO_ID':
        return {  ..._.mapKeys(action.payload, 'id')};
        case 'CREATE_ESPECIALIDAD':
            return { ...state, [action.payload.id] : action.payload};
        case 'EDIT_ESPECIALIDAD': 
            return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_ESPECIALIDAD':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
