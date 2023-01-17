import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import styles from './reservasCitasStyles/index.module.css';
import { connect } from 'react-redux';
//FETCHS
import {fetchReservasCitas,createReservaCita} from '../../redux/actions/reservasCitas';
import { fetchConsultorios } from '../../redux/actions/consultorios';
import { fetchProfesionales } from '../../redux/actions/profesionales';
import { fetchUsersByRole } from '../../redux/actions/users';
import { fetchEspecialidades } from '../../redux/actions/especialidades';

import toast, { Toaster } from 'react-hot-toast';
import { Form, Formik } from 'formik';
import { FieldFormik } from '../../components/FormikFields/FieldFormik';
import {ReservasCitasData} from '../../data/reservasCitas/ReservasCitasData';
import { Dropdown } from 'semantic-ui-react';
import { Consultorio, Especialidad, EstadoReserva, Roles, TableEspecialidades, TableProfesionales, TableUsers } from '../../interfaces';
const CreateReservaCitas = (props:any) => {
  
    //DROPDOWN SELECTED
    const [dropdownSelectedValue, setDropdownSelectedValue] = useState("");
    
    const [dropdownEspecialidadSelectedValue, setDropdownEspecialidadSelectedValue] = useState("");
    const [dropdownProfesionalSelectedValue, setDropdownProfesionalSelectedValue] = useState("");

    const [dropdownUserSelectedValue, setDropdownUserSelectedValue] = useState("");
    const [filterState, setFilterState] = useState({
        especialidades : [],
        profesionales : []
    });
  useEffect(() => {
    console.log('props desde rol de usuario',props)
    props.fetchConsultorios();
    props.fetchEspecialidades();
    props.fetchProfesionales();
    props.fetchUsersByRole("2");
    // setState({...state, consultorios : props.consultorios});
  }, [])
  
    //LOCATION
    const location = useLocation();
    const componentRef = useRef();
    //create ref to store the modal
    console.log("PROPS TALVES CALENDARIO", location.state)


    const generarEspecialidades = (e:any) => {
         console.log('desde generar especialidades', e)
        console.log('objeto de especialidades', props.especialidades);
        setFilterState({...filterState, especialidades : props.especialidades.filter((especialidad:Especialidad) => especialidad.consultorio_id === e)});
        console.log('objeto de especialidades filtrado por consultorio', filterState.especialidades);
    }

    const generarProfesionales = (e:any) =>{
        console.log('desde generar profeseionales', e)
        console.log('objeto de profesionales', props.profesionales);
        setFilterState({...filterState, profesionales : props.profesionales.filter((profesional:TableProfesionales) => profesional.especialidad_id === e)});
        console.log('objeto de profesionales filtrado por consultorio', filterState.profesionales);
   
    }
  return (
    <>  
        <Formik
                initialValues={{
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
                    const {fecha_hora_inicio_reserva, fecha_hora_fin_reserva}= (location as any).state;

                    const {rol, id_usuario_reserva_cita} =props;
                    console.log(id_usuario_reserva_cita);
                    console.log(rol)
                    console.log(Roles.user)
                    if(rol === Roles.user){
                        
                        await props.createReservaCita({ ... values,id_usuario_reserva_cita, fecha_hora_inicio_reserva, fecha_hora_fin_reserva, estado_reserva : EstadoReserva.PENDIENTE  });
                    }else{
                        await props.createReservaCita({ ... values, fecha_hora_inicio_reserva, fecha_hora_fin_reserva, estado_reserva : EstadoReserva.PENDIENTE  });
                    }
                        
                    // resetForm();
                }}
            >
                {
                    ({handleSubmit, values, setFieldValue}:any)=>
                    (
                       
                        <Modal forwardRef={componentRef} title = {'Crear HistoriaClinica'} image = {'https://images.pexels.com/photos/8978449/pexels-photo-8978449.jpeg?cs=srgb&dl=pexels-meruyert-gonullu-8978449.jpg&fm=jpg'}>
                            <Form  className={styles.form} onSubmit={handleSubmit}>
                                <div  className={styles.form_container_left_right}>    
                                    <div className={styles.form_container}>
                                        
                                        {
                                            ReservasCitasData.map((valores:any, index : number)=>{
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
                                        

                                        {/* CAMPO PARA CONSULTORIOS */}
                                        <Dropdown
                                            selection
                                            placeholder="Seleccione un consultorio"
                                            options={
                                                props.consultorios.map((consultorio:Consultorio)=>{
                                                    return {value : consultorio.id, text : consultorio.nombre_consultorio}
                                                })
                                            }
                                            value={dropdownSelectedValue}
                                            onChange={(_, { value }:any) => {
                                                setFieldValue("id_consultorio_reserva_cita", value);
                                                setDropdownSelectedValue(value)
                                                generarEspecialidades(value);
                                            }}
                                        />
                                        {/* FIN CAMPO PARA CONSULTORIOS  */}
                                        {
                                            filterState.especialidades.length > 0 
                                                ?
                                                <Dropdown
                                                    selection
                                                    placeholder="Seleccione una especialidad"
                                                    options={
                                                        filterState.especialidades.map((especialidad:TableEspecialidades)=>{
                                                            return {value : especialidad.id, text : especialidad.nombre_especialidad}
                                                        })
                                                    }
                                                    value={dropdownEspecialidadSelectedValue}
                                                    onChange={(_, { value }:any) => {
                                                        setFieldValue("id_especialidad_reserva_cita", value);
                                                        setDropdownEspecialidadSelectedValue(value)
                                                        generarProfesionales(value);
                                                    }}
                                                />
                                                :
                                            <>
                                            </>
                                        }
                                         {
                                            filterState.profesionales.length > 0 
                                                ?
                                                <Dropdown
                                                    selection
                                                    placeholder="Seleccione un profesional"
                                                    options={
                                                        filterState.profesionales.map((profesional:TableProfesionales)=>{
                                                            return {value : profesional.id, text : profesional.nombre_profesional}
                                                        })
                                                    }
                                                    value={dropdownProfesionalSelectedValue}
                                                    onChange={(_, { value }:any) => {
                                                        setFieldValue("id_profesional_reserva_cita", value);
                                                        setDropdownProfesionalSelectedValue(value)
                                                        // generarEspecialidades(value);
                                                    }}
                                                />
                                                :
                                            <>
                                            </>
                                        }
                                        {/* CAMPO PARA USUARIOS */}
                                        {
                                            props.rol !== Roles.user
                                                ??
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
                                                    setFieldValue("id_usuario_reserva_cita", value);
                                                    setDropdownUserSelectedValue(value)
                                                }}
                                            />
                                        }
                                        
                                        {/* FIN CAMPO PARA USUARIOS  */}
                                        
                                        
                                    </div>
                                </div>
                                <input type="submit" className={styles.form_submit} value="Crear reserva" />       
                            </Form>
                            <Toaster/>                 
                        </Modal>
                    )} 
            </Formik>
        <Toaster/>  
    </>
    
  );

};

const mapStateToProps = (state:any) =>{
  
  const { profesionales, users, consultorios, especialidades, auth } = state;
  console.log('estado desde create reservas citas')
  console.log(state)   
      return {
        consultorios : Object.values(consultorios),
        especialidades : Object.values(especialidades),
        profesionales : Object.values(profesionales),
        users : Object.values(users), 
        rol : auth.userData.datosUsuario.role.id,
        id_usuario_reserva_cita : auth.userData.datosUsuario.id
      }
}
export default connect(
  mapStateToProps,
  {fetchReservasCitas, fetchConsultorios, fetchEspecialidades, fetchProfesionales,  fetchUsersByRole,createReservaCita,}
)(CreateReservaCitas);
