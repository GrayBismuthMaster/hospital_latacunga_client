import { useState, useRef, useEffect} from 'react';
import styles from './especialidadStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {especialidades} from '../../redux/actions'
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import notificationStyles from '../../../../styles/divNotifications/divNotifications.module.css'
import {useS3Upload} from '../../hooks/useS3Upload';
import HospitalLatacungaApi from '../../apis/HospitalLatacungaApi';
import {DatePickerField} from '../../components/DatePicker/DatePicker'
import { EspecialidadesData } from '../../data/especialidades/EspecialidadesData';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { Dropdown } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";
//Redux form
const createEspecialidad = especialidades.createEspecialidad;
import { fetchConsultorios } from "../../redux/actions/consultorios";

const CreateEspecialidad = (props : any) => {
    
    //CUSTOM HOOK PARA S3 UPLOAD
        const { s3State, setS3State, formatFilename, uploadToS3} = useS3Upload();
    //FIN CUSTOM HOOK
    const navigate = useNavigate();
    const componentRef = useRef();
    //create ref to store the modal
    console.log("ref desde create especialidad ")
    console.log(componentRef)

    useEffect(() => {
        props.fetchConsultorios();
        // const arregloDropdown = props.consultorios.map((consultorio:any)=>{
        //     return {value : consultorio.id, text : consultorio.nombre_consultorio}
        // });
      return () => {
        
      };
    }, [])
    return( 
        <>
            <Formik
                initialValues={{
                    nombre_especialidad : "",
                }}
                // validate = {(values)=>{
                //     let errores = {nombre_especialidad : '', telefono : '', correo : '', especialidad : '', password : ''};
                //     if(!values.nombre_especialidad){
                //         errores.nombre_especialidad =   'Ingresa un nombre pelao';
                //     }else if(!/^[0-9\s]{1,10}$/.test(values.telefono)){
                //         errores.telefono = "Por favor ingrese un num telefonico";
                //     }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
                //         errores.correo =  "Por favor ingrese un correo electrónico válido"
                //     }else if(!values.especialidad){
                //         errores.especialidad = "Por favor ingrese un especialidad"
                //     }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(values.password)){
                //         errores.password = "La contraseña debe tener mínimo 8 caracteres, máximo 15, al menos una letra mayúscula, una minúscula, un dígito, sin espacios en blanco,1 caracter especial";
                //     }
                //     return errores;
                //  }}
                onSubmit = { async (values, {resetForm})=>{
                    if((values as any).imagen){
                        //LA IMAGEN Y EL ESTADO ENVIO
                        console.log('valores del form',values);
                        console.log((values as any).imagen.type)
                        await HospitalLatacungaApi.post('/uploads/signS3',{
                            fileName :formatFilename((values as any).imagen.name),
                            fileType : (values as any).imagen.name
                        }).then(async (res)=>{
                            console.log("respues",res);
                            const { signedRequest, url } = res.data;
                            const resUpload = await uploadToS3((values as any).imagen, signedRequest);
                            console.log("RESPUESTA DE S3", resUpload, "URL", url);
                            await props.createEspecialidad({ ... values, imagen : url, estado_especialidad : true});
                        })
                        resetForm();
                    }else{
                        
                        await props.createEspecialidad({ ... values, estado_especialidad : true});
                    }
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear Especialidad'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        {
                                            EspecialidadesData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        key = {index}
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                        nombre = {valores.nombre}
                                                    />
                                                )
                                            })
                                        }
                                        {/* CAMPO PARA CONSULTORIOS  */}
                                        <Dropdown
                                            selection
                                            placeholder="Seleccione un consultorio"
                                            options={
                                                props.consultorios.map((consultorio:any)=>{
                                                    return {value : consultorio.id, text : consultorio.nombre_consultorio}
                                                })
                                            }
                                            value={values.nombre_especialidad}
                                            onChange={(_, { value }) => setFieldValue("consultorio_id", value)}
                                        />
                                        {/* FIN CAMPO PARA CONSULTORIOS  */}
                                    </div>
                                        
                                
                                </div>
                                <input type="submit" className={styles.form_submit} value="Crear Especialidad" />       
                            </Form>
                            <Toaster/>                 
                        </Modal>
                    )} 
            </Formik>
        </>
      )
}

const mapStateToProps = (state : any) => {
    const { consultorios } = state;
    //AUTOMATIZACION DE ROWS DE TABLAS
        console.log("conssultorios de ",consultorios);
      //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
      //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
      let keys = {};
        //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
        for(const consultorio in consultorios){
          keys = Object.keys(consultorios[consultorio]);
          break;
        }
      //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
      //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
        const consultorioKeys = Object.values(keys);
    //FIN AUTOMATIZACION DE ROWS DE TABLAS
    return {
      consultorios : Object.values(consultorios),
      keys : consultorioKeys
    }
}

export default connect(
    mapStateToProps,
    {fetchConsultorios,createEspecialidad}
)(CreateEspecialidad)