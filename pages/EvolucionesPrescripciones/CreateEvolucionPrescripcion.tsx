import { useState, useRef, useEffect} from 'react';
import styles from './evolucionPrescripcionStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {evolucionesPrescripciones} from '../../redux/actions'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import notificationStyles from '../../../../styles/divNotifications/divNotifications.module.css'
import {useS3Upload} from '../../hooks/useS3Upload';
import HospitalLatacungaApi from '../../apis/HospitalLatacungaApi';
import {DatePickerField} from '../../components/DatePicker/DatePicker'

//Componentes
import {Diagnostico} from '../../components/Diagnostico/Diagnostico';

import { EvolucionesPrescripcionesData } from '../../data/evolucionesPrescripciones/EvolucionesPrescripcionesData';

import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { Dropdown } from 'semantic-ui-react';
import { TableUsers } from '../../interfaces';
//SELECT 
import Select from 'react-select'

//Redux form
const createEvolucionPrescripcion = evolucionesPrescripciones.createEvolucionPrescripcion;

const CreateEvolucionPrescripcion = (props : any) => {
    
    //FIN CUSTOM HOOK
    const componentRef = useRef();
    //create ref to store the modal
    const location = useLocation();
    
    let { id_historia_clinica, id_consultorio, id_usuario_historia_clinica } = useParams(); 
    useEffect(() => {
        console.log('id de HC y COnsultorio', id_historia_clinica, id_consultorio, id_usuario_historia_clinica);
        //PROP DE CONSULTORIO
        console.log('objeto recibido de location desde evoluciones', location.state)
      return () => {
        
      };
    }, [])

  
    return( 
        <>
            <Formik
                initialValues={{
                    num_hoja:"",
                }}
                onSubmit = {async (values, {resetForm})=>{
                    //LA IMAGEN Y EL ESTADO ENVIO
                    console.log('valores del form',values);
                    console.log('valores del state', location.state)

                    await props.createEvolucionPrescripcion({ ... values, historia_clinica_id : id_historia_clinica, id_usuario_evolucion_prescripcion :  id_usuario_historia_clinica,  id_consultorio_evolucion_prescripcion : id_consultorio  });
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear EvolucionPrescripcion'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        
                                        {
                                            EvolucionesPrescripcionesData.map((valores:any, index : number)=>{
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
    {  createEvolucionPrescripcion}
)(CreateEvolucionPrescripcion)
// export default connect(
//     null,
//     {createEvolucionPrescripcion}
// )(CreateEvolucionPrescripcion)