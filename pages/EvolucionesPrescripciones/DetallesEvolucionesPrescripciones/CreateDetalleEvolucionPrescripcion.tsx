import { useState, useRef, useEffect} from 'react';
import styles from './detalleEvolucionPrescripcionStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../../components/Modal/Modal';
import {connect} from 'react-redux'
import {detallesEvolucionesPrescripciones} from '../../../redux/actions'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { DetallesEvolucionesPrescripcionesData } from '../../../data/detallesEvolucionesPrescripciones/DetallesEvolucionesPrescripcionesData';

import { FieldFormik } from '../../../components/FormikFields/FieldFormik';
//SELECT 
import Select from 'react-select'

//Redux form
const createDetalleEvolucionPrescripcion = detallesEvolucionesPrescripciones.createDetalleEvolucionPrescripcion;

const CreateDetalleEvolucionPrescripcion = (props : any) => {
    
    //FIN CUSTOM HOOK
    const componentRef = useRef();
    //create ref to store the modal
    const location = useLocation();
    
  let { id_evolucion_prescripcion} = useParams(); 
    useEffect(() => {
        
      return () => {
        
      };
    }, [])

  
    return( 
        <>
            <Formik
                initialValues={{
                }}
                onSubmit = {async (values, {resetForm})=>{
                    //LA IMAGEN Y EL ESTADO ENVIO
                    console.log('valores del form',values);

                    await props.createDetalleEvolucionPrescripcion({ ... values, id_evolucion_prescripcion });
                    resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Detalle Evolucion Prescripcion'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        
                                        {
                                            DetallesEvolucionesPrescripcionesData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        key = {index}
                                                        name = {valores.value}
                                                        type = {valores.type}
                                                        nombre = {valores.name.replace(/_/gi,' ').toUpperCase()}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Crear" />       
                            </Form>
                            <Toaster/>                 
                        </Modal>
                    )} 
            </Formik>
        </>
      )
}

export default connect(
    null,
    {  createDetalleEvolucionPrescripcion}
)(CreateDetalleEvolucionPrescripcion)
// export default connect(
//     null,
//     {createEvolucionPrescripcion}
// )(CreateEvolucionPrescripcion)