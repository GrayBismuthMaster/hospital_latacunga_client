import React, { useRef, useState} from 'react';
import styles from './especialidadStyles/index.module.css';
import {Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import { useLocation} from 'react-router-dom';


//Redux form
import { connect } from 'react-redux';
import { especialidades } from '../../redux/actions';
import { Field, Form, Formik } from 'formik';
// import { TableEspecialidades } from '../../../../interfaces';
import {EspecialidadesData} from '../../data/especialidades/EspecialidadesData';
import {FieldFormik} from '../../components/FormikFields/FieldFormik';
const editEspecialidad = especialidades.editEspecialidad;


const EditEspecialidad = (props:any) => {
    // const [count, setCount] = useState(0);
    //const navigate = useNavigate();
    const location = useLocation();
    //const params = useParams();
    const {
        id,
        nombre_especialidad,
        estado_especialidad,
    } = (location as any).state.datosFila;
    const componentRef = useRef();

  return(
      <>
        <Formik
            initialValues={{
                id ,
                nombre_especialidad,
                estado_especialidad,
            }}
            onSubmit = {(values, )=>{
                console.log('valores de todo', values)
                props.editEspecialidad( id ,{...values});
                // resetForm();
            }}
        >
            {
                ({handleSubmit, values})=>
                (
                    <Modal forwardRef={componentRef} title = {'Editar Especialidad'} image = {"https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?cs=srgb&dl=pexels-suzy-hazelwood-3631711.jpg&fm=jpg"}>
                        <Form  className={styles.form} onSubmit={handleSubmit}>
                            <div  className={styles.form_container_left_right}>    
                                <div className={styles.form_container}>

                                    <div className={styles.form_group}>
                                        <Field
                                            name='id'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.id}
                                            disabled
                                            hidden
                                        />
                                        <label htmlFor="id" className={styles.form_label} hidden>Id de usuario</label>
                                        <span className={styles.form_line} hidden></span>
                                        {/* {errors.id_usuario ?? <div className = {notificationStyles.error}>{errors.id_usuario}</div>} */}
                                        {
                                            EspecialidadesData.map((valores:any, index : number)=>{
                                                return (
                                                    <FieldFormik
                                                        name = {valores.name}
                                                        type = {valores.type}
                                                        nombre = {valores.nombre}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                            <input type="submit" className={styles.form_submit} value="Editar" />       
                        </Form>
                        <Toaster/>                 
                    </Modal>
                )}
        </Formik>
      </>
  );
};
export default connect(
    null, 
    {editEspecialidad}
)(EditEspecialidad)