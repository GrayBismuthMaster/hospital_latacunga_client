import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchDetalleEvolucionPrescripcion = (user:any) => async (dispatch:any) =>{
    if(!user){
        return null;
    }
    const response = await HospitalLatacungaApi.get(`/detallesEvolucionesPrescripciones/${user._id}`);
    dispatch({type: 'FETCH_DETALLE_EVOLUCION_PRESCRIPCION', payload: response.data});    
    
};
export const fetchDetallesEvolucionesPrescripciones = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/detallesEvolucionesPrescripciones/`);
    dispatch({type: 'FETCH_DETALLES_EVOLUCIONES_PRESCRIPCIONES', payload: response.data});
};
export const fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/evolucionesPrescripciones/${id}/detallesEvolucionesPrescripciones/`);
    dispatch({type: 'FETCH_DETALLES_EVOLUCIONES_PRESCRIPCIONES_BY_EVOLUCION_PRESCRIPCION_ID', payload: response.data});
};
export const createDetalleEvolucionPrescripcion = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/detallesEvolucionesPrescripciones', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('Detalle Evolucion Prescripcion creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_DETALLE_EVOLUCION_PRESCRIPCION', payload: res.data.datosDetalleEvolucionPrescripcionCreado});

            })
}

export const editDetalleEvolucionPrescripcion = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/detallesEvolucionesPrescripciones/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('detalle EvolucionPrescripcion editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_DETALLE_EVOLUCION_PRESCRIPCION', payload: res.data});

        })
}

export const deleteDetalleEvolucionPrescripcion = (tableId:any) => async (dispatch:any) => {
        try {
            await HospitalLatacungaApi.delete(`/detallesEvolucionesPrescripciones/${tableId}`);
            await dispatch({type: 'DELETE_DETALLE_EVOLUCION_PRESCRIPCION', payload: tableId});
            await toast.success('Detalle Evolucion Prescripcion eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}