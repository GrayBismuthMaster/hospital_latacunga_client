//Redux
import styles from './Home.module.css';
import styles2 from '../../styles/index.module.css';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Card} from '../../components/Card/Card';
import {homeAdminData} from '../../data/home/homeAdminData';
const Home =  ({nombre, rol}:any) =>{

    
    if(rol === 'admin'){
        return(
            <div style = {{
                display : 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%',
                flexDirection : 'row'
            }}>
                <div className= {styles2.container_card}>
                    {
                        homeAdminData.map((home, index)=>(
                            <Card
                                title={home.title}
                                alt ={home.alt}
                                path = {home.path}
                                source = {home.source}
                                key = {index}
                            />
                        ))
                    }
                    
            </div>
                
            </div>
        )
    } else if(rol === 'DOCENTE'){
        console.log("entra con ds")
        return (
            <div className= {styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.card_title}>Calificaciones</h2>
                    <ul 
                        className={styles.card_list}
                    >
                        <Link to="/grades">
                            <img 
                                src = 'https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                                alt = 'Calificaciones'
                                className = {styles.img}
                            />
                        </Link>
{/*                         
                        <li></li>
                        <li></li> */}
                        
                    </ul>
                </div>

            </div>
        )
    }else{
        return null
    }
}

const mapStateToProps = (state:any) =>{
    const {auth}= state;
    console.log(`${auth.userData.datosUsuario.primer_nombre} ${auth.userData.datosUsuario.apellido_paterno}`);
    console.log(auth.userData.datosUsuario.role.nombreRol);
        return {
            nombre : auth.userData.datosUsuario.role,
            rol : auth.userData.datosUsuario.role.nombreRol,
        }
    
}

export default connect(
    mapStateToProps,
)(Home);