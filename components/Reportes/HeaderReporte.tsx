
import {PDFViewer, Document, Page, Text, View,Image} from '@react-pdf/renderer';
import { Consultorio } from '../../interfaces';
export const HeaderReporte = ({imagen_consultorio, nombre_consultorio, direccion_consultorio}:Consultorio)=>{
    return(
        <>
            {/* DIV PARA EL ENCABEZADO HORIZONTAL  */}
            <View style={{
                flexDirection : 'row',
                height: '6%',
                justifyContent : 'center',
                // backgroundColor : 'blue',
                }}>
                {/* HEADER  */}
                <View
                    style={{
                    flex : 1,
                    // backgroundColor : 'black',
                    flexDirection : 'row',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                    }}
                >
                    <Image
                    src={imagen_consultorio}
                    style = {{
                        width : '50%'
                    }}
                    />
                    <Text
                    style={{
                        fontSize : 10,
                        alignSelf : 'center'
                    }}
                    >
                    {nombre_consultorio}
                    </Text>
                </View>
                <View
                style={{
                    flex : 1,
                    // backgroundColor : 'white',
                    justifyContent : 'center',
                    alignContent : 'center',
                    alignItems : 'center',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    // backgroundColor : 'rgba(255, 179, 179, 0.8)'
                }}
                >
                    <Text
                    style={{
                        fontSize : 8,
                        // alignSelf : 'center',
                        // paddingVertical : 10
                    }}
                    >
                    Dirección : {direccion_consultorio}
                    </Text>
                </View>
                <View
                
                    style={{
                    flex : 4,
                    // backgroundColor : 'red',
                    justifyContent : 'center',
                    alignContent : 'center',
                    alignItems : 'center',
                    borderColor : 'rgba(0,0,0,0.1)',
                    borderWidth : 1,
                    padding : 1,
                    paddingLeft : 10,
                    backgroundColor : 'rgba(255, 179, 179, 0.8)'
                    }}
                >
                    <Text
                    style={{
                        fontSize : 20,

                    }}
                    >
                    HISTORIA CLINICA
                    </Text>
                </View>
                {/* FIN HEADER  */}
                </View>
                {/* FIN DIV PARA LA DIVISION DEL ENCABEZADO  */}
        </>
    )
}