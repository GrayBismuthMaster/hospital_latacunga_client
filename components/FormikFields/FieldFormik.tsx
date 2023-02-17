import React from "react";
import styles from '../../pages/Profesionales/profesionalStyles/index.module.css';
import { Field, useField, useFormikContext } from "formik";
export const FieldFormik = ({...props}:any)=>{
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <div className={styles.form_group}>
            <Field
                {...field}
                {...props}
                name={props.name}
                key = {props.key}
                type={props.type}
                className={styles.form_input}
                style={
                        {
                            zIndex: 999,
                            display: 'flex',
                            position:'relative'
                        }
                        
                    }
                placeholder=""
            />
            <label 
                htmlFor="id"
                style = {{
                    fontSize : '10px',
                }} 
                className={styles.form_label}
            >
                {props.nombre}
            </label>

            <span className={styles.form_line}></span>
            {/* {props.errors[props.name] ?? <div >Muerte</div>} */}
        </div>
    )
}