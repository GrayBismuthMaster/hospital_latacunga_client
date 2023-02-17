import { ReactNode } from 'react';
import { Usuario } from '../../interfaces';
import styles from '../../styles/Cards/cardStyles.module.css'
interface Props {
    title : string;
    image : string
    children : ReactNode
}
export const CardGradient = ({title, image,children}:Props) => {
  return (
    <>
        <ul className={styles.card_wrapper}>
            <li className={styles.card}>
                <img src={image} alt=''/>
                <h3><a href="">{title}</a></h3>
                {
                    children
                }
            </li>
        </ul>
    </>
    
  )
}
