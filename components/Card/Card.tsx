import React from 'react'
import styles from '../../styles/index.module.css'
import { Link, useLocation} from "react-router-dom";
interface Props{
    title : string;
    path : string;
    source : string;
    alt : string;
    children ?: any
}
export const Card = ({title, path, source, alt, children}:Props) => {
  return (
    <div className={styles.card}>
        <div
            className={styles.top_inside_card}
        >
            <h2 className={styles.card_title}>{title}</h2>
        
        </div>
        <div className={styles.bottom_inside_card}>
            
                <Link
                        className = {styles.img} to={path}>
                    <img 
                        src = {source}
                        alt = {alt}
                        className = {styles.img}
                    />
                </Link>
        </div>
        
        {
            children
        }
    </div>
  )
}
