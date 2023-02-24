import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";
import _ from "lodash";
import toast from "react-hot-toast";
export const fetchReservasCitasByUserId = (id : any) => async (dispatch:any) => {
    const response = await HospitalLatacungaApi.get(`/reservasCitas/user/${id}`);
    dispatch({type: 'FETCH_RESERVAS_CITAS_BY_USER_ID', payload: response.data});
};

export const fetchReservasCitas = () => async (dispatch:any)=> {
    //Redux-thunk allows us to return a function instead of an object
    //We receive a dispatch and getState as parameters
     
        //Mal código
        /* 
        const response = await HospitalLatacungaApi.get('/historiasClinicas');
        return {
            type: 'FETCH_HISTORIAS_CLINICAS',
            payload: JSON.stringify(response.data)
        }
        */
        const response = await HospitalLatacungaApi.get('/reservasCitas');
       dispatch({type: 'FETCH_RESERVAS_CITAS', payload: response.data});
       
    
};

//Damos un memorize para que al momento de hacer la petición no se repita
export const fetchReservaCitaById = function(reservaCita:any) {
    return _.memoize(async function (dispatch) {
        if(!reservaCita){
            return null;
        }
        const response = await HospitalLatacungaApi.get(`/reservasCitas/reservaCita/${reservaCita._id}`);
        dispatch({type: 'FETCH_RESERVA_CITA_BY_ID', payload: response.data});
    }) 
};

export const createReservaCita = (formValues:any) => async (dispatch:any) => {
    await HospitalLatacungaApi.post('/reservasCitas', formValues)
            .then((res:any) => {
                console.log('res de crear reserva cita', res);
                toast.success('Reserva Cita creada con éxito', {
                    position: 'top-center',
                });
                // dispatch({type: 'CREATE_RESERVA_CITA', payload: res.data});

            })
};

export const editReservaCita = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('id',userId);
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/reservasCitas/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('Profesional editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_RESERVA_CITA', payload: res.data});

        })
}
export const deleteReservaCita = (userId :any) => async (dispatch:any) => {
    console.log('id',userId);
    // console.log('valores desde el action', formValues)
    await HospitalLatacungaApi.delete(`/reservasCitas/${userId}`);
    dispatch({type : 'DELETE_RESERVA_CITA', payload : userId});
    
    toast.success('Reserva eliminada correctamente', {
        position: 'top-center'
    })
}