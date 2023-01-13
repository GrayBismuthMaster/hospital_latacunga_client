import { useEffect } from 'react'
import styles from './Navbar.module.css'
import logoDashboard from '../../../assets/Logo.png'
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
//Redux
import {connect} from 'react-redux'
import { useNavigate} from 'react-router-dom';
import { auth } from '../../../redux/actions';

const signOut = auth.signOut;

const Navbar = (props:any)=> {
    const navigate = useNavigate();
    
    useEffect(() => {
        return () => {
        };
    }, [])

    const tocado = ()=>{
        console.log(props)
    }
    
    const cerrarSesion = () =>{
        console.log("props cerrar")
        console.log(props);
        navigate('/')
        //Cerrar sesión de redux
        props.signOut();
    }
    return (
        <section className = {styles.navBar}>
            <div className={styles.navBarWrapper}>
               <div className={styles.navBarLeft}>
                   <img alt="Logo" src={logoDashboard} className={styles.logoDashboard}></img>
               </div>
               <div className={styles.navBarRight}>
                   <div className={styles.navBarIconContainer}>
                            <NotificationsNone/>
                            <span className={styles.navBarIconBadge}>5</span>
                   </div>
                   <div className={styles.navBarIconContainer}>
                            <Language/>
                            <span className={styles.navBarIconBadge}>5</span>
                   </div>
                   <div className={styles.navBarIconContainer}>
                            <Settings/>
                            <span className={styles.navBarIconBadge}>5</span>
                   </div>
                   <li className={styles.navBarIconContainerList}>
                        <img src={props.googleUserData ? props.googleUserData.image: props.userData.imagen} alt="Imagen de perfil" className={styles.imgUsuario}></img>
                        <ul className={styles.itemsImgUsuario}>
                            <li><a onClick={tocado}>Ver Perfil</a></li>
                            <li><a onClick={cerrarSesion}>Cerrar Sesión</a></li>
                        </ul>
                   </li>
                   
                    
               </div>
            </div>
        </section>
    )
}
const mapStateToProps = (state:any)=>{
    if(state.auth.userData){
        return{
            userData: state.auth.userData
        }
    }

}
    

export default connect(
    mapStateToProps,
    {signOut}
)(Navbar);
