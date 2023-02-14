import React from "react";
import styles from "./DondeEncontrarnos.module.css";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
const DondeEncontrarnos = () => {
    return (
        <section id="Contacto" className={styles.contacto_container}>
            <div className={styles.contacto_container_left}/>
            <div className={styles.contacto_container_right}>
                <div className={styles.contacto_container_card}>    
                    <div className={styles.form}>
                        <h3 className={styles.form_title}>Nuestra Ubicación </h3>
                        <h3>Latacunga</h3>
                        <h3 className={styles.contactoLabels}>Escríbenos</h3>
                        <h3><LocalPhoneIcon/> 098 306 5968</h3>
                        <h3><EmailIcon/> cmed@hotmail.com</h3>
                        <h3>Dirección</h3>
                        <h3>Avenida La Coruña E12-35 e, Av. Isabel la Católica, Quito 170525</h3>

                    </div>
                </div>
            </div>
        </section>
    );
};
export default DondeEncontrarnos;
