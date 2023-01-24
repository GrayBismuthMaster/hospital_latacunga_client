import React, { useEffect } from 'react'
import { useLocation} from 'react-router-dom';
// import DraBettyGarzonServer from '../../../../../../apis/DraBettyGarzonServer';
// import { saveAs } from 'file-saver';
import {PDFViewer, Document, Page, Text, View,Image} from '@react-pdf/renderer';
import { connect } from 'react-redux';
// import LogoDermatologia from '../../../../../../../assets/LogoDermatologiaHG.png';
import { fetchConsultorio } from '../../../redux/actions/consultorios';
import { fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId } from '../../../redux/actions/detallesEvolucionesPrescripciones';
import {HeaderReporte} from '../../../components/Reportes/HeaderReporte';
import {formatTitle ,calcularEdad} from '../../../utils';

const ReporteEvolucionPrescripcionById = (props:any) => {
    
    const location = useLocation();
    //const params = useParams();
    console.log('location desde reporte')
    console.log(location.state)
    useEffect(() => {
      props.fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId((location as any).state.datosFila.evolucion_prescripcion.id)
      props.fetchConsultorio((location as any).state.datosFila.consultorio_evolucion_prescripcion);  
    }, [])
    let {evolucion_prescripcion} = (location as any).state.datosFila;
    console.log('USUARIO',Object.keys(evolucion_prescripcion.usuario_evolucion_prescripcion))
    console.log('PROPS DESDE REPORTE EVOLUCION', props.detallesEvolucionesPrescripciones);
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
              tipo_documento = {'EVOLUCIONES'}
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
                      height : '5%',
                      width : '100%',
                      // backgroundColor : 'blue',
                      fontSize : 8,
                      justifyContent : 'center',
                      alignContent : 'center',
                      paddingTop : 5
                    }}
                  >
                    <View
                      style={{
                        flex : 1,
                        borderColor : 'rgba(0,0,0,0.1)',
                        borderWidth : 0.7,
                        backgroundColor : 'rgba(0, 0, 102,0.7)',
                        flexDirection : 'row',
                        color : 'white',
                      }}
                    >
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        ESTABLECIMIENTO
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        NOMBRE
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        APELLIDO
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        SEXO
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        NUMERO DE HOJA
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        HISTORIA CLINICA
                      </Text>
                    </View>
                    <View
                      style={{
                        flex : 1,
                        borderColor : 'rgba(0,0,0,0.1)',
                        borderWidth : 1,
                        flexDirection : 'row'
                      }}
                    >
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        {props.consultorios[0].nombre_consultorio}
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        {(location as any).state.datosFila.usuario_evolucion_prescripcion.primer_nombre}
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        {(location as any).state.datosFila.usuario_evolucion_prescripcion.apellido_paterno}
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        {(location as any).state.datosFila.usuario_evolucion_prescripcion.sexo}
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        {(location as any).state.datosFila.evolucion_prescripcion.num_hoja}
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        {(location as any).state.datosFila.historia_clinica_evolucion_prescripcion.codigo}
                      </Text>
                    </View>
                    
                  </View>
                  {/* FIN PRIMERA FILA  */}
                  {/* SEGUNDA FILA  */}
                    <View
                      style={{
                        height : '3%',
                        width : '100%',
                        // backgroundColor : 'blue',
                        fontSize : 8,
                        flexDirection : 'column'
                      }}
                  >
                    <View
                      style={{
                        flex : 1,
                        backgroundColor : 'rgba(0, 0, 102,0.7)',
                        color : 'white',
                        flexDirection : 'row'
                      }}
                    >
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        FECHA
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        HORA
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        EVOLUCIÓN
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        PRESCRIPCIONES
                      </Text>
                      <Text
                        style={{
                          flex : 1,
                          borderColor : 'rgba(0,0,0,0.1)',
                          borderWidth : 1,
                          padding : 1,
                          paddingLeft : 10,
                        }}
                      >
                        MEDICAMENTOS
                      </Text>
                    </View>
                    
                  </View>
                  {/* FIN SEGUNDA FILA  */}
                  {
                    props.detallesEvolucionesPrescripciones.map((detalles:any)=>(
                      <View
                        style={{
                          height : '3%',
                          width : '100%',
                          // backgroundColor : 'blue',
                          fontSize : 8,
                          flexDirection : 'column'
                        }}
                      >
                        <View
                          style={{
                            flex : 1,
                            // backgroundColor : 'rgba(255, 179, 179, 0.8)',
                            flexDirection : 'row'
                          }}
                        >
                          <Text
                            style={{
                              flex : 1,
                              borderColor : 'rgba(0,0,0,0.1)',
                              borderWidth : 1,
                              padding : 1,
                              paddingLeft : 10,
                            }}
                          >
                            {new Date(detalles.createdAt).toLocaleDateString()}
                          </Text>
                          <Text
                            style={{
                              flex : 1,
                              borderColor : 'rgba(0,0,0,0.1)',
                              borderWidth : 1,
                              padding : 1,
                              paddingLeft : 10,
                            }}
                          >
                            {new Date(detalles.createdAt).toLocaleTimeString()}
                          </Text>
                          <Text
                            style={{
                              flex : 1,
                              borderColor : 'rgba(0,0,0,0.1)',
                              borderWidth : 1,
                              padding : 1,
                              paddingLeft : 10,
                            }}
                          >
                            {detalles.evolucion}
                          </Text>
                          <Text
                            style={{
                              flex : 1,
                              borderColor : 'rgba(0,0,0,0.1)',
                              borderWidth : 1,
                              padding : 1,
                              paddingLeft : 10,
                            }}
                          >
                            {detalles.prescripciones}
                          </Text>
                          <Text
                            style={{
                              flex : 1,
                              borderColor : 'rgba(0,0,0,0.1)',
                              borderWidth : 1,
                              padding : 1,
                              paddingLeft : 10,
                            }}
                          >
                            {detalles.medicamentos}
                          </Text>
                        </View>
                        
                      </View>
                    ))
                  }
                  
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
  const { consultorios, detallesEvolucionesPrescripciones } = state;
  return {
    consultorios : Object.values(consultorios),
    detallesEvolucionesPrescripciones : Object.values(detallesEvolucionesPrescripciones)
  }
}
export default connect(
  mapStateToProps,
  {fetchConsultorio,fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId}
)(ReporteEvolucionPrescripcionById );
