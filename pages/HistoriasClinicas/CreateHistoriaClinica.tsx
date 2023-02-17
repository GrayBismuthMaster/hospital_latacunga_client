import { useState, useRef, useEffect} from 'react';
import styles from './historiaClinicaStyles/index.module.css';
import { Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import {connect} from 'react-redux'
import {historiasClinicas} from '../../redux/actions'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {DatePickerField} from '../../components/DatePicker/DatePicker'

//Componentes
import {Diagnostico} from '../../components/Diagnostico/Diagnostico';

import { HistoriasClinicasData } from '../../data/historiasClinicas/HistoriasClinicasData';
import {RevisionActualData} from '../../data/historiasClinicas/RevisionActualData';
import {ExamenFisicoData} from '../../data/historiasClinicas/ExamenFisicoData';

import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import { Dropdown } from 'semantic-ui-react';

import { fetchProfesionalesByEspecialidadId } from "../../redux/actions/profesionales";
import { fetchUsersByRole } from '../../redux/actions/users';
import { TableUsers } from '../../interfaces';
//SELECT 
import Select from 'react-select'

//Redux form
const createHistoriaClinica = historiasClinicas.createHistoriaClinica;

const CreateHistoriaClinica = (props : any) => {
    
    const componentRef = useRef();
    //create ref to store the modal
    const location = useLocation();
    //DROPDOWN SELECTED
    const [dropdownSelectedValue, setDropdownSelectedValue] = useState("");
    const [dropdownUserSelectedValue, setDropdownUserSelectedValue] = useState("");
    //MULTISELECT STATE
    const [selectState, setSelectState] = useState<any>({
        revisionActual : [],
        examenFisico : []
    })
    const [fieldDiagnostico, setFieldDiagnostico] = useState<any>([]);
    const [diagnostico, setDiagnostico] = useState<any>([]);
    
    let { id, id_consultorio } = useParams(); 
    useEffect(() => {
        //ID E ID DE CONSULTORIO
        console.log('RECIBIDO POR URL', id, id_consultorio)

        props.fetchProfesionalesByEspecialidadId(id)

        props.fetchUsersByRole("2");
        console.log('usuarios clientes', props.users)
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


    const onChangeDiagnostic = (value:any)=>{
        console.log(value);
        setDiagnostico([...diagnostico, value])
    }
    useEffect(()=>{
        console.log('Valor global de los diagnosticos', diagnostico);
    },[diagnostico])
    return( 
        <>
            <Formik
                initialValues={{
                    codigo:"",
                    motivo_consulta:"",
                    antecedentes_personales:"",
                    antecedentes_familiares:"",
                    enfermedad_actual:"",
                    signos_vitales_antropometria_fecha_medicion:"",
                    signos_vitales_antropometria_temperatura:"",
                    signos_vitales_antropometria_presion_arterial:"",
                    signos_vitales_antropometria_pulso:"",
                    signos_vitales_antropometria_peso:"",
                    signos_vitales_antropometria_talla:"",
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
                onSubmit = {async (values, {resetForm})=>{
                    //LA IMAGEN Y EL ESTADO ENVIO
                    console.log('valores del form',values);
                    console.log('valores diagnostico', diagnostico);
                    console.log('valores revision', selectState.revisionActual);
                    console.log('valores examen fisiico', selectState.examenFisico)
                    let id_especialidad_historia_clinica = id;
                    
                    await props.createHistoriaClinica({ ... values, id_especialidad_historia_clinica ,diagnostico,examen_fisico_regional : selectState.examenFisico, revision_actual_organos_sistemas : selectState.revisionActual  });
                    // resetForm();
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
                                        {/* FECHA ANTROPOMETRIA MEDICION  */}
                                            <div className={styles.form_group}>
                                                
                                                <DatePickerField name="signos_vitales_antropometria_fecha_medicion" className={`${styles.form_input} ${styles.date_size}` }/>
                                                {/* {errors.telefono ?? <div className = {notificationStyles.error}>{errors.telefono}</div>} */}
                                            </div>
                                        {/* FIN FECHA ANTROPOMETRIA MEDICION  */}
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
                                            selectState.revisionActual.map((revision:any, index:any)=>{
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
                                                                                    revisionActual : selectState.revisionActual.map((revisado:any)=>(revisado as any).key===revision.key ? {...(revisado as any), CP : valor.target.value ==="on" ? true : false, SP : false } : revisado)
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
                                                                                    revisionActual : selectState.revisionActual.map((revisado:any)=>(revisado as any).key===revision.key ? {...(revisado as any), SP : valor.target.value ==="on" ?? true , CP : false } : revisado)
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            {/* FIN HORIZONTAL CP SP  */}
                                                            {/* DESCRIPCION CP  */}
                                                                {
                                                                    selectState.revisionActual.map((revisado:any) =>(revisado as any).key ===revision.key && revision.CP === true
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
                                                                                        revisionActual : selectState.revisionActual.map((revisado:any) =>(revisado as any).key === revision.key ? {...(revisado as any), Descripcion : valor.target.value  } : {...(revisado as any) })
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
                                            selectState.examenFisico.map((revision:any, index:any)=>{
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
                                                                                    examenFisico : selectState.examenFisico.map((revisado:any)=>(revisado as any).key===revision.key ? {...(revisado as any), CP : valor.target.value ==="on" ? true : false, SP : false } : revisado)
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
                                                                                    examenFisico : selectState.examenFisico.map((revisado:any)=>(revisado as any).key===revision.key ? {...(revisado as any), SP : valor.target.value ==="on" ?? true , CP : false } : revisado)
                                                                                })
                                                                        }}
                                                                    />
                                                                </div>
                                                            {/* FIN HORIZONTAL CP SP  */}
                                                            {/* DESCRIPCION CP  */}
                                                                {
                                                                    selectState.examenFisico.map((revisado:any )=>(revisado as any).key ===revision.key && revision.CP === true
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
                                                                                        examenFisico : selectState.examenFisico.map((revisado:any) =>(revisado as any).key === revision.key ? {...(revisado as any), Descripcion : valor.target.value  } : {...(revisado as any) })
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
                                        
                                        {/* DIAGNOSTICO */}
                                        <label>
                                            Diagnosticos
                                        </label>
                                            <input
                                                type={'button'}
                                                value="Agregar diagnóstico"
                                                onClick={()=>{setFieldDiagnostico([...fieldDiagnostico, <Diagnostico onChange={onChangeDiagnostic}/>] )}}
                                            />
                                            {
                                                <div>
                                                    {
                                                        fieldDiagnostico
                                                    }
                                                </div>
                                            }
                                        {/* FIN DIAGNOSTICO  */}

                                        {/* CAMPO PARA ESPECIALIDADES */}
                                        <Dropdown
                                            selection
                                            placeholder="Seleccione un profesional"
                                            options={
                                                props.profesionales.map((profesional:any)=>{
                                                    return {value : profesional.id, text : profesional.nombre_profesional}
                                                })
                                            }
                                            value={dropdownSelectedValue}
                                            onChange={(_, { value }:any) => {
                                                setFieldValue("id_profesional_historia_clinica", value);
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
    const { profesionales, users } = state;
    console.log('estado de todo en create historia clinica',state)
    return {
      profesionales : Object.values(profesionales),
      users : Object.values(users)
    }
}

export default connect(
    mapStateToProps,
    { fetchProfesionalesByEspecialidadId,fetchUsersByRole, createHistoriaClinica}
)(CreateHistoriaClinica)