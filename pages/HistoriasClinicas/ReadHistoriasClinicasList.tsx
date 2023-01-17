import { startTransition, useEffect, useState } from "react";
import {connect} from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MedicationIcon from '@mui/icons-material/Medication';
import ArticleIcon from '@mui/icons-material/Article'
import {  green, yellow, red, blue } from '@mui/material/colors';
import styles from "../../styles/tables/tables.module.css";
import AddIcon from '@mui/icons-material/Add';

import { fetchHistoriasClinicasByEspecialidadId } from "../../redux/actions/historiasClinicas";
import { useLocation, useNavigate } from "react-router-dom";
import {TableHistoriasClinicas} from '../../interfaces'
import { NavLink } from "react-router-dom";
const useStyles = makeStyles({
  table: {
      minWidth: 650
  }
});

const ReadHistoriasClinicasList = (props:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const [rows, setRows] = useState([])
  // const [keys, setKeys] = useState([])
useEffect(()=>{
  console.log('prop de consultorio',location)
  props.fetchHistoriasClinicasByEspecialidadId((location as any).state.datosFila.id);
},[])

  useEffect(() => {
      setRows(props.historiasClinicas);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(props.historiasClinicas)])

  useEffect(()=>{
    return ()=>{

    }
  },[JSON.stringify(rows)])

  const [searched, setSearched] = useState("");

  const classes = useStyles();

  const requestSearch = (searchedVal:any) => {
    const filteredRows = props.historiasClinicas.filter((row:any) => {
      return row.nombre.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  
  const editRow = (props: any)=>{
    console.log(props.currentTarget.id)
    navigate('edit', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  
  const deleteRow = (props: any)=>{
    console.log(props.currentTarget.id)
    navigate('delete', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  const evolucionPrescripcionRow = (props: any)=>{
    console.log(props.currentTarget.id)
    navigate('/evoluciones-prescripciones', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  const reporteHistoriaClinicaById = (props : any)=>{
    navigate('reporte', {state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}})
  }
  // return(
    //   <SearchingTable rows = {rows} keys = {keys}/>
    // )
  
    return(
      <>
      
      <NavLink  
        to='new'
        className = {styles.createButton}
        state={location.state}
        style={{
          display : 'flex',
          textDecoration : 'none',
          color : 'rgba(255, 255, 255, 0.9)',
          backgroundColor: '#0d8003',
          width: '10%',
          justifyContent: 'center',
          borderRadius: '8px',
          margin: '1%',
          padding : '.7%',
          boxShadow: 'rgba(0, 100, 20, 0.5) 5px 5px 5px'
        }}
      >
          <AddIcon style={{marginRight:'5%'}}/>
              Crear
      </NavLink>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                {
                        props.keys.filter(
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
                          elemento !=='signos_vitales_antropometria_fecha_medicion'
                            &&
                          elemento !=='signos_vitales_antropometria_temperatura'
                            &&
                          elemento !=='signos_vitales_antropometria_presion_arterial'
                            &&
                          elemento !=='signos_vitales_antropometria_pulso'
                          &&
                          elemento !=='signos_vitales_antropometria_peso'
                          &&
                          elemento !=='signos_vitales_antropometria_talla'
                          &&
                          elemento !=='examen_fisico_regional'
                          &&
                          elemento !=='firma'
                          &&
                          elemento !=='antecedentes_personales'
                          &&
                          elemento !=='antecedentes_familiares'
                          &&
                          elemento !=='id_especialidad_historia_clinica'
                          &&
                          elemento !=='id_profesional_historia_clinica'
                          &&
                          elemento !=='especialidad_historia_clinica'
                          &&
                          elemento !=='id_usuario_historia_clinica'
                            ).map((key:any)=>{
                            return (
                              <TableCell key={key}>{key.replace(/_/gi,' ').toUpperCase()}</TableCell>
                          )})
                }
                {
                  <TableCell>Acciones</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              
            {
              //RECORRIDO DE VALORES POR OBJETO
              Object.values(rows).map((valor:TableHistoriasClinicas, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell align="right">{valor.codigo}</TableCell>
                     <TableCell align="right">{valor.motivo_consulta}</TableCell>
                     <TableCell align="right">{valor.enfermedad_actual}</TableCell>
                     <TableCell align="right">{
                      valor.diagnostico.map((diagnos)=>diagnos.descripcion)
                     }</TableCell>
                     <TableCell align="right">{valor.planes_tratamiento}</TableCell>
                     <TableCell align="right">{`${valor.usuario_historia_clinica.primer_nombre} ${valor.usuario_historia_clinica.apellido_paterno}`}</TableCell>
                     <TableCell align="right">{valor.planes_tratamiento}</TableCell>
                     
                     <TableCell align="right" > 
                      <ArticleIcon 
                        id={
                          JSON.stringify(
                            {
                              historia_clinica : valor, 
                              consultorio_historia_clinica : (location as any).state.datosFila.id_consultorio
                             }
                          )
                        } 
                        sx={{ color: blue[300] }} 
                        className={styles.icon}
                        onClick={
                          (props)=>{
                            reporteHistoriaClinicaById(props)
                        }}
                      />
                      <MedicationIcon 
                          id={
                            JSON.stringify(
                              {
                                historia_clinica_id : valor.id, 
                                usuario_historia_clinica : valor.usuario_historia_clinica,
                                consultorio_historia_clinica : (location as any).state.datosFila.id_consultorio
                              }
                            )
                          } 
                          sx={
                            { 
                              color: blue[700] 
                            }
                          } 
                          className={styles.icon} 
                          onClick={
                            (props)=>{
                              evolucionPrescripcionRow(props)
                              }}
                        />
                        <EditIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                codigo : valor.codigo,
                                motivo_consulta : valor.motivo_consulta,
                                enfermedad_actual : valor.enfermedad_actual,
                                planes_tratamiento : valor.planes_tratamiento,
                              }
                            )
                          } 
                          sx={
                            { 
                              color: yellow[700] 
                            }
                          } 
                          className={styles.icon} 
                          onClick={
                            (props)=>{
                              editRow(props)
                              }}
                        />
                      
                      <DeleteIcon 
                        id={
                          JSON.stringify(
                            {
                              codigo : valor.codigo, 
                              id : valor.id
                            }
                          )
                        } 
                        sx={
                          { 
                            color: red[600] 
                            }
                          } 
                        className={styles.icon} 
                        onClick={
                          (props)=>{
                            deleteRow(props)
                          }
                        }/>
                      
                      </TableCell>
                  
                  </TableRow>
                )
              })
            }

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </>
    )
}

const mapStateToProps = (state : any) => {
  const { historiasClinicas } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS

    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const historiaClinica in historiasClinicas){
        keys = Object.keys(historiasClinicas[historiaClinica]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const historiaClinicaKeys = Object.values(keys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    historiasClinicas : Object.values(historiasClinicas),
    keys : historiaClinicaKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchHistoriasClinicasByEspecialidadId}
)(ReadHistoriasClinicasList);
