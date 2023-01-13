import { startTransition, useEffect, useState } from "react";
import {connect} from 'react-redux';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@mui/icons-material/Edit';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HistoryIcon from '@mui/icons-material/History';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {  green, yellow, red, blue } from '@mui/material/colors';
import styles from "../../styles/tables/tables.module.css";

import { fetchEspecialidadesByConsultorioId } from "../../redux/actions/especialidades";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {TableEspecialidades} from '../../interfaces'
import { Link } from "react-router-dom";
import FaceIcon from '@mui/icons-material/Face';

const useStyles = makeStyles({
  table: {
      minWidth: 650
  }
});

const ReadEspecialidadesList = (props:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const [rows, setRows] = useState([])
  
  // const [keys, setKeys] = useState([])
useEffect(()=>{
  props.fetchEspecialidadesByConsultorioId(location.state);
},[])

  useEffect(() => {
      
      setRows(props.especialidades);
      console.log("Especialidades",props.especialidades)
      console.log('id de consultorio', location)
      // setKeys(props.keys);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(props.especialidades)])

  useEffect(()=>{
    return ()=>{

    }
  },[JSON.stringify(rows)])

  const [searched, setSearched] = useState("");

  const classes = useStyles();

  const requestSearch = (searchedVal:any) => {
    const filteredRows = props.especialidades.filter((row:any) => {
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
  const profesionalRow = (props : any)=>{
    navigate('/profesionales',{state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}});
  }
  const historiaClinicaRow = (props : any)=>{
    navigate('/historias-clinicas',{state : {datosFila: JSON.parse(props.currentTarget.id), pathname : location.pathname}});
  }
  // return(
    //   <SearchingTable rows = {rows} keys = {keys}/>
    // )
  
    return(
      <>
      <Link  
        to='new'
        className = {styles.createButton}
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
        state={location.state}
      >
        <AddIcon style={{marginRight:'5%'}}/>
          Crear
      </Link>
      <Paper>
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
                          elemento !=='imagen_consultorio'
                            &&
                          elemento !=='id'
                            &&
                          elemento !=='createdAt'
                            &&
                          elemento !=='updatedAt'
                            &&
                          elemento !=='id_rol'
                            &&
                          elemento !=='consultorio_id'
                            &&
                          elemento !=='fecha_nacimiento'
                            &&
                          elemento !=='sexo'
                            ).map((key:any)=>{
                            return (
                              <TableCell key={key}>{key}</TableCell>
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
              Object.values(rows).map((valor:TableEspecialidades, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell align="right">{valor.nombre_especialidad}</TableCell>
                     <TableCell align="right">{valor.estado_especialidad ? 'activo' : 'inactivo'}</TableCell>
                     <TableCell align="right">{valor.consultorio.nombre_consultorio}</TableCell>
                     
                     <TableCell align="right" > 
                        <HistoryIcon
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                id_consultorio : location.state
                              }
                            )
                          } 
                          onClick = {
                            (props)=>{
                              historiaClinicaRow(props)
                            }
                          }
                          
                          className={styles.icon} 
                        />

                        <FaceIcon
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                consultorioId : location.state
                              }
                            )
                          } 
                          onClick = {
                            (props)=>{
                              profesionalRow(props)
                            }
                          }
                          
                          className={styles.icon} 
                        />
                        <EditIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                nombre_especialidad : valor.nombre_especialidad,
                                estado_especialidad : valor.estado_especialidad,
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
                              nombre_especialidad : valor.nombre_especialidad, 
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

      <Outlet/>
      </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { especialidades } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS

    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const consultorio in especialidades){
        keys = Object.keys(especialidades[consultorio]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const consultorioKeys = Object.values(keys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    especialidades : Object.values(especialidades),
    keys : consultorioKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchEspecialidadesByConsultorioId}
)(ReadEspecialidadesList);
