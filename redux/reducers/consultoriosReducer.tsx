//import lodash
import _ from 'lodash';
// REDUCERS DE USUARIOS
//En el reducer obtengo la acción y el estado
export const consultoriosReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_CONSULTORIO' : 
            return {...state, [action.payload.id] : action.payload};
        case 'FETCH_CONSULTORIOS':
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case 'CREATE_CONSULTORIO':
            return { ...state, [action.payload.id] : action.payload};
        case 'EDIT_CONSULTORIO': 
            return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_CONSULTORIO':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
