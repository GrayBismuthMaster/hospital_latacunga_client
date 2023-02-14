import React from "react";
import Carousel from "../../Carousel/Carousel";
import img1 from "../../../assets/Servicios/canchaGolazo.jpg";
import img2 from "../../../assets/Servicios/LigaBarrial.jpg";
import img3 from "../../../assets/Servicios/sportive.jpeg";
import styles from "../Servicios/Servicios.module.css"

const Servicios = () => {
    
    return (
        <section id="Servicios" className={styles.container}>
            <div className={styles.container_servicios}>
                <div className={styles.container_title}>
                    <h1>Nuestros Convenios</h1>
                </div>
                <div className={styles.container_seccion_inferior}>    
                    <div className={styles.container_carousel}>
                            <Carousel  img1={img1} img2={img2} img3={img3}/>
                    </div>
                    <div className={styles.container_informacion_servicios}>
                        <div className={styles.container_items_informacion_servicios}>
                            <h3>CANCHA DEPORTIVA EL GOLAZO</h3>
                            <p>
                                Cancha deportiva "El Golazo" dice: Cmed ha sido una clínica seria y con un equipamiento tecnológico avanzado, el
                                cual nos ha proporcionado con una eficiente atención sobre todo en el ámbito deportivo que desempeñamos
                            </p>
                            
                        </div>
                        <div className={styles.container_items_informacion_servicios}>
                            <h3>LIGA DEPORTIVA BARRIAL PILACOTO</h3>
                            <p>
                                Liga deportiva barrial Pilacoto dice : Cmed es precursora de salud en nuestra zona, además cuenta con especialistas
                                entregados a su trabajo y a la pronta atención de pacientes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Servicios;