import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchEspecialidad = (user:any) => async (dispatch:any) =>{
    if(!user){
        return null;
    }
    const response = await HospitalLatacungaApi.get(`/especialidades/${user._id}`);
    dispatch({type: 'FETCH_ESPECIALIDAD', payload: response.data});    
    
};
export const fetchEspecialidades = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/especialidades/`);
    dispatch({type: 'FETCH_ESPECIALIDADES', payload: response.data});
};
export const fetchEspecialidadesByConsultorioId = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/consultorios/${id}/especialidades/`);
    dispatch({type: 'FETCH_ESPECIALIDADES_BY_CONSULTORIO_ID', payload: response.data});
};
export const createEspecialidad = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/especialidades', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('Especialidad creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_ESPECIALIDAD', payload: res.data.datosEspecialidadCreado});

            })
}

export const editEspecialidad = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/especialidades/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('Especialidad editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_ESPECIALIDAD', payload: res.data});

        })
}

export const deleteEspecialidad = (tableId:any) => async (dispatch:any) => {
        try {
            HospitalLatacungaApi.delete(`/especialidades/${tableId}`);
            dispatch({type: 'DELETE_ESPECIALIDAD', payload: tableId});
            toast.success('Especialidad eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}