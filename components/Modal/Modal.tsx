import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {useLocation, Link} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
// These two containers are siblings in the DOM
const appRootEl = document.getElementById('root');

interface Props {
  title : string;
  image : string;
  children : ReactNode
}

const Modal : any = ({children, title, image}:any) => {
  // console.log(location.state.pathname)
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
                  <Link to={"modified"} className = {styles.exitButton}>
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
