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

import { fetchConsultorios } from "../../redux/actions/consultorios";
import { useLocation, useNavigate } from "react-router-dom";
import {TableConsultorios} from '../../interfaces'
const useStyles = makeStyles({
  table: {
      minWidth: 650
  }
});

const ReadConsultoriosList = (props:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const [rows, setRows] = useState([])
  // const [keys, setKeys] = useState([])
useEffect(()=>{
  props.fetchConsultorios();
},[])

  useEffect(() => {
      
      setRows(props.consultorios);
      // setKeys(props.keys);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(props.consultorios)])

  useEffect(()=>{
    return ()=>{

    }
  },[JSON.stringify(rows)])

  const [searched, setSearched] = useState("");

  const classes = useStyles();

  const requestSearch = (searchedVal:any) => {
    const filteredRows = props.consultorios.filter((row:any) => {
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
                          elemento !=='cedula_consultorio'
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
              Object.values(rows).map((valor:TableConsultorios, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell align="right">{valor.nombre_consultorio}</TableCell>
                     <TableCell align="right">{valor.direccion_consultorio}</TableCell>
                     <TableCell align="right">{valor.horario_atencion_consultorio}</TableCell>
                     <TableCell align="right">{valor.estado_consultorio ? 'activo' : 'inactivo'}</TableCell>
                     
                     <TableCell align="right" > 
                        <EditIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                nombre_consultorio : valor.nombre_consultorio,
                                direccion_consultorio : valor.direccion_consultorio,
                                horario_atencion_consultorio : valor.horario_atencion_consultorio,
                                estado_consultorio : valor.estado_consultorio,
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
                              nombre_consultorio : valor.nombre_consultorio, 
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
  const { consultorios } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS

    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const consultorio in consultorios){
        keys = Object.keys(consultorios[consultorio]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const consultorioKeys = Object.values(keys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    consultorios : Object.values(consultorios),
    keys : consultorioKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchConsultorios}
)(ReadConsultoriosList);
