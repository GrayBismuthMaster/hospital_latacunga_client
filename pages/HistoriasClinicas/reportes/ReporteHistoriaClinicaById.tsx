import React, { useEffect } from 'react'
import { useLocation} from 'react-router-dom';
// import DraBettyGarzonServer from '../../../../../../apis/DraBettyGarzonServer';
// import { saveAs } from 'file-saver';
import {PDFViewer, Document, Page, Text, View,Image} from '@react-pdf/renderer';
import { connect } from 'react-redux';
// import LogoDermatologia from '../../../../../../../assets/LogoDermatologiaHG.png';
import { fetchConsultorio } from '../../../redux/actions/consultorios';
import { Consultorio } from '../../../interfaces';
import {HeaderReporte} from '../../../components/Reportes/HeaderReporte';
import {HistoriaClinicaPrimeraFila} from '../../../data/historiasClinicas/HistoriaClinicaPrimeraFila';
import {formatTitle ,calcularEdad} from '../../../utils/';

const ReporteHistoriaClinicaById = (props:any) => {
    
    const location = useLocation();
    //const params = useParams();
    console.log('location desde edit')
    console.log(location.state)
    useEffect(() => {
      props.fetchConsultorio((location as any).state.datosFila.consultorio_historia_clinica);  
    }, [])
    let {historia_clinica} = (location as any).state.datosFila;
    console.log('historia clinica',Object.keys(historia_clinica.usuario_historia_clinica))
    historia_clinica.usuario_historia_clinica = {...historia_clinica.usuario_historia_clinica, edad: calcularEdad(historia_clinica.usuario_historia_clinica.fecha_nacimiento)};

  return (
    <PDFViewer style ={{
      width : '100%',
      height : '100%',
    }}>
      <Document>
        <Page >
          <View style={{
            flexDirection : 'column',
            height: '100%',
            width: '100%',
            // backgroundColor : 'green',
            padding : '1% 5%',
          }}>
            <HeaderReporte
              imagen_consultorio={props.consultorios[0].imagen_consultorio}
              nombre_consultorio={props.consultorios[0].nombre_consultorio}
              direccion_consultorio={props.consultorios[0].direccion_consultorio}
              tipo_documento = {'HISTORIA CLINICA'}
            />
            {/* DIV PARA EL CONTENIDO 90% */}
              <View style={{
                flexDirection : 'column',
                height: '90%',
                width: '100%',
                // backgroundColor : 'green',
              }}>
                {/* PRIMERA FILA  */}
                <View
                  style={{
                    height : '4%',
                    width : '100%',
                    // backgroundColor : 'white',
                    fontSize : 8,
                  }}
                >
                  <View
                    style={{
                      flex : 1,
                      flexDirection : 'row',
                      justifyContent: 'center',
                      alignContent : 'center',
                      alignItems : 'center',
                      fontSize : 7
                    }}
                  >
                    {
                      Object.keys(historia_clinica.usuario_historia_clinica)
                      .filter(
                        (elemento:any) => elemento !== 'fecha_actual' 
                          && 
                        elemento !=='revision_actual_organos_sistemas'
                          &&
                        elemento !=='id'
                          &&
                        elemento !=='createdAt'
                          &&
                        elemento !=='updatedAt'
                        &&
                        elemento !=='telefono'
                        &&
                        elemento !=='estado'
                        &&
                        elemento !=='imagen'
                        &&
                        elemento !=='username'
                        &&
                        elemento !=='email'
                        &&
                        elemento !=='password'
                        &&
                        elemento !=='id_rol'
                        &&
                        elemento !=='fecha_nacimiento'
                        &&
                        elemento !=='edad'
                          
                        )
                      .map((keys)=>(
                        <Text
                          style={{
                            flex : 1,
                            borderColor : 'black',
                            borderWidth : 1,
                            padding : 1,
                            paddingLeft : 10,
                            backgroundColor : 'rgba(2, 9, 74,0.9)',
                            color : 'rgba(255,255,255,0.9)'
                          }}
                        >
                          {
                            formatTitle(keys)
                          }
                          </Text>
                        )
                      )
                    }
                  </View>
                  <View
                    style={{
                      flex : 1,
                      flexDirection : 'row',
                      justifyContent: 'center',
                      alignContent : 'center',
                      alignItems : 'center',
                    }}
                    
                  >
                    {
                      Object.entries(historia_clinica.usuario_historia_clinica)
                      .filter(
                          (key:any)=>
                            key[0] !== 'fecha_actual' 
                            && 
                            key[0] !=='revision_actual_organos_sistemas'
                            &&
                            key[0] !=='id'
                            &&
                            key[0] !=='createdAt'
                            &&
                            key[0] !=='updatedAt'
                            &&
                            key[0] !=='telefono'
                            &&
                            key[0] !=='estado'
                            &&
                            key[0] !=='imagen'
                            &&
                            key[0] !=='username'
                            &&
                            key[0] !=='email'
                            &&
                            key[0] !=='password'
                            &&
                            key[0] !=='id_rol'
                            &&
                            key[0] !=='fecha_nacimiento'
                            &&
                            key[0] !=='edad'
                      )
                      .map((keys:any)=>(
                        <Text
                          style={{
                            flex : 1,
                            borderColor : 'black',
                            borderWidth : 1,
                            padding : 2,
                            paddingLeft : 10
                          }}
                        >
                          {
                            keys[1]
                          }
                        </Text>
                      ))
                    }
                  </View>
                  
                </View>
                    {/* FIN PRIMERA FILA  */}
                <View
                  style={{
                    height : '4%',
                    width : '100%',
                    // backgroundColor : 'red',
                    fontSize : 8,
                    borderColor : 'black',
                    borderWidth : 1
                  }}
                >
                  <View
                    style={{
                      flex : 1,
                      flexDirection : 'row',
                      justifyContent: 'center',
                      alignContent : 'center',
                      alignItems : 'center',
                      
                    }}
                  >
                    {
                      Object.keys(historia_clinica.usuario_historia_clinica)
                      .filter(
                        (elemento:any) => 
                        elemento !== 'fecha_actual' 
                          && 
                        elemento !=='apellido_paterno'
                          &&
                        elemento !=='id'
                          &&
                        elemento !=='createdAt'
                          &&
                        elemento !=='updatedAt'
                        &&
                        elemento !=='telefono'
                        &&
                        elemento !=='estado'
                        &&
                        elemento !=='imagen'
                        &&
                        elemento !=='username'
                        &&
                        elemento !=='email'
                        &&
                        elemento !=='password'
                        &&
                        elemento !=='id_rol'
                        &&
                        elemento !=='primer_nombre'
                        &&
                        elemento !=='segundo_nombre'
                        &&
                        elemento !=='apellido_materno'
                        &&
                        elemento !=='cedula_identidad'
                        
                        &&
                        elemento !=='sexo'
                        )
                      .map((keys)=>(
                        <Text
                          style={{
                            flex : 1,
                            borderColor : 'rgba(0,0,0,0.1)',
                            borderWidth : 1,
                            padding : 1,
                            paddingLeft : 10,
                            backgroundColor : 'rgba(2, 9, 74,0.9)',
                            color : 'rgba(255,255,255,0.9)'
                          }}
                        >
                          {
                            formatTitle(keys)
                          }
                          </Text>
                        )
                      )
                    }
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                          backgroundColor : 'rgba(2, 9, 74,0.9)',
                          color : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        MÉDICO
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                          backgroundColor : 'rgba(2, 9, 74,0.9)',
                          color : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        ESPECIALIDAD
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                          backgroundColor : 'rgba(2, 9, 74,0.9)',
                          color : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        CODIGO
                      </Text>
                  </View>
                  {/* SEGUNDA FILA  */}
                    <View
                      style={{
                        flex : 1,
                        flexDirection : 'row',
                        justifyContent: 'center',
                        alignContent : 'center',
                        alignItems : 'center'
                      }}
                    >
                      {
                        Object.entries(historia_clinica.usuario_historia_clinica)
                        .filter(
                            (key:any)=>
                            key[0] !== 'fecha_actual' 
                              && 
                              key[0] !=='revision_actual_organos_sistemas'
                              &&
                              key[0] !=='id'
                              &&
                              key[0] !=='createdAt'
                              &&
                              key[0] !=='updatedAt'
                              &&
                              key[0] !=='telefono'
                              &&
                              key[0] !=='estado'
                              &&
                              key[0] !=='imagen'
                              &&
                              key[0] !=='username'
                              &&
                              key[0] !=='email'
                              &&
                              key[0] !=='password'
                              &&
                              key[0] !=='id_rol'
                              &&
                              key[0] !=='primer_nombre'
                              &&
                              key[0] !=='segundo_nombre'
                              &&
                              key[0] !=='apellido_materno'
                              &&
                              key[0] !=='apellido_paterno'
                              
                              &&
                              key[0] !=='cedula_identidad'
                              
                              &&
                              key[0] !=='sexo'
                        )
                        .map((keys:any)=>(
                          <Text
                            style={{
                              flex : 1,
                              
                              borderColor : 'rgba(0,0,0,0.1)',
                              borderWidth : 1,
                              padding : 1,
                              paddingLeft : 10
                            }}
                          >
                            {
                              keys[0] === 'fecha_nacimiento' ? new Date(keys[1]).toLocaleDateString() : keys[1]
                            }
                          </Text>
                        ))
                      }
                        <Text
                          style={{
                            flex : 1,
                            borderColor : 'rgba(0,0,0,0.1)',
                            borderWidth : 1,
                            padding : 1,
                            paddingLeft : 10
                            // backgroundColor : 'rgba(0,0,0,0.2)'
                          }}
                        >
                          {
                            `${historia_clinica.profesional_historia_clinica.nombre_profesional} ${historia_clinica.profesional_historia_clinica.apellido_profesional} ` 
                          }
                        </Text>
                        <Text
                          style={{
                            flex : 1,
                            borderColor : 'rgba(0,0,0,0.1)',
                            borderWidth : 1,
                            padding : 1,
                            paddingLeft : 10
                            // backgroundColor : 'rgba(0,0,0,0.2)'
                          }}
                        >
                          {
                            `${historia_clinica.especialidad_historia_clinica.nombre_especialidad}` 
                          }
                        </Text>
                        <Text
                          style={{
                            flex : 1,
                            borderColor : 'rgba(0,0,0,0.1)',
                            borderWidth : 1,
                            padding : 1,
                            paddingLeft : 10
                            // backgroundColor : 'rgba(0,0,0,0.2)'
                          }}
                        >
                          {
                            `${historia_clinica.codigo}  ` 
                          }
                        </Text>
                    </View>
                    {/* FIN SEGUNDA FILA  */}
                </View>
                {/* TERCERA FILA  */}
                <View
                  style={{
                    height : '4%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8
                  }}
              >
                <View
                  style={{
                    flex : 1,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text>
                    1. MOTIVO CONSULTA
                  </Text>
                </View>
                <View
                  style={{
                    flex : 1,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10
                  }}
                >
                  <Text>
                    {historia_clinica.motivo_consulta}
                  </Text>
                </View>
                
              </View>
              {/* FIN TERCERA FILA  */}
              {/* CUARTA FILA  */}
              <View
                  style={{
                    height : '8%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text>
                    2. ANTECEDENTES PERSONALES
                  </Text>
                </View>
                <View
                  style={{
                    flex : 4,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                  }}
                >
                  <Text>
                    {historia_clinica.antecedentes_personales}
                  </Text>
                </View>
                
              </View>
              {/* FIN CUARTA FILA  */}
              {/* QUINTA FILA  */}
              <View
                  style={{
                    height : '5%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text>
                    3. ANTECEDENTES FAMILIARES
                  </Text>
                </View>
                <View
                  style={{
                    flex : 3,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                  }}
                >
                  <Text>
                    {historia_clinica.antecedentes_familiares}
                  </Text>
                </View>
                
              </View>
              {/* FIN QUINTA FILA  */}
              {/* SEXTA FILA  */}
              <View
                  style={{
                    height : '9%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text>
                    4. ENFERMEDAD O PROBLEMA ACTUAL
                  </Text>
                </View>
                <View
                  style={{
                    flex : 4,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  <Text>
                    {historia_clinica.antecedentes_familiares}
                  </Text>
                </View>
                
              </View>
              {/* FIN SEXTA FILA  */}
              {/* SEPTIMA FILA  */}
              <View
                  style={{
                    height : '7%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    flexDirection : 'row',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text
                    style={{
                      flex : 3
                    }}
                  >
                    5. REVISIÓN ACTUAL ÓRGANOS Y SISTEMAS
                  </Text
                  >
                  <Text
                    style={{
                      flex : 2,
                      fontSize : 6
                    }}
                  >
                    CP = CON EVIDENCIA DE PATOLOGÍA MARCA X Y DESCRIBIR ABAJO ANOTADO EL NÚMERO Y LETRA CORRESPONDIENTE
                  </Text>
                  <Text
                    style={{
                      flex : 2,
                      fontSize : 6
                    }}
                  >
                    SP= SIN EVIDENCIA DE PATOLOGÍA MARCAR X Y NO DESCRIBIR
                  </Text>
                </View>
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  {
                    historia_clinica.revision_actual_organos_sistemas.map((revision:any)=>(  
                      <Text>
                        {`${revision.key}. ${revision.name} ${revision.CP ? ' - CP : '+revision.Descripcion : ''}`}
                      </Text>
                    ))
                  }
                </View>
                
              </View>
              {/* FIN SEPTIMA FILA  */}
              {/* OCTAVA FILA  */}
              <View
                  style={{
                    height : '15%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text>
                    6. SIGNOS VITALES Y ANTROPOMETRIA
                  </Text>
                </View>
                <View
                  style={{
                    flex : 4,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  <Text
                    style={{
                      width : '100%',
                      borderColor : 'rgba(0,0,0,0.1)',
                      borderWidth : 1,
                      padding : 2
                    }}
                  >
                    FECHA DE MEDICIÓN : {new Date(historia_clinica.signos_vitales_antropometria_fecha_medicion).toLocaleDateString()}
                  </Text>
                  <Text
                  style={{
                    width : '100%',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 2
                  }}
                  >
                    TEMPERATURA : {historia_clinica.signos_vitales_antropometria_temperatura}
                  </Text>
                  <Text
                  
                  style={{
                    width : '100%',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 2
                  }}
                  >
                    PRESIÓN ARTERIAL : {historia_clinica.signos_vitales_antropometria_presion_arterial}
                  </Text>
                  <Text
                  
                  style={{
                    width : '100%',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 2
                  }}
                  >
                    PULSO/min FRECUENCIA RESPIRATORIA : {historia_clinica.signos_vitales_antropometria_pulso}
                  </Text>
                  <Text
                    style={{
                      width : '100%',
                      borderColor : 'rgba(0,0,0,0.1)',
                      borderWidth : 1,
                      padding : 2
                    }}
                  >
                    PESO/kg TALLA/cm : {`Peso : ${historia_clinica.signos_vitales_antropometria_peso} - Talla : ${historia_clinica.signos_vitales_antropometria_talla}`}
                  </Text>
                </View>
                
              </View>
              {/* FIN OCTAVA FILA  */}
              {/* NOVENA FILA  */}
              <View
                  style={{
                    height : '7%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    flexDirection : 'row',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text
                    style={{
                      flex : 3
                    }}
                  >
                    7. EXAMEN FÍSICO REGIONAL
                  </Text>
                  <Text
                    style={{
                      flex : 2,
                      fontSize : 6
                    }}
                  >
                    CP = CON EVIDENCIA DE PATOLOGÍA MARCA X Y DESCRIBIR ABAJO ANOTADO EL NÚMERO Y LETRA CORRESPONDIENTE
                  </Text>
                  <Text
                    style={{
                      flex : 2,
                      fontSize : 6
                    }}
                  >
                    SP= SIN EVIDENCIA DE PATOLOGÍA MARCAR X Y NO DESCRIBIR
                  </Text>
                </View>
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    // padding : 1,
                    // paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  {
                    historia_clinica.examen_fisico_regional.map((revision:any)=>(  
                      <Text
                        style={{
                          
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                      // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                        }}
                      >
                        {`${revision.key}. ${revision.name} ${revision.CP ? ' - CP : '+revision.Descripcion : ''}`}
                      </Text>
                    ))
                  }
                </View>
                
              </View>
              {/* FIN NOVENA FILA  */}
              {/* DECIMA FILA  */}
              <View
                  style={{
                    height : '9%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    flexDirection : 'row',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text
                    style={{
                      flex : 2
                    }}
                  >
                    8. DIAGNÓSTICO
                  </Text>
                  <View
                    style={{
                      flex : 4
                    }}
                  >
                    <Text>
                      PRE = PRESUNTIVO
                    </Text>
                    <Text>
                      DEF = DEFINITIVO
                    </Text> 
                  </View>
                </View>
                <View
                  style={{
                    flex : 4,
                    flexDirection : 'column',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    // padding : 1,
                    // paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  {
                    historia_clinica.diagnostico.map((diagnostico:any, index:any)=>(
                      <View
                        style={{
                          flex : 1,
                          // backgroundColor : 'white',
                          flexDirection : 'row',
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                          // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                        }}
                      >
                        <View
                          style={{
                            flex : 4,
                          }}
                        >
                          <Text>
                            {`${index+1}. ${diagnostico.descripcion}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex : 2,
                          }}
                        >
                          <Text>
                            {`CIE:${diagnostico.cie}  PRE:${diagnostico.pre ? 'X' : ''}  DEF:${diagnostico.def ? 'X': ''}`}
                          </Text>
                        </View>
                      </View>
                        
                    
                    ))
                  }
                </View>
              </View>
              {/* FIN DECIMA FILA  */}
              {/* ONCEAVA FILA  */}
              <View
                  style={{
                    height : '9%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                  }}
              >
                <View
                  style={{
                    flex : 2,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  <Text
                  >
                    9. PLANES DE TRATAMIENTO
                  </Text>
                </View>
                <View
                  style={{
                    flex : 4,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    // padding : 1,
                    // paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  <Text
                    style={{
                      borderColor : 'rgba(0,0,0,0.1)',
                      borderWidth : 1,
                      padding : 1,
                      paddingLeft : 10,
                      // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                    }}
                  >
                    {historia_clinica.planes_tratamiento}
                  </Text>
                </View>
                
              </View>
              {/* FIN ONCEAVA FILA  */}
              {/* DOCEAVA FILA  */}
              <View
                  style={{
                    height : '3%',
                    width : '100%',
                    // backgroundColor : 'blue',
                    fontSize : 8,
                    justifyContent : 'center',
                    flexDirection : 'row',
                    alignContent : 'space-around'
                  }}
              >
                <Text
                  style={{
                    flex : 1,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  FECHA : {new Date(historia_clinica.createdAt).toLocaleDateString()}
                </Text>
                <Text
                  style={{
                    flex : 1,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10
                  }}
                >
                  HORA : {new Date(historia_clinica.createdAt).toLocaleTimeString()}
                </Text>
                <Text
                  style={{
                    flex : 2,
                    fontSize : 7,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  NOMBRE DEL PROFESIONAL : {`${historia_clinica.profesional_historia_clinica.nombre_profesional} ${historia_clinica.profesional_historia_clinica.apellido_profesional}`}
                </Text>
                <Text
                  style={{
                    flex : 1,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                  }}
                >
                  CODIGO : {historia_clinica.codigo}
                </Text>
                <Text
                  style={{
                    flex : 1,
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(2, 9, 74,0.9)',
                    color : 'rgba(255,255,255,0.9)'
                  }}
                >
                  FIRMA : 
                </Text>
              </View>
              {/* FIN DOCEAVA FILA  */}
            </View>     
            
            {/* FIN DIV PARA EL CONTENIDO 90% */}

            {/*  FIN DIV PARA EL ENCABEZADO VERTICAL  */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
    
  )
}

const mapStateToProps = (state : any) => {
  const { consultorios } = state;

  return {
    consultorios : Object.values(consultorios),
  }
}
export default connect(
  mapStateToProps,
  {fetchConsultorio}
)(ReporteHistoriaClinicaById);
