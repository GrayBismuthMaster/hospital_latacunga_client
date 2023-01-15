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
import InfoIcon from '@mui/icons-material/Info';
import {  green, yellow, red, blue } from '@mui/material/colors';
import styles from "../../../styles/tables/tables.module.css";
import AddIcon from '@mui/icons-material/Add';

import { fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId } from "../../../redux/actions/detallesEvolucionesPrescripciones";
import { useLocation, useNavigate } from "react-router-dom";
import {TableDetallesEvolucionesPrescripciones} from '../../../interfaces'
import { NavLink } from "react-router-dom";
const useStyles = makeStyles({
  table: {
      minWidth: 650
  }
});

const ReadDetallesEvolucionesPrescripcionesList = (props:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const [rows, setRows] = useState([])
  // const [keys, setKeys] = useState([])
useEffect(()=>{
  console.log('props desde evoluciones',(location as any).state.datosFila.id_evolucion_prescripcion)
  props.fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId((location as any).state.datosFila.id_evolucion_prescripcion);
  console.log('evolcuones prescripciones', props)
},[])

  useEffect(() => {
      
      setRows(props.detallesEvolucionesPrescripciones);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(props.detallesEvolucionesPrescripciones)])

  useEffect(()=>{
    return ()=>{

    }
  },[JSON.stringify(rows)])

  const [searched, setSearched] = useState("");

  const classes = useStyles();

  const requestSearch = (searchedVal:any) => {
    const filteredRows = props.detallesEvolucionesPrescripciones.filter((row:any) => {
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
                          elemento !=='id'
                            &&
                          elemento !=='createdAt'
                            &&
                          elemento !=='updatedAt'
                          &&
                          elemento !=='id_evolucion_prescripcion'
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
              Object.values(rows).map((valor:TableDetallesEvolucionesPrescripciones, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell align="right">{valor.evolucion}</TableCell>
                     <TableCell align="right">{valor.medicamentos}</TableCell>
                     <TableCell align="right">{valor.prescripciones}</TableCell>
                     <TableCell align="right">{valor.evolucion_prescripcion.num_hoja}</TableCell>
                     
                     <TableCell align="right" > 
                      <InfoIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
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
                              editRow(props)
                              }}
                        />
                        <EditIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
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
                              id : valor.id,
                              nombre : valor.evolucion_prescripcion.num_hoja
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
  const { detallesEvolucionesPrescripciones } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS

    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const detalleEvolucionPrescripcion in detallesEvolucionesPrescripciones){
        keys = Object.keys(detallesEvolucionesPrescripciones[detalleEvolucionPrescripcion]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const detalleEvolucionPrescripcionKeys = Object.values(keys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    detallesEvolucionesPrescripciones : Object.values(detallesEvolucionesPrescripciones),
    keys : detalleEvolucionPrescripcionKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchDetallesEvolucionesPrescripcionesByEvolucionPrescripcionId}
)(ReadDetallesEvolucionesPrescripcionesList);
