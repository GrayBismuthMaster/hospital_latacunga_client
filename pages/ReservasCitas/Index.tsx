
import React, {useEffect, useState} from 'react';
import ReadReservasCitasList from "./ReadReservasCitasList";
import { Link, useLocation} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'

const Index = (props:any) => {

    const [prevLocation , setPrevLocation] = useState({});
    const location = useLocation();

    useEffect(() => {
        console.log('state de props desde reserva citas', props)
        setPrevLocation(location);
        console.log(prevLocation)
    }, [])
    
    console.log("props desde historias clinicas interno")
    console.log(props)
        return(
            <div style = {{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
            }}>
                <ReadReservasCitasList/>
            </div>
        )
    
}


export default Index;