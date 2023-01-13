import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchProfesional = (user:any) => async (dispatch:any) =>{
    if(!user){
        return null;
    }
    const response = await HospitalLatacungaApi.get(`/profesionales/${user._id}`);
    dispatch({type: 'FETCH_PROFESIONAL', payload: response.data});    
    
};
export const fetchProfesionales = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/profesionales/`);
    dispatch({type: 'FETCH_PROFESIONALES', payload: response.data});
};
export const fetchProfesionalesByEspecialidadId = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/especialidades/${id}/profesionales/`);
    dispatch({type: 'FETCH_PROFESIONALES_BY_ESPECIALIDAD_ID', payload: response.data});
};
export const createProfesional = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/profesionales', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('Profesional creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_PROFESIONAL', payload: res.data.datosProfesionalCreado});

            })
}

export const editProfesional = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/profesionales/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('Profesional editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_PROFESIONAL', payload: res.data});

        })
}

export const deleteProfesional = (tableId:any) => async (dispatch:any) => {
        try {
            HospitalLatacungaApi.delete(`/profesionales/${tableId}`);
            dispatch({type: 'DELETE_PROFESIONAL', payload: tableId});
            toast.success('Profesional eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}