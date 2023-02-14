import React from "react";
import styles from "./Footer.module.css";
const Footer = ()=>{
    return(    
        <section className = {styles.container_footer}>
            <div className={styles.container_footer_description}>
                <span className={styles.descripcion_footer}>Copyright © 2023 Cmed - Vyecom</span>
            </div>

        </section>
    )
}
export default Footer;