import React from 'react';
import {useEffect, useState} from 'react';
import ProfesionalesList from "./ReadProfesionalesList";
// import UsersDetail from './ReadUsersDetail';
import { Link, useLocation} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';
const Index = (props:any) => {

    const location = useLocation();

    useEffect(() => {
        console.log('index de profesionales', location.state)
    }, [])
    

    if(props.rol === 'admin'){
        return(
            <div style = {{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
            }}>
                <ProfesionalesList/>
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