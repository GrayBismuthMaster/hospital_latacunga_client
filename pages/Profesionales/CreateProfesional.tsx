import { useState, useRef, useEffect} from 'react';
import styles from './profesionalStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {profesionales} from '../../redux/actions'
import { useLocation } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {useS3Upload} from '../../hooks/useS3Upload';
import HospitalLatacungaApi from '../../apis/HospitalLatacungaApi';
import { ProfesionalesData } from '../../data/profesionales/ProfesionalesData';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { Dropdown } from 'semantic-ui-react';
//Redux form
const createProfesional = profesionales.createProfesional;
import { fetchConsultorios } from "../../redux/actions/consultorios";
import { Consultorio } from '../../interfaces';


const CreateProfesional = (props : any) => {
    

    //CUSTOM HOOK PARA S3 UPLOAD
        const { s3State, setS3State, formatFilename, uploadToS3} = useS3Upload();
    //FIN CUSTOM HOOK
    const componentRef = useRef();
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
                                                
        //FETCH CONSULTORIOS CON USEEFFECT
        useEffect(() => {
            console.log('especialidad', location.state)
            // props.fetchConsultorios();
            return () => {
            
            };
        }, [])
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
    return( 
        <>
            <Formik
                initialValues={{
                    nombre_profesional : "",
                    apellido_profesional : "",
                    cedula_profesional : "",
                    correo_profesional : "",
                    direccion_profesional : "",
                    telefono_profesional : "",
                }}
                // validate = {(values)=>{
                //     let errores = {nombre_profesional : '', telefono : '', correo : '', profesional : '', password : ''};
                //     if(!values.nombre_profesional){
                //         errores.nombre_profesional =   'Ingresa un nombre pelao';
                //     }else if(!/^[0-9\s]{1,10}$/.test(values.telefono)){
                //         errores.telefono = "Por favor ingrese un num telefonico";
                //     }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
                //         errores.correo =  "Por favor ingrese un correo electrónico válido"
                //     }else if(!values.profesional){
                //         errores.profesional = "Por favor ingrese un profesional"
                //     }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(values.password)){
                //         errores.password = "La contraseña debe tener mínimo 8 caracteres, máximo 15, al menos una letra mayúscula, una minúscula, un dígito, sin espacios en blanco,1 caracter especial";
                //     }
                //     return errores;
                //  }}
                onSubmit = {(values, {resetForm})=>{
                    //LA IMAGEN Y EL ESTADO ENVIO
                    console.log('valores del form',values);
                    console.log((values as any).imagen.type)
                    HospitalLatacungaApi.post('/uploads/signS3',{
                        fileName :formatFilename((values as any).imagen.name),
                        fileType : (values as any).imagen.name
                    }).then(async (res)=>{
                        console.log("respues",res);
                        const { signedRequest, url } = res.data;
                        const resUpload = await uploadToS3((values as any).imagen, signedRequest);
                        console.log("RESPUESTA DE S3", resUpload, "URL", url);
                        await props.createProfesional({ ... values,especialidad_id : (location as any).state.datosFila.id, imagen_profesional : url, estado_profesional : true});
                    })
                    resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Profesional'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        
                                        {
                                            ProfesionalesData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                        nombre = {valores.nombre}
                                                    />
                                                )
                                            })
                                        }
                                        {/* CAMPO PARA IMAGENES */}
                                        <div className={styles.form_group}>
                                            <div className={styles.container_input_photo}>
                                                    <label className={styles.label_title_input_photo}>Imagen</label>
                                                    {
                                                        fileName ? <label className={styles.label_input_photo}>{fileName}</label>
                                                        : <label className={styles.label_input_photo}></label>
                                                    }
                                                    
                                                    <Field 
                                                        name='imagen'
                                                        component={(e:any)=>renderImageField(e)}
                                                        type="file"
                                                    />
                                            </div>
                                        </div>
                                        {/* FIN CAMPO PARA IMAGENES  */}
                                        
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Crear Profesional" />       
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
    { createProfesional}
)(CreateProfesional)
// export default connect(
//     null,
//     {createProfesional}
// )(CreateProfesional)