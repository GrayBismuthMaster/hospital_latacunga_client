import {useEffect, useState} from 'react';
import EspecialidadesList from "./ReadEspecialidadesList";
// import UsersDetail from './ReadUsersDetail';
import { Link, useLocation, BrowserRouter} from "react-router-dom";
//Manejo del rol de usuario
import {connect} from 'react-redux'
import styles from './especialidadStyles/index.module.css'
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, Card, Image } from 'semantic-ui-react';
import { fetchConsultorios } from "../../redux/actions/consultorios";
import {Consultorio} from '../../interfaces/index'
const Index = (props:any) => {

    const [prevLocation , setPrevLocation] = useState({});
    const location = useLocation();

    useEffect(() => {
        setPrevLocation(location);
        console.log(location);
        // const currentURL = window.location.href
        // const windowURL = `http://${window.location.hostname}:${window.location.port}${location.pathname}`;
        // console.log('location de curren', currentURL)
        // if(windowURL === currentURL){
        //     console.log('estan ahi mismo')
        // }
        props.fetchConsultorios();
        return()=>{
            
        }
    }, [])
    

    if(props.rol === 'admin'){
        return(
            <div style = {{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%'
            }}>
                {/* <Link  
                            to='new'
                            className = {styles.createButton}
                            style={{
                                width : '10%'
                            }}
                            state={prevLocation}
                >
                    <AddIcon style={{marginRight:'5%'}}/>
                        Crear
                </Link> */}
                 <Card.Group>
                    {
                        props.consultorios.map((consultorio:Consultorio) =>(
                            <Card key={(consultorio as any).id}>
                                <Card.Content>
                                    <Image
                                        floated='right'
                                        size='mini'
                                        src={consultorio.imagen_consultorio}
                                    />
                                    <Card.Header>{consultorio.nombre_consultorio}</Card.Header>
                                    <Card.Meta>{consultorio.direccion_consultorio}</Card.Meta>
                                    <Card.Description>
                                        Horario de atención : {consultorio.horario_atencion_consultorio}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {/* <div className='ui two buttons'> */}
                                   
                                            <Link  
                                                to='show'
                                                className = {styles.createButton}
                                                style={{
                                                    color : 'white'
                                                }}
                                                state={consultorio.id}
                                            >
                                                <ArrowRightIcon style={{marginRight:'5%'}}/>
                                                    Continuar
                                            </Link>
                                    {/* </div> */}
                                </Card.Content>
                            </Card>
                        ))
                    }
                </Card.Group>
                {/* 
                <EspecialidadesList/> */}
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
    const { consultorios, auth } = state;

    if(auth.userData!==null)
    {
        return {
            rol : auth.userData.datosUsuario.role.nombreRol,
            consultorios : Object.values(consultorios),
        }
    }else{
        
        return {
            rol : "user"
        }
    }
}

export default connect(
    mapStateToProps,
    {fetchConsultorios}
)(Index);