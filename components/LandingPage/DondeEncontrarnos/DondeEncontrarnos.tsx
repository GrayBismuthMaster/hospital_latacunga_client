import React, { useEffect, useState } from "react";
import styles from "./DondeEncontrarnos.module.css";
import HospitalLatacungaApi from "../../../apis/HospitalLatacungaApi";
import axios from "axios";
const DondeEncontrarnos = () => {
    const [state, setState] = useState({
        nombre : '',
        email : '',
        mensaje : ''
    }); 
    useEffect(() => {
        console.log(state);
      return () => {
        
      };
    }, [state])
    return (
        <section id="Contacto" className={styles.contacto_container}>
            <div className={styles.contacto_container_left}/>
            <div className={styles.contacto_container_right}>
                <div className={styles.contacto_container_card}>    
                    <div className={styles.form}>
                        <h3 className={styles.form_title}>Nuestra Ubicación </h3>
                        <h3>Latacunga</h3>
                        <h3 className={styles.contactoLabels}>Agende una cita</h3>
                        <h3>Nombre</h3>
                        <input
                            type='text'
                            onChange={(e)=>setState({...state, nombre : e.target.value})}
                        />
                        <h3>Email</h3>
                        <input
                            type='text'
                            onChange={(e)=>setState({...state, email : e.target.value})}
                        />
                        <h3>Mensaje</h3>
                        <input
                            type='text'
                            onChange={(e)=>setState({...state, mensaje : e.target.value})}
                        />
                        <button
                            onClick={async ()=>{
                                const {nombre, email, mensaje} = state;
                                const resp = await HospitalLatacungaApi.post('/emails', {
                                    email, 
                                    nombre, 
                                    mensaje
                                });
                                console.log(resp);
                            }}
                        >Enviar</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default DondeEncontrarnos;
