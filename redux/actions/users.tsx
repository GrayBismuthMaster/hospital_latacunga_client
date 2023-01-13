import toast from 'react-hot-toast'
import HospitalLatacungaApi from "../../apis/HospitalLatacungaApi";

export const fetchUser = (user:any) => async (dispatch:any) =>{
    if(!user){
        return null;
    }
    const response = await HospitalLatacungaApi.get(`/usuarios/${user._id}`);
    dispatch({type: 'FETCH_USER', payload: response.data});    
    
};
export const fetchUsers = () => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/usuarios/`);
    dispatch({type: 'FETCH_USERS', payload: response.data});
};

export const fetchUsersByRole = (id:any) => async (dispatch:any) =>{
    const response = await HospitalLatacungaApi.get(`/usuarios/rol/${id}`);
    dispatch({type: 'FETCH_USERS_BY_ROLE', payload: response.data});
};

export const createUser = (formValues: any) => async (dispatch:any) => {
    console.log('valores desde el action')
    console.log(formValues)
    
    await HospitalLatacungaApi.post('/usuarios', formValues)
            .then((res:any) => {
                console.log('res de crear', res);
                toast.success('Usuario creado con éxito', {
                    position: 'top-center',
                });
                dispatch({type: 'CREATE_USER', payload: res.data.datosUsuarioCreado});

            })
}

export const editUser = (userId :any, formValues : any) => async (dispatch:any) => {
    console.log('valores desde el action', formValues)
    HospitalLatacungaApi.put(`/usuarios/${userId}`, formValues)
        .then((res: any) => {
            console.log(res);
            toast.success('Usuario editado con éxito', {
                position: 'top-center',
            });
            console.log("datos nuevos", res.data)
            dispatch({type: 'EDIT_USER', payload: res.data});

        })
}

export const deleteUser = (tableId:any) => async (dispatch:any) => {
        try {
            HospitalLatacungaApi.delete(`/usuarios/${tableId}`);
            dispatch({type: 'DELETE_USER', payload: tableId});
            toast.success('Usuario eliminado correctamente', {
                position: 'top-center'
            })
        } catch (error) {
            toast.error
        }
            
        
}