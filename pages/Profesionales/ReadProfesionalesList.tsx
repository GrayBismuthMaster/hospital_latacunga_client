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
import DeleteIcon from '@mui/icons-material/Delete';
import {  green, yellow, red, blue } from '@mui/material/colors';
import styles from "../../styles/tables/tables.module.css";

import profesionalStyles from './profesionalStyles/index.module.css'
import AddIcon from '@mui/icons-material/Add';

import { fetchProfesionalesByEspecialidadId } from "../../redux/actions/profesionales";
import { useLocation, useNavigate } from "react-router-dom";
import {TableProfesionales} from '../../interfaces'
import { NavLink } from "react-router-dom";
const useStyles = makeStyles({
  table: {
      minWidth: 650
  }
});

const ReadProfesionalesList = (props:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const [rows, setRows] = useState([])
  // const [keys, setKeys] = useState([])
useEffect(()=>{
  props.fetchProfesionalesByEspecialidadId((location as any).state.datosFila.id);
},[])

  useEffect(() => {
      console.log('id de consultorio desde profesionales', location.state)
      setRows(props.profesionales);
      // setKeys(props.keys);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(props.profesionales)])

  useEffect(()=>{
    return ()=>{

    }
  },[JSON.stringify(rows)])

  const [searched, setSearched] = useState("");

  const classes = useStyles();

  const requestSearch = (searchedVal:any) => {
    const filteredRows = props.profesionales.filter((row:any) => {
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
  
  // return(
    //   <SearchingTable rows = {rows} keys = {keys}/>
    // )
  
    return(
      <>
      
      <NavLink  
        to='new'
        className = {profesionalStyles.createButton}
        state={location.state}
      > 
          <AddIcon style={{marginRight:'5%'}}/>
              Crear
      </NavLink>
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
                          elemento !=='imagen_profesional'
                            &&
                          elemento !=='id'
                            &&
                          elemento !=='createdAt'
                            &&
                          elemento !=='updatedAt'
                            &&
                          elemento !=='especialidad_id'
                            &&
                          elemento !=='cedula_profesional'
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
              Object.values(rows).map((valor:TableProfesionales, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell align="right">{valor.nombre_profesional}</TableCell>
                     <TableCell align="right">{valor.apellido_profesional}</TableCell>
                     <TableCell align="right">{valor.telefono_profesional}</TableCell>
                     <TableCell align="right">{valor.direccion_profesional}</TableCell>
                     <TableCell align="right">{valor.correo_profesional}</TableCell>
                     <TableCell align="right">{valor.estado_profesional ? 'activo' : 'inactivo'}</TableCell>
                     <TableCell align="right">{valor.especialidad.nombre_especialidad}</TableCell>
                     
                     <TableCell align="right" > 
                        <EditIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                nombre_profesional : valor.nombre_profesional,
                                apellido_profesional : valor.apellido_profesional,
                                cedula_profesional : valor.cedula_profesional,
                                correo_profesional : valor.correo_profesional,
                                direccion_profesional : valor.direccion_profesional,
                                estado_profesional : valor.estado_profesional,
                                telefono_profesional : valor.telefono_profesional,
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
                              nombre_profesional : valor.nombre_profesional, 
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
              //RECORRIDO POR ARRAY

                // rows.map((row:any) => (
                //   <TableRow key={row.USER} >
                //     <TableCell component="th" scope="row">
                //       {row.ID}
                //     </TableCell>
                //     <TableCell align="right">{row.ID_USUARIO}</TableCell>
                //     <TableCell align="right">{row.USER}</TableCell>
                //     <TableCell align="right">{row.ROL}</TableCell>
                //     <TableCell align="right">{row.NOMBRE_USER}</TableCell>
                //     <TableCell align="right">{row.TELEFONO}</TableCell>
                //     <TableCell align="right">{row.CORREO}</TableCell>
                //     <TableCell align="right" ><EditIcon id={JSON.stringify({ID : row.ID, ID_USUARIO : row.ID_USUARIO, USER: row.USER, ROL: row.ROL, NOMBRE_USER : row.NOMBRE_USER, TELEFONO : row.TELEFONO, CORREO : row.CORREO})} sx={{ color: yellow[700] }} className={styles.icon} onClick={(props)=>{editRow(props)}}  />            <DeleteIcon id={JSON.stringify({ID : row.ID, NOMBRE_USER : row.NOMBRE_USER, ID_USUARIO : row.ID_USUARIO})} sx={{ color: red[600] }} className={styles.icon} onClick={(props)=>{deleteRow(props)}}/></TableCell>
                //   </TableRow>
                // ))
            }

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </>
    )
  
  
}

const mapStateToProps = (state : any) => {
  const { profesionales } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS

    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const profesional in profesionales){
        keys = Object.keys(profesionales[profesional]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const profesionalKeys = Object.values(keys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    profesionales : Object.values(profesionales),
    keys : profesionalKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchProfesionalesByEspecialidadId}
)(ReadProfesionalesList);
