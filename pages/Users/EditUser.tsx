import React, { useRef} from 'react';
import styles from './userStyles/index.module.css';
import {Toaster} from 'react-hot-toast'
import Modal from '../../components/Modal/Modal';
import { useLocation} from 'react-router-dom';


//Redux form
import { connect } from 'react-redux';
import { users } from '../../redux/actions';
import { Field, Form, Formik } from 'formik';
// import { TableUsers } from '../../../../interfaces';
const editUser = users.editUser;


const EditUser = (props:any) => {
    //const navigate = useNavigate();
    const location = useLocation();
    //const params = useParams();
    const {id, primer_nombre, email, estado, username, roles} = (location as any).state.datosFila;
    const componentRef = useRef();
  return(
      <>
        <Formik
            initialValues={{
                id ,
                primer_nombre ,
                email ,
                estado ,
                username ,
                password : ''
            }}
            onSubmit = {(values, )=>{
                console.log('valores de todo', values)
                props.editUser( id ,{...values, roles : roles});
                // resetForm();
            }}
        >
            {
                ({handleSubmit, values})=>
                (
                    <Modal forwardRef={componentRef} title = {'Editar Usuario'} image = {"https://images.pexels.com/photos/3631711/pexels-photo-3631711.jpeg?cs=srgb&dl=pexels-suzy-hazelwood-3631711.jpg&fm=jpg"}>
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
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='primer_nombre'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.primer_nombre}
                                        />
                                        <label htmlFor="primer_nombre" className={styles.form_label}>Nombres y apellidos de Usuario</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.nombre_user ?? <div className = {notificationStyles.error}>{errors.nombre_user}</div>} */}
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='email'
                                            type="email"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.email}
                                        />
                                        <label htmlFor="email" className={styles.form_label}>Email</label>
                                        <span className={styles.form_line}></span>
                                        
                                        {/* {errors.correo ?? <div className = {notificationStyles.error}>{errors.correo}</div>} */}
                                    </div>
                                    <div className={styles.form_group}>
                                        <Field
                                            name='username'
                                            type="text"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.username}
                                        />
                                        <label htmlFor="username" className={styles.form_label}>Username</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.usuario ?? <div className = {notificationStyles.error}>{errors.user}</div>} */}
                                    </div>

                                    <div className={styles.form_group}>
                                        <Field
                                            name='password'
                                            type="password"
                                            className={styles.form_input}
                                            placeholder=""
                                            value={values.password}
                                        />
                                        <label htmlFor="password" className={styles.form_label}>Password</label>
                                        <span className={styles.form_line}></span>
                                        {/* {errors.password ?? <div className = {notificationStyles.error}>{errors.password}</div>} */}
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
    {editUser}
)(EditUser)