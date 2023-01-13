import { useState, useRef, useEffect} from 'react';
import styles from './historiaClinicaStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {historiasClinicas} from '../../redux/actions'
import { useLocation, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import notificationStyles from '../../../../styles/divNotifications/divNotifications.module.css'
import {useS3Upload} from '../../hooks/useS3Upload';
import HospitalLatacungaApi from '../../apis/HospitalLatacungaApi';
import {DatePickerField} from '../../components/DatePicker/DatePicker'
import { HistoriasClinicasData } from '../../data/historiasClinicas/HistoriasClinicasData';
import {RevisionActualData} from '../../data/historiasClinicas/RevisionActualData';
import {ExamenFisicoData} from '../../data/historiasClinicas/ExamenFisicoData';

import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { Dropdown } from 'semantic-ui-react';

import { fetchEspecialidadesByConsultorioId } from "../../redux/actions/especialidades";
import { fetchUsersByRole } from '../../redux/actions/users';
import { TableUsers } from '../../interfaces';
//SELECT 
import Select from 'react-select'

//Redux form
const createHistoriaClinica = historiasClinicas.createHistoriaClinica;

const CreateHistoriaClinica = (props : any) => {
    
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
    //DROPDOWN SELECTED
    const [dropdownSelectedValue, setDropdownSelectedValue] = useState("");
    const [dropdownUserSelectedValue, setDropdownUserSelectedValue] = useState("");
    //MULTISELECT STATE
    const [selectState, setSelectState] = useState({
        revisionActual : [],
        examenFisico : []
    })

    useEffect(() => {
        
        props.fetchUsersByRole("2");
        console.log('usuarios clientes', props.users)
        //PROP DE CONSULTORIO
        console.log('objeto recibido de location', location.state)
        props.fetchEspecialidadesByConsultorioId((location as any).state.datosFila.id_consultorio)
        console.log('especialidades',props.especialidades)
      return () => {
        
      };
    }, [])
    useEffect(() => {
        console.log('cambio en revisión', selectState)

      return () => {
        
      };
    }, [selectState.revisionActual])
    
    useEffect(() => {
        console.log('cambio en examenfisico', selectState)
      return () => {
        
      };
    }, [selectState.examenFisico])

    return( 
        <>
            <Formik
                initialValues={{
                    primer_nombre:"",
                    segundo_nombre:"",
                    apellido_paterno:"",
                    apellido_materno:"",
                    cedula_identidad:"",
                    codigo:"",
                    motivo_consulta:"",
                    antecedentes_personales:"",
                    antecedentes_familiares:"",
                    enfermedad_actual:"",
                    revision_actual_organos_sistemas_sentidos:"",
                    revision_actual_organos_sistemas_respiratorio:"",
                    revision_actual_organos_sistemas_cardiovascular:"",
                    revision_actual_organos_sistemas_digestivo:"",
                    revision_actual_organos_sistemas_dental:"",
                    revision_actual_organos_sistemas_urinario:"",
                    revision_actual_organos_sistemas_musculo_esqueletico:"",
                    revision_actual_organos_sistemas_endocrinico:"",
                    revision_actual_organos_sistemas_hemo_linfaticos:"",
                    revision_actual_organos_sistemas_nervioso:"",
                    signos_vitales_antropometria_fecha_medicion:"",
                    signos_vitales_antropometria_temperatura:"",
                    signos_vitales_antropometria_presion_arterial:"",
                    signos_vitales_antropometria_pulso:"",
                    signos_vitales_antropometria_peso:"",
                    signos_vitales_antropometria_talla:"",
                    examen_fisico_regional_cabeza:"",
                    examen_fisico_regional_cuello:"",
                    examen_fisico_regional_torax:"",
                    examen_fisico_regional_abdomen:"",
                    examen_fisico_regional_pelvis:"",
                    examen_fisico_regional_extremidades:"",
                    diagnostico:"",
                    firma:"",
                }}
                // validate = {(values)=>{
                //     let errores = {nombre_historiaClinica : '', telefono : '', correo : '', historiaClinica : '', password : ''};
                //     if(!values.nombre_historiaClinica){
                //         errores.nombre_historiaClinica =   'Ingresa un nombre pelao';
                //     }else if(!/^[0-9\s]{1,10}$/.test(values.telefono)){
                //         errores.telefono = "Por favor ingrese un num telefonico";
                //     }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
                //         errores.correo =  "Por favor ingrese un correo electrónico válido"
                //     }else if(!values.historiaClinica){
                //         errores.historiaClinica = "Por favor ingrese un historiaClinica"
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
                        await props.createHistoriaClinica({ ... values, imagen : url, estado : true});
                    })
                    resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue})=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear HistoriaClinica'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        
                                        {
                                            HistoriasClinicasData.map((valores:any, index : number)=>{
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
                                        {/* CAMPO PARA MULTISELECT CON DESCRIPCION Y CONDICIONIAL */}
                                            {/* Si el selectState.revisionActual tiene otro campo no borrar caso contrario si  */}
                                        <Select
                                            options = {RevisionActualData}
                                            isMulti
                                            onChange={(option:any)=>{
                                                let previousArray = selectState.revisionActual;
                                                console.log('array de estado', previousArray);
                                                let optionShift = option.length > 1 ? option.shift() : option;
                                                console.log('array de option shift', optionShift)

                                                let nuevoArray = previousArray.concat(option);
                                                console.log('array con concat', nuevoArray);

                                                setSelectState({...selectState, revisionActual :  nuevoArray })
                                            
                                            }}
                                            getOptionValue = {(opciones)=>opciones.value}
                                            getOptionLabel = {(opciones)=>opciones.name}
                                            placeholder = {'Revisión actual de órganos'}
                                            // noOptionsMessage = {'no'}
                                        />
                                        {/* GENERAR EL VALOR EN CP O SP Y LA DESCRIPCION SI ES QUE EXISTE */}
                                        {
                                            selectState.revisionActual.map((revision:any, index)=>{
                                                console.log(index)

                                                return (
                                                    <>
                                                        <div
                                                            style={{
                                                                display : 'flex',
                                                                flexDirection : 'column'
                                                            }}
                                                        >
                                                            {/* HORIZONTAL CP SP  */}
                                                                <div 
                                                                    key={index}
                                                                    style={{
                                                                        display : 'flex',
                                                                        flexDirection : 'row'
                                                                    }}
                                                                >
                                                                    <label>{revision.key}. {revision.name} -</label>
                                                                    <label>         CP </label>
                                                                    <input 
                                                                        type={'radio'} 
                                                                        name={revision.name}
                                                                        onChange={
                                                                            (valor)=>{
                                                                                setSelectState({
                                                                                    ...selectState, 
                                                                                    revisionActual : selectState.revisionActual.map((revisado):any=>(revisado as any).key===revision.key ? {...(revisado as any), CP : valor.target.value ==="on" ? true : false, SP : false } : revisado)
                                                                                })
                                                                        }}
                                                                    />
                                                                    <label> SP </label>
                                                                    <input 
                                                                        type={'radio'} 
                                                                        name={revision.name}
                                                                        onChange={
                                                                            (valor)=>{
                                                                                setSelectState({
                                                                                    ...selectState, 
                                                                                    revisionActual : selectState.revisionActual.map((revisado):any=>(revisado as any).key===revision.key ? {...(revisado as any), SP : valor.target.value ==="on" ?? true , CP : false } : revisado)
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            {/* FIN HORIZONTAL CP SP  */}
                                                            {/* DESCRIPCION CP  */}
                                                                {
                                                                    selectState.revisionActual.map((revisado):any =>(revisado as any).key ===revision.key && revision.CP === true
                                                                        ?
                                                                    <div
                                                                        style={{
                                                                            display : 'flex',
                                                                            flexDirection : 'row'
                                                                        }}
                                                                    >
                                                                        <input
                                                                            type = {'text'}
                                                                            onChange = {
                                                                                (valor)=>{
                                                                                    
                                                                                    setSelectState({
                                                                                        ...selectState,
                                                                                        revisionActual : selectState.revisionActual.map((revisado):any =>(revisado as any).key === revision.key ? {...(revisado as any), Descripcion : valor.target.value  } : {...(revisado as any), Descripcion : valor.target.value  })
                                                                                    })
                                                                                }
                                                                                
                                                                            }
                                                                        />
                                                                    </div>
                                                                        :
                                                                    <></>
                                                                    )    
                                                                }
                                                               

                                                            {/* FIN DESCRIPCION CP  */}
                                                        </div>
                                                        
                                                    </>
                                                   
                                                )
                                            })
                                        }

                                        {/* FIN CAMPO PARA MULTISELECT CON DESCRIPCION Y CONDICIONIAL */}
                                        {/* CAMPO MULTISELECT PARA EXAMEN FISICO REGIONAL  */}
                                            {/* Si el selectState.revisionActual tiene otro campo no borrar caso contrario si  */}
                                            <Select
                                            options = {ExamenFisicoData}
                                            isMulti
                                            onChange={(option:any)=>{
                                                let previousArray = selectState.examenFisico;
                                                let optionShift = option.length > 1 ? option.shift() : option;
                                                console.log('array de option shift', optionShift)

                                                let nuevoArray = previousArray.concat(option);
                                                console.log('array con concat', nuevoArray);

                                                setSelectState({...selectState, examenFisico :  nuevoArray })
                                            
                                            }}
                                            getOptionValue = {(opciones)=>opciones.value}
                                            getOptionLabel = {(opciones)=>opciones.name}
                                            placeholder = {'Examen físico regional'}
                                            // noOptionsMessage = {'no'}
                                        />
                                        {/* GENERAR EL VALOR EN CP O SP Y LA DESCRIPCION SI ES QUE EXISTE */}
                                        {
                                            selectState.examenFisico.map((revision:any, index)=>{
                                                console.log(index)

                                                return (
                                                    <>
                                                        <div
                                                            style={{
                                                                display : 'flex',
                                                                flexDirection : 'column'
                                                            }}
                                                        >
                                                            {/* HORIZONTAL CP SP  */}
                                                                <div 
                                                                    key={index}
                                                                    style={{
                                                                        display : 'flex',
                                                                        flexDirection : 'row'
                                                                    }}
                                                                >
                                                                    <label>{revision.key}. {revision.name} -</label>
                                                                    <label>         CP </label>
                                                                    <input 
                                                                        type={'radio'} 
                                                                        name={revision.name}
                                                                        onChange={
                                                                            (valor)=>{
                                                                                setSelectState({
                                                                                    ...selectState, 
                                                                                    examenFisico : selectState.examenFisico.map((revisado):any=>(revisado as any).key===revision.key ? {...(revisado as any), CP : valor.target.value ==="on" ? true : false, SP : false } : revisado)
                                                                                })
                                                                        }}
                                                                    />
                                                                    <label> SP </label>
                                                                    <input 
                                                                        type={'radio'} 
                                                                        name={revision.name}
                                                                        onChange={
                                                                            (valor)=>{
                                                                                setSelectState({
                                                                                    ...selectState, 
                                                                                    examenFisico : selectState.examenFisico.map((revisado):any=>(revisado as any).key===revision.key ? {...(revisado as any), SP : valor.target.value ==="on" ?? true , CP : false } : revisado)
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            {/* FIN HORIZONTAL CP SP  */}
                                                            {/* DESCRIPCION CP  */}
                                                                {
                                                                    selectState.examenFisico.map((revisado):any =>(revisado as any).key ===revision.key && revision.CP === true
                                                                        ?
                                                                    <div
                                                                        style={{
                                                                            display : 'flex',
                                                                            flexDirection : 'row'
                                                                        }}
                                                                    >
                                                                        <input
                                                                            type = {'text'}
                                                                            onChange = {
                                                                                (valor)=>{
                                                                                    
                                                                                    setSelectState({
                                                                                        ...selectState,
                                                                                        examenFisico : selectState.examenFisico.map((revisado):any =>(revisado as any).key === revision.key ? {...(revisado as any), Descripcion : valor.target.value  } : {...(revisado as any), Descripcion : valor.target.value  })
                                                                                    })
                                                                                }
                                                                                
                                                                            }
                                                                        />
                                                                    </div>
                                                                        :
                                                                    <></>
                                                                    )    
                                                                }
                                                               

                                                            {/* FIN DESCRIPCION CP  */}
                                                        </div>
                                                        
                                                    </>
                                                   
                                                )
                                            })
                                        }

                                        {/* FIN CAMPO MULTISELECT PARA EXAMEN FISICO REGIONAL  */}

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

                                        {/* CAMPO PARA ESPECIALIDADES */}
                                        <Dropdown
                                            selection
                                            placeholder="Seleccione una especialidad"
                                            options={
                                                props.especialidades.map((especialidad:any)=>{
                                                    return {value : especialidad.id, text : especialidad.nombre_especialidad}
                                                })
                                            }
                                            value={dropdownSelectedValue}
                                            onChange={(_, { value }:any) => {
                                                setFieldValue("id_especialidad_historia_clinica", value);
                                                setDropdownSelectedValue(value)
                                            }}
                                        />
                                        {/* FIN CAMPO PARA ESPECIALIDADES  */}
                                        {/* CAMPO PARA USUARIOS */}
                                        <Dropdown
                                            selection
                                            placeholder="Seleccione usuario"
                                            options={
                                                props.users.map((user:TableUsers)=>{
                                                    return {value : user.id, text : `${user.primer_nombre} ${user.segundo_nombre} ${user.apellido_paterno} `}
                                                })
                                            }
                                            value={dropdownUserSelectedValue}
                                            onChange={(_, { value }:any) => {
                                                setFieldValue("id_usuario_historia_clinica", value);
                                                setDropdownUserSelectedValue(value)
                                            }}
                                        />
                                        {/* FIN CAMPO PARA ESPECIALIDADES  */}
                                        
                                        
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
//     form : 'historiaClinicaCreate'
//   })(CreateHistoriaClinica)
const mapStateToProps = (state : any) => {
    const { especialidades, users } = state;
    console.log('estado de todo en create historia clinica',state)
    return {
      especialidades : Object.values(especialidades),
      users : Object.values(users)
    }
}

export default connect(
    mapStateToProps,
    { fetchEspecialidadesByConsultorioId,fetchUsersByRole, createHistoriaClinica}
)(CreateHistoriaClinica)
// export default connect(
//     null,
//     {createHistoriaClinica}
// )(CreateHistoriaClinica)