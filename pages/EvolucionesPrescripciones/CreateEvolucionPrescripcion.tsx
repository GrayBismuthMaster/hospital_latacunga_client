import { useState, useRef, useEffect} from 'react';
import styles from './evolucionPrescripcionStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {evolucionesPrescripciones} from '../../redux/actions'
import { useLocation, useNavigate } from 'react-router-dom';
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

import { fetchProfesionalesByEspecialidadId } from "../../redux/actions/profesionales";
import { fetchUsersByRole } from '../../redux/actions/users';
import { TableUsers } from '../../interfaces';
//SELECT 
import Select from 'react-select'

//Redux form
const createEvolucionPrescripcion = evolucionesPrescripciones.createEvolucionPrescripcion;

const CreateEvolucionPrescripcion = (props : any) => {
    
    //CUSTOM HOOK PARA S3 UPLOAD
        const { s3State, setS3State, formatFilename, uploadToS3} = useS3Upload();
    //FIN CUSTOM HOOK
    const navigate = useNavigate();
    const componentRef = useRef();
    //create ref to store the modal
    const location = useLocation();
    const [fileName, setFileName] = useState('');
    //RENDERIZACION IMAGENES
        const renderImageField = (formikProps:any)=>{
            return (
            <>
                <input id='file' type="file" className={styles.input_photo} onChange={(e)=>singleFileChangedHandler(e, formikProps)}/>
                <label htmlFor="file" className={styles.input_photo_btn} >Subir</label>
            </>      
            )
        }
                                                
        
        const singleFileChangedHandler = ( e:any, formikProps : any ) => {
            // console.log(event.target.files[0]);
            // setSelectedFile(event.target.files[0]);
            console.log('props de formik',formikProps);
            setFileName(e.target.files[0].name);
            setS3State({...s3State, file : e.target.files[0], name : e.target.files[0].name});
            formikProps.form.setFieldValue('imagen', e.target.files[0])
            // input.onChange(e.target.files[0])
            
        }; 
    //FIN RENDERIZACION IMAGENES METODOS
    useEffect(() => {
        
        //PROP DE CONSULTORIO
        console.log('objeto recibido de location', location.state)
        props.fetchProfesionalesByEspecialidadId((location as any).state.datosFila.id)
        console.log('profesionales',props.profesionales)

        props.fetchUsersByRole("2");
        console.log('usuarios clientes', props.users)
      return () => {
        
      };
    }, [])

  
    return( 
        <>
            <Formik
                initialValues={{
                    num_hoja:"",
                }}
                // validate = {(values)=>{
                //     let errores = {nombre_evolucionPrescripcion : '', telefono : '', correo : '', evolucionPrescripcion : '', password : ''};
                //     if(!values.nombre_evolucionPrescripcion){
                //         errores.nombre_evolucionPrescripcion =   'Ingresa un nombre pelao';
                //     }else if(!/^[0-9\s]{1,10}$/.test(values.telefono)){
                //         errores.telefono = "Por favor ingrese un num telefonico";
                //     }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
                //         errores.correo =  "Por favor ingrese un correo electrónico válido"
                //     }else if(!values.evolucionPrescripcion){
                //         errores.evolucionPrescripcion = "Por favor ingrese un evolucionPrescripcion"
                //     }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(values.password)){
                //         errores.password = "La contraseña debe tener mínimo 8 caracteres, máximo 15, al menos una letra mayúscula, una minúscula, un dígito, sin espacios en blanco,1 caracter especial";
                //     }
                //     return errores;
                //  }}
                onSubmit = {async (values, {resetForm})=>{
                    //LA IMAGEN Y EL ESTADO ENVIO
                    console.log('valores del form',values);
                    let id_especialidad_historia_clinica = (location as any).state.datosFila.id;
                    
                    await props.createEvolucionPrescripcion({ ... values, id_especialidad_historia_clinica  });
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
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                        nombre = {valores.nombre.replace(/_/gi,' ').toUpperCase()}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Registrarse" />       
                            </Form>
                            <Toaster/>                 
                        </Modal>
                    )} 
            </Formik>
        </>
      )
}

// const formWrapped = reduxForm({
//     form : 'evolucionPrescripcionCreate'
//   })(CreateEvolucionPrescripcion)
const mapStateToProps = (state : any) => {
    const { profesionales, users } = state;
    console.log('estado de todo en create historia clinica',state)
    return {
      profesionales : Object.values(profesionales),
      users : Object.values(users)
    }
}

export default connect(
    mapStateToProps,
    { fetchProfesionalesByEspecialidadId,fetchUsersByRole, createEvolucionPrescripcion}
)(CreateEvolucionPrescripcion)
// export default connect(
//     null,
//     {createEvolucionPrescripcion}
// )(CreateEvolucionPrescripcion)