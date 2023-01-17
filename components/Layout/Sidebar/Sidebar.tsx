import React, { useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import HistoryIcon from '@mui/icons-material/History';
import {connect} from 'react-redux'

const Sidebar = (props:any) => {
    useEffect(() => {
        return () => {
            // effects.forEach(effect => effect.cancel());
        };
    }, [])
    const activo = (activado:any)=>{
        if(activado){
            if(activado.isActive){
                return `${styles.navLink} ${styles.active}`
            }
            else{
                return styles.navLink
            }
        }
    }
    //MANEJO DE ROLES EN EL SIDEBAR
    if(props.rol === 'user'){
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar_wrapper}>
                    <div className={styles.sidebar_menu}>
                        <h1 className={styles.sidebar_title}>
                            Dashboard
                        </h1>
                        <ul className={styles.sidebar_list}>
                        <li className={styles.sidebar_list_item}>
                                <HomeIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/home'>Home</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <AccountCircleIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/profile'>Perfil</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <AnalyticsIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/statistics'>Estadísticas</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <InsertInvitationIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/reservas-citas'>Reserva de Citas</NavLink>
                            </li>
                        </ul>
                        
                    </div>
                    {/* <div className={styles.sidebar_menu}>
                        <h1 className={styles.sidebar_title}>
                            Menú de Acceso Rápido
                        </h1>
                        <ul className={styles.sidebar_list}>
                            <li className={styles.sidebar_list_item}>
                                <InsertInvitationIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/reserva-citas'>Reserva de Citas</NavLink>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        )
    }else{
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar_wrapper}>
                    <div className={styles.sidebar_menu}>
                        <h1 className={styles.sidebar_title}>
                            Dashboard
                        </h1>
                        <ul className={styles.sidebar_list}>
                            <li className={styles.sidebar_list_item}>
                                <HomeIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/home'>Home</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <PersonIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/users'>Usuarios</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <OtherHousesIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/consultorios'>Consultorios</NavLink>
                            </li>
                            <li className={styles.sidebar_list_item}>
                                <FolderSpecialIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo} to='/especialidades'>Especialidades</NavLink>
                            </li>
                        </ul>
                        <h1 className={styles.sidebar_title}>
                            Menú de Acceso Rápido
                        </h1>
                        <ul className={styles.sidebar_list}>
                            <li className={styles.sidebar_list_item}>
                                <HistoryIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/especialidades'>Historias Clínicas</NavLink>
                            </li>
                        </ul>
                        <h1 className={styles.sidebar_title}>
                            Reserva de Citas
                        </h1>
                        <ul className={styles.sidebar_list}>
                            <li className={styles.sidebar_list_item}>
                                <InsertInvitationIcon className={styles.sideBarIcon}/>
                                <NavLink className={activo}  to='/reservas-citas'>Reserva de Citas</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state:any) =>{
    console.log('state desde sidebar', state)
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
)(Sidebar);
