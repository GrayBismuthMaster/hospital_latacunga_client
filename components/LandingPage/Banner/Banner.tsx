import React from "react";
import styles from './Banner.module.css'
import Biotech from '../../../assets/Icons/biotech_white_24dp.svg'
import Satisfied from '../../../assets/Icons/bolt_white_24dp.svg'
import Medication from '../../../assets/Icons/military_tech_white_24dp.svg'
const Banner = () => {
    //const BannerImg = styles['Banner-img'];
    //const Banner = styles.Banner + ` ${BannerImg}`;

    return(
        <section className = {styles.BannerContainer}>
            <div id="Banner" className = {styles.Banner}>
                    {/* <div className={styles.Informacion}>
                        <h1>CMED</h1>
                        <h3>Clínica de especialidades</h3>
                    </div> */}
                <div id= "Beneficios" className= {styles.Beneficios}>
                    <div className = {styles.ItemBeneficios}>
                        <img alt={"Medicación"} src={Medication} className={styles.imgBeneficios}></img>
                        <h3>Atención Profesional</h3>
                        <h5>Contamos con profesionales capacitados gustosos de  atenderle con calidad</h5>
                    </div>
                    <div className = {styles.ItemBeneficios}>
                        <img alt={"Tecnología de punta"} src={Biotech} className={styles.imgBeneficios}></img>
                        <h3>Tecnología de Punta</h3>
                        <h5>Contamos con equipos de alta tecnología para la realización de exámenes</h5>
                    </div>
                    <div className = {styles.ItemBeneficios}>
                        <img alt={"Resultados de los exámenes"} src={Satisfied} className={styles.imgBeneficios}></img>
                        <h3>Resultados al Instante</h3>
                        <h5>Los resultados de los exámenes te lo entregamos al instante ya sea impreso o digital</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;