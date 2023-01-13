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

import { fetchUsers } from "../../redux/actions/users";
import { useLocation, useNavigate } from "react-router-dom";
import {TableUsers} from '../../interfaces'
const useStyles = makeStyles({
  table: {
      minWidth: 650
  }
});

const ReadUsersList = (props:any) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const [rows, setRows] = useState([])
  // const [keys, setKeys] = useState([])
useEffect(()=>{
  props.fetchUsers();
},[])

  useEffect(() => {
      
      setRows(props.users);
      // setKeys(props.keys);
      setDidLoad(true)
    return () => {
      
    }
  },[didLoad ,JSON.stringify(props.users)])

  useEffect(()=>{
    return ()=>{

    }
  },[JSON.stringify(rows)])

  const [searched, setSearched] = useState("");

  const classes = useStyles();

  const requestSearch = (searchedVal:any) => {
    const filteredRows = props.users.filter((row:any) => {
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
                          elemento !=='imagen'
                            &&
                          elemento !=='password'
                            &&
                          elemento !=='createdAt'
                            &&
                          elemento !=='updatedAt'
                            &&
                          elemento !=='id_rol'
                            &&
                          elemento !=='cedula'
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
              Object.values(rows).map((valor:TableUsers, index)=>{
                return (
                  <TableRow key={index} >
                     <TableCell component="th" scope="row">
                       {valor.id}
                     </TableCell>
                     <TableCell align="right">{valor.primer_nombre}</TableCell>
                     <TableCell align="right">{valor.segundo_nombre}</TableCell>
                     <TableCell align="right">{valor.apellido_paterno}</TableCell>
                     <TableCell align="right">{valor.apellido_materno}</TableCell>
                     <TableCell align="right">{valor.cedula_identidad}</TableCell>
                     <TableCell align="right">{valor.telefono}</TableCell>
                     <TableCell align="right">{valor.estado ? 'activo' : 'inactivo'}</TableCell>
                     <TableCell align="right">{valor.username}</TableCell>
                     <TableCell align="right">{valor.email}</TableCell>
                     <TableCell align="right">{valor.role.nombreRol}</TableCell>
                     
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
                                email: valor.email, 
                                estado : valor.estado, 
                                roles : valor.role, 
                                username : valor.username
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
                              nombre : valor.primer_nombre, 
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
  const { users } = state;
  //AUTOMATIZACION DE ROWS DE TABLAS

    //ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //CREAMOS UNA VARIABLE GLOBAL PARA EL POSTERIOR ALMACENAMIENTO DE CLAVES
    let keys = {};
      //LE DAMOS BREAK PARA QUE SOLO OBTENGA LOS NOMBRES DE LAS COLUMNAS DE LA PRIMERA FILA
      for(const user in users){
        keys = Object.keys(users[user]);
        break;
      }
    //FIN ACCEDER A LOS NOMBRES DE LAS COLUMNAS
    //OBTENEMOS LOS NOMBRES DE LAS COLUMNAS YA QUE ESTA GUARDADO EN UN ARRAY
      const userKeys = Object.values(keys);
  //FIN AUTOMATIZACION DE ROWS DE TABLAS
  return {
    users : Object.values(users),
    keys : userKeys
  }
}

export default connect(
  mapStateToProps,
  {fetchUsers}
)(ReadUsersList);
