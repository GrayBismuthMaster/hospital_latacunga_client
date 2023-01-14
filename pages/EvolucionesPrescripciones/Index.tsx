import React from 'react';
import {useEffect, useState} from 'react';
import EvolucionesPrescripcionesList from "./ReadEvolucionesPrescripcionesList";
// import UsersDetail from './ReadUsersDetail';
import { Link, useLocation} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'
import styles from './evolucionPrescripcionStyles/index.module.css'
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
const Index = (props:any) => {

    const [prevLocation , setPrevLocation] = useState({});
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        setPrevLocation(location);
    }, [])
    

    if(props.rol === 'admin'){
        return(
            <div style = {{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
            }}>
                <EvolucionesPrescripcionesList/>
                {/* <UsersDetail/> */}
            </div>
        )
    } else {
        return (
            <>
                <div>SOlo permitido para administradores y moderadores</div>
            </>
        )
    }
}

const mapStateToProps = ( state : any )=>{
    console.log(state.auth)
    if(state.auth.userData!==null)
    {
        return {
            rol : state.auth.userData.datosUsuario.role.nombreRol
        }
    }else{
        
        return {
            rol : "user"
        }
    }
}

export default connect(
    mapStateToProps
)(Index);