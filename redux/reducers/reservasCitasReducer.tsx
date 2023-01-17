//IMPORT DE LA LIBRERÍA 
import _ from 'lodash';
//Reducer de Historias clinicas por api

// REDUCERS DE USUARIOS
export const reservasCitasReducer = (state = {}, action:any) =>{
    switch(action.type){
        case 'FETCH_RESERVAS_CITAS':
            return _.mapKeys(action.payload, 'id');
        case 'FETCH_RESERVAS_CITAS_BY_USER_ID':
        return _.mapKeys(action.payload, 'id');
        case 'CREATE_RESERVA_CITA':
            return { ...state, [action.payload._id] : action.payload};         
        case 'EDIT_RESERVA_CITA': 
        return { ...state, [action.payload.id] : action.payload};
        case 'DELETE_RESERVA_CITA':
            return _.omit(state, action.payload);
   
        default:
            return state;
    }
    
}