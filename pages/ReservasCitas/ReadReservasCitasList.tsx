import React, { useState } from 'react';
import {connect} from 'react-redux';
import {reservasCitas} from '../../redux/actions';
import { useNavigate, useLocation } from 'react-router-dom'
//CALENDAR
import {Calendar, momentLocalizer} from "react-big-calendar"
import moment from 'moment'
import "moment/locale/es.js"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from 'react';
import swal from 'sweetalert';
import { EstadoReserva, ReservaCita, Roles } from '../../interfaces';

//MATERIAL TABLE WITH PATCH
// import MaterialTable, {MaterialTableProps} from 'material-table';
// import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import UndoIcon from '@mui/icons-material/Undo';
// import RedoIcon from '@mui/icons-material/Redo';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {  /*green,*/ yellow, red } from '@mui/material/colors';

//import UserHeader from '../Users/UserHeader';
//GUardo en variable para que no me de error de función al dar el dispatch al reducer
const fetchReservasCitas = reservasCitas.fetchReservasCitas;
const fetchReservasCitasByUserId = reservasCitas.fetchReservasCitasByUserId;
const editReservaCita = reservasCitas.editReservaCita;

const ReservasCitasList =(props : any) =>{
    
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({
        reservasCitasState : [],
        reservaCita : {},
        prevLocation : {},
        eventsFilter : [],
        localizer : momentLocalizer(moment),
    })


    useEffect(() => {
        console.log('props obtenidos', props);
        if(props.rol==='admin'){
            asyncFetchReservasCitas();
        }else{
            console.log('fetch user')
            props.fetchReservasCitasByUserId(props.userId);
            console.log(props.reservasCitas)
        }
        
       return () => {
        console.log('limpiado')
       }

    }, [])

    const asyncFetchReservasCitas = async () => {
        await props.fetchReservasCitas();
    }
    
    // console.log('location desde reservas de citas para el pathname y volver')
    // console.log(location.state)
    // useState({...state, prevLocation : location.state})
    
    const handleSelect = ({ start, end }:any) => {
        console.log('desde handle select')
        console.log(start, end) 
       navigate('new',{
        state : {fecha_hora_inicio_reserva : new Date(start), fecha_hora_fin_reserva : new Date(end), pathname :state.prevLocation}
       })
    }
    
    const eventsFilter =  props.reservasCitas.map((reservaCita:ReservaCita) => {
        return {
            title: reservaCita.motivo_reserva,
            start: moment(reservaCita.fecha_hora_inicio_reserva).toDate(),
            end: moment(reservaCita.fecha_hora_fin_reserva).toDate(),
            estado : reservaCita.estado_reserva,
            id_reserva : reservaCita.id
        }
    })
   
    if(state.reservasCitasState.length >= 0){
        if(props.rol === 'admin'){
            const reservaCitasFiltrado = eventsFilter.filter((reservaCita : any) => reservaCita.estado === "ACEPTADO" || reservaCita.estado === "PENDIENTE");
            console.log('reserva Citas filtrado')
            console.log(reservaCitasFiltrado)
            return (

                    <Calendar
                        selectable
                        events={reservaCitasFiltrado}
                        localizer={state.localizer}
                        startAccessor="start"
                        endAccessor="end"
                        style = {{
                            height: '100vh',
                            width: '100%',
                        }}
                        messages={{
                            next: ">",
                            previous: "<",
                            today: "Hoy",
                            month: "Mes",
                            week: "Semana",
                            day: "Día",
                        }}
                        defaultDate={moment().toDate()}
                        onSelectEvent={(event:any) => {
                            console.log('enveer')
                            console.log(event);
                            if(event.estado !== 'ACEPTADO'){
                                (swal as any)({
                                    text: '¿Desea aceptar la reserva?',
                                    buttons: {
                                        cancel: "NO",
                                        defeat: "SI",
                                    },
                                  })
                                  .then((value:any) => {
                                    switch (value) {
                                   
                                      case "defeat":
                                        console.log('valor evento aceptasdo',event);
                                        props.editReservaCita(event.id_reserva,{
                                            estado_reserva : EstadoReserva.COMPLETADO
                                        });
                                        break;
                                   
                                      default:
                                        console.log('valor evento aceptasdo',event);
                                        props.editReservaCita(event.id_reserva,{
                                            estado_reserva : EstadoReserva.CANCELADO
                                        });
                                        break;
                                    }
                                  });
                            }else{
                                (swal as any)({
                                    text: '¿Está seguro que desea cancelar la reserva?',
                                    buttons: {
                                        cancel: "NO",
                                        defeat: "SI",
                                    },
                                  })
                                  .then((value:any) => {
                                    switch (value) {
                                   
                                      case "defeat":
                                        console.log('valor evento aceptasdo',event);
                                        props.editReservaCita(event.id_reserva,{
                                            estado_reserva : EstadoReserva.CANCELADO
                                        });
                                        break;
                                   
                                      default:
                                          swal('OK')
                                        break;
                                    }
                                  });
                            }

                        }}
                        onSelectSlot={handleSelect}
                        eventPropGetter ={
                            (event, start, end, isSelected) => {
                              let newStyle = {
                                color: 'black',
                                borderRadius: "10px",
                                boxShadow : "5px 5px 5px rgba(0,0,0,0.3)",
                                fontSize : '14px',
                                padding : '7px',
                                width: '80%',
                                height:'90%',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems : 'center',
                                margin: 'auto',
                                backgroundImage : 'linear-gradient(to right, #f6d365, #fda085)',
                              };
                        
                              
                            if (event.estado === "ACEPTADO"){
                                newStyle.backgroundImage = "linear-gradient(to left, #88bd95, #138934b9)";
                                newStyle.color = "white"
                            } else if(event.estado === "PENDIENTE"){
                                newStyle.backgroundImage = `linear-gradient(to left, #ddec7d, #adc222)`;
                                newStyle.color = "white"
                            }
    
                        
                              return {
                                className: "",
                                style: newStyle
                              };
                            }
                            // (event, start, end, isSelected) => {editarAtributosEventos(event, start, end, isSelected)}
                        }
                    />
            )
        }else if(props.rol === 'user'){
            console.log('props desde rol user', props)
            const reservaCitasFiltrado = eventsFilter.filter((reservaCita:any) => reservaCita.estado === "ACEPTADO" || reservaCita.estado === "PENDIENTE");
            console.log('reserva Citas filtrado')
            console.log(reservaCitasFiltrado)
            return(
                <Calendar
                    selectable
                    events={reservaCitasFiltrado}
                    localizer={state.localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style = {{
                        height: '100vh',
                        width: '100%',
                    }}
                    messages={{
                        next: ">",
                        previous: "<",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                    }}
                    defaultDate={moment().toDate()}
                    
                    onSelectSlot={handleSelect}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                          let newStyle = {
                            backgroundColor: "lightgrey",
                            color: 'black',
                            borderRadius: "10px",
                            boxShadow : "5px 5px 5px rgba(0,0,0,0.3)",
                            fontSize : '14px',
                            padding : '7px',
                            width: '80%',
                            height:'90%',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems : 'center',
                            margin: 'auto',
                          };
                    
                          
                        if (event.estado === "ACEPTADO"){
                            newStyle.backgroundColor = "#138934b9";
                            newStyle.color = "white"
                        } else if(event.estado === "PENDIENTE"){
                            newStyle.backgroundColor = "#ffc107b9";
                            newStyle.color = "white"
                        }

                    
                          return {
                            className: "",
                            style: newStyle
                          };
                        }
                        // (event, start, end, isSelected) => {editarAtributosEventos(event, start, end, isSelected)}
                    }
                    onView={() => {
                        console.log('onView')
                    }}
                />
            )
        }else{
            return(
                <div>
                    Vargando
                </div>
            )
        }
    }else{
        return(
            
            <>
                <div>
                    Cargando
                </div> 
            </>
        )
    }
}  
    

const mapStateToProps = (state:any) => {
    console.log('estado desde read reservas citas')
    console.log(state);
    if(state.auth.userData){
        return {
            rol : state.auth.userData.datosUsuario.role.nombreRol,
            reservasCitas : Object.values(state.reservasCitas),
            userId : state.auth.userData.datosUsuario.id
        }
    }    
}

//El null es el estado actual del componente y el segundo parametro es la action que se pasa por parametro
export default connect(
    mapStateToProps, 
    {fetchReservasCitas, fetchReservasCitasByUserId, editReservaCita}
    )( ReservasCitasList);
    