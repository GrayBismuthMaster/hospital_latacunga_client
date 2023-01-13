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
                          elemento !=='imagen_historiaClinica'
                            &&
                          elemento !=='id'
                            &&
                          elemento !=='createdAt'
                            &&
                          elemento !=='updatedAt'
                            &&
                          elemento !=='especialidad_id'
                            &&
                          elemento !=='cedula_historiaClinica'
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
              Object.values(rows).map((valor:TableHistoriasClinicas, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell align="right">{valor.primer_nombre}</TableCell>
                     <TableCell align="right">{valor.segundo_nombre}</TableCell>
                     <TableCell align="right">{valor.apellido_paterno}</TableCell>
                     <TableCell align="right">{valor.apellido_materno}</TableCell>
                     <TableCell align="right">{valor.enfermedad_actual}</TableCell>
                     <TableCell align="right">{valor.motivo_consulta}</TableCell>
                     <TableCell align="right">{JSON.stringify(valor.diagnostico)}</TableCell>
                     
                     <TableCell align="right" > 
                        <EditIcon 
                          id={
                            JSON.stringify(
                              {
                                id : valor.id, 
                                primer_nombre : valor.primer_nombre,
                                segundo_nombre : valor.segundo_nombre,
                                apellido_paterno : valor.apellido_paterno,
                                apellido_materno : valor.apellido_materno,
                                enfermedad_actual : valor.enfermedad_actual,
                                motivo_consulta : valor.motivo_consulta,
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
                              primer_nombre : valor.primer_nombre, 
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
