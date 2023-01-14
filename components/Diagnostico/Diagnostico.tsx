import { Field } from "formik"
import { useEffect, useState } from "react";

import styles from '../../pages/HistoriasClinicas/historiaClinicaStyles/index.module.css';
export const Diagnostico = ({onChange}:any)=>{

    const [diagnostico, setDiagnostico] = useState({
        cie : "",
        pre : false,
        def : false,
        descripcion : ""
    })

    useEffect(() => {
        console.log('diagnostico desde cada componente', diagnostico);
        onChange(diagnostico)
        return () => {
        
        };
    }, [diagnostico])
    return (
        <div 
        style={{
            display : 'flex',
            flexDirection : 'column',
            backgroundColor : 'rgba(0,0,0,0.2)'
        }}
        >
            {/* DIV PARA HORIZONTAL DE RADIO PRE DEF CIE */}
            <div 
                style={{
                    display : 'flex',
                    flexDirection : 'row'
                }}
            >
                <label>CIE  </label>
                <input
                    type ={'text'}
                    name ={'CIE'}
                    style={{
                        width : '13%',
                        margin :'0% 7%'
                    }}
                    onChange={(valor)=>setDiagnostico({...diagnostico, cie : valor.target.value})}
                />
                <label>PRE</label>
                <input
                    type ='radio'
                    name='tipo_diagnostico'
                    style={{
                        
                        margin :'0% 4%'
                    }}
                    onChange={()=>{setDiagnostico({...diagnostico, pre : true, def : false})}}
                />
                <label>DEF</label>
                <input
                    type ='radio'
                    name='tipo_diagnostico'
                    style={{
                        margin :'0% 4%'
                    }}
                    onChange={()=>{setDiagnostico({...diagnostico, pre : false, def : true})}}
                    
                />
            </div>

            {/* FIN DIV PARA HORIZONTAL DE RADIO PRE DEF CIE  */}
            {/* DIV HORIZONTAL PARA CAMPO DE DIAGNOSTICO  */}
            <div className={styles.form_group}>
                <Field
                    name={'diagnostico'}
                    // key = {''}
                    type={'text'}
                    className={styles.form_input}
                    style={
                            {
                                zIndex: 999,
                                display: 'flex',
                                position:'relative'
                            }
                            
                        }
                    placeholder=""
                    onChange = {(valor:any)=>setDiagnostico({...diagnostico,descripcion : valor.target.value })}
                    value = {diagnostico.descripcion}
                />
                <label 
                    htmlFor="id"
                    style = {{
                        fontSize : '10px',
                    }} 
                    className={styles.form_label}
                >
                    DIAGNOSTICO
                </label>

                <span className={styles.form_line}></span>
                {/* {errors.id_usuario ?? <div className = {notificationStyles.error}>{errors.id_usuario}</div>} */}
            </div>
            {/* FIN DIV HORIZONTAL PARA CAMPO DE DIAGNOSTICO */}
        </div>
    )
    
}