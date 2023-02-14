import React from "react";
import styles from "./Contacto.module.css";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
const Contacto = () => {
    return (
        <section id="Contacto" className={styles.contacto_container}>
            <div className={styles.contacto_container_left}/>
            <div className={styles.contacto_container_right}>
                <div className={styles.contacto_container_card}>    
                    <div className={styles.form}>
                        <h3 className={styles.form_title}>Horarios de Atención: </h3>
                        <h3>09:00 AM - 18:00 PM</h3>
                        <h3 className={styles.contactoLabels}>Puede agendar su cita a través de nuestro número telefónico o página web</h3>
                        <h3><LocalPhoneIcon/> 098 306 5968</h3>
                        <h3><EmailIcon/> cmed@hotmail.com</h3>
                        <h3>Dirección</h3>
                        <h3>Avenida La Coruña E12-35 e, Av. Isabel la Católica, Quito 170525</h3>
                                <Link to ="login" >
                                    <button className={styles.form_button}>
                                        <h3>Agendar Cita</h3>
                                    </button>
                                </Link>
                            
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Contacto;
