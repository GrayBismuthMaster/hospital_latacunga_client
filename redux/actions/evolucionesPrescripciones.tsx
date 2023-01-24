import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchEvolucionPrescripcion = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/evolucionesPrescripciones/${id}`);
    dispatch({type: 'FETCH_EVOLUCION_PRESCRIPCION', payload: response.data});    
    
};
export const fetchEvolucionesPrescripciones = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/evolucionesPrescripciones/`);
    dispatch({type: 'FETCH_EVOLUCIONES_PRESCRIPCIONES', payload: response.data});
};
export const fetchEvolucionesPrescripcionesByHistoriaClinicaId = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/historiasClinicas/${id}/evolucionesPrescripciones/`);
    dispatch({type: 'FETCH_EVOLUCIONES_PRESCRIPCIONES_BY_HISTORIA_CLINICA_ID', payload: response.data});
};
export const createEvolucionPrescripcion = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/evolucionesPrescripciones', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('EvolucionPrescripcion creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_EVOLUCION_PRESCRIPCION', payload: res.data.datosEvolucionPrescripcionCreado});

            })
}

export const editEvolucionPrescripcion = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/evolucionesPrescripciones/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('EvolucionPrescripcion editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_EVOLUCION_PRESCRIPCION', payload: res.data});

        })
}

export const deleteEvolucionPrescripcion = (tableId:any) => async (dispatch:any) => {
        try {
            HospitalLatacungaApi.delete(`/evolucionesPrescripciones/${tableId}`);
            dispatch({type: 'DELETE_EVOLUCION_PRESCRIPCION', payload: tableId});
            toast.success('EvolucionPrescripcion eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}