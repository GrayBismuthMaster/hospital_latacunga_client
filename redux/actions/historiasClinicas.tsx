import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchHistoriaClinica = (user:any) => async (dispatch:any) =>{
    if(!user){
        return null;
    }
    const response = await HospitalLatacungaApi.get(`/historiasClinicas/${user._id}`);
    dispatch({type: 'FETCH_HISTORIA_CLINICA', payload: response.data});    
    
};
export const fetchHistoriasClinicas = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/historiasClinicas/`);
    dispatch({type: 'FETCH_HISTORIAS_CLINICAS', payload: response.data});
};
export const fetchHistoriasClinicasByEspecialidadId = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/especialidades/${id}/historiasClinicas/`);
    dispatch({type: 'FETCH_HISTORIAS_CLINICAS_BY_ESPECIALIDAD_ID', payload: response.data});
};
export const createHistoriaClinica = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/historiasClinicas', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('HistoriaClinica creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_HISTORIA_CLINICA', payload: res.data.datosHistoriaClinicaCreado});

            })
}

export const editHistoriaClinica = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/historiasClinicas/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('HistoriaClinica editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_HISTORIA_CLINICA', payload: res.data});

        })
}

export const deleteHistoriaClinica = (tableId:any) => async (dispatch:any) => {
        try {
            HospitalLatacungaApi.delete(`/historiasClinicas/${tableId}`);
            dispatch({type: 'DELETE_HISTORIA_CLINICA', payload: tableId});
            toast.success('HistoriaClinica eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}