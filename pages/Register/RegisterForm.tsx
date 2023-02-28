import { useState, useRef} from 'react';
import styles from './index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {users} from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {useS3Upload} from '../../hooks/useS3Upload';
import HospitalLatacungaApi from '../../apis/HospitalLatacungaApi';
import {DatePickerField} from '../../components/DatePicker/DatePicker'
import {UsuariosData} from '../../data/usuarios/UsuariosData';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
//Redux form
const createUser = users.createUser;

const RegisterForm = (props : any) => {
    
    //CUSTOM HOOK PARA S3 UPLOAD
        const { s3State, setS3State, formatFilename, uploadToS3} = useS3Upload();
    //FIN CUSTOM HOOK
    const navigation = useNavigate();
    const componentRef = useRef();
    //create ref to store the modal
    console.log("ref desde create user ")
    console.log(componentRef)

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
            console.log('props de formik',formikProps);
            setFileName(e.target.files[0].name);
            setS3State({...s3State, file : e.target.files[0], name : e.target.files[0].name});
            formikProps.form.setFieldValue('imagen', e.target.files[0])
        }; 
    //FIN RENDERIZACION IMAGENES METODOS
    return( 
        <>
            <Formik
                initialValues={
                    {
                        primer_nombre : '',
                        segundo_nombre : '',
                        apellido_paterno : '',
                        apellido_materno : '',
                        cedula_identidad : '',
                        email : '',
                        username : '',
                        password : '',
                        telefono : ''
                    }
                }
                onSubmit = {(values, {resetForm})=>{
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
                        await props.createUser({ ... values, imagen : url, estado : true, id_rol : '2'});
                        navigation('/login');
                    })
                    resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Usuario'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        

                                        {
                                            UsuariosData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                        nombre = {valores.nombre}
                                                    />
                                                )
                                            })
                                        }

                                        <div className={styles.form_group}>
                                            
                                            <DatePickerField name="fecha_nacimiento" className={`${styles.form_input} ${styles.date_size}` }/>
                                            {/* {errors.telefono ?? <div className = {notificationStyles.error}>{errors.telefono}</div>} */}
                                        </div>

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
                                      
                                        <div className={styles.form_group}>
                                            <span className={styles.select_label}>Sexo</span>
                                            
                                            <div className = {styles.checkBoxContainer}>
                                                <div className= {styles.checkBoxVerticalContainer}>
                                                    <span>Masculino</span>
                                                    <span>Femenino</span>
                                                </div>
                                                <div className={styles.checkBoxVerticalContainer}>
                                                <Field
                                                    name="sexo"
                                                    type="radio"
                                                    value={"M"}
                                                />
                                                <Field
                                                    name="sexo"
                                                    type="radio"
                                                    value={"F"}
                                                />
                                                     
                                                </div>
                                            </div> 
                                        </div>

                                        
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Crear Usuario" />       
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
    {createUser}
)(RegisterForm)