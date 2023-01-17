import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchConsultorio = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/consultorios/${id}`);
    dispatch({type: 'FETCH_CONSULTORIO', payload: response.data});    
};
export const fetchConsultorios = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/consultorios/`);
    dispatch({type: 'FETCH_CONSULTORIOS', payload: response.data});
};

export const createConsultorio = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/consultorios', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('Consultorio creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_CONSULTORIO', payload: res.data.datosConsultorioCreado});

            })
}

export const editConsultorio = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/consultorios/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('Consultorio editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_CONSULTORIO', payload: res.data});

        })
}

export const deleteConsultorio = (tableId:any) => async (dispatch:any) => {
        try {
            HospitalLatacungaApi.delete(`/consultorios/${tableId}`);
            dispatch({type: 'DELETE_CONSULTORIO', payload: tableId});
            toast.success('Consultorio eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}