import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {Link} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { popUrl } from '../../utils';
interface Props {
  title : string;
  image : string;
  children : ReactNode;
}

const Modal : any = ({children, title, image}:Props) => {
        const currentURL = window.location.pathname;
        let lastUrl = popUrl(currentURL);
  useEffect(() => {
    console.log("ENtre al")
    return () => {
    };
  }, [])

  return ReactDOM.createPortal(
      <>
          <section id='modalSection' className={styles.modal}>
              <div className={styles.modal_container}>
                <div className={styles.containerExitButton}>
                  <Link to={lastUrl} className = {styles.exitButton}>
                    <CloseIcon/>
                  </Link>
                </div>
              
                  <figure className={styles.modal_picture}>
                    <img alt="chica sonriendo" src={image} className={styles.modal_img}/>
                  </figure>
                  <h2 className={styles.modal_title}>{title}
                  </h2>
                  {
                    children
                  }
              </div>
          </section>
      </>
        ,
        document.getElementById('modal')!
      )
  
}
export default Modal;
