import './App.css'
//Index pages
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landpage from '../pages/landpage';
import Login from "../pages/login";
import Home from "../pages/home";
//INCIO USERS
import Users from "../pages/users";
import CreateUser from "../pages/Users/CreateUser"
import EditUser from "../pages/Users/EditUser"
import DeleteUser from "../pages/Users/DeleteUser"
//FIN USERS
//INICIO PROFESIONALES
import Profesionales from '../pages/profesionales'
import CreateProfesional from "../pages/Profesionales/CreateProfesional"
import EditProfesional from "../pages/Profesionales/EditProfesional"
import DeleteProfesional from "../pages/Profesionales/DeleteProfesional"
//FIN PROFESIONALES
//INICIO CONSULTORIOS
import Consultorios from '../pages/consultorios'
import CreateConsultorio from "../pages/Consultorios/CreateConsultorio"
import EditConsultorio from "../pages/Consultorios/EditConsultorio"
import DeleteConsultorio from "../pages/Consultorios/DeleteConsultorio"
//FIN CONSULTORIOS
//INICIO ESPECIALIDADES
import Especialidades from '../pages/especialidades'
import CreateEspecialidad from "../pages/Especialidades/CreateEspecialidad"
import EditEspecialidad from "../pages/Especialidades/EditEspecialidad"
import DeleteEspecialidad from "../pages/Especialidades/DeleteEspecialidad"
//FIN ESPECIALIDADES
import Profile from '../pages/Profile/Profile'
//INICIO RESERVAS DE CITAS
import ReservasCitas from '../pages/reservasCitas'
import CreateReservaCita from "../pages/ReservasCitas/CreateReservaCitas"
// import EditEspecialidad from "../pages/Especialidades/EditEspecialidad"
// import DeleteEspecialidad from "../pages/Especialidades/DeleteEspecialidad"
//FIN RESERVAS DE CITAS

  //INICIO DOCUMENTOS
    //INICIO HISTORIAS CLINICAS
      import HistoriasClinicas from '../pages/historiasClinicas'
      import CreateHistoriaClinica from "../pages/HistoriasClinicas/CreateHistoriaClinica"
      import EditHistoriaClinica from "../pages/HistoriasClinicas/EditHistoriaClinica"
      import DeleteHistoriaClinica from "../pages/HistoriasClinicas/DeleteHistoriaClinica"
      import ReporteHistoriaClinica from '../pages/HistoriasClinicas/reportes/ReporteHistoriaClinicaById'
    //FIN HISTORIAS CLINICAS
    
      //INICIO EVOLUCIONES PRESCRIPCIONES
        import EvolucionesPrescripciones from '../pages/evolucionesPrescripciones'
        import CreateEvolucionPrescripcion from "../pages/EvolucionesPrescripciones/CreateEvolucionPrescripcion"
        import EditEvolucionPrescripcion from "../pages/EvolucionesPrescripciones/EditEvolucionPrescripcion"
        import DeleteEvolucionPrescripcion from "../pages/EvolucionesPrescripciones/DeleteEvolucionPrescripcion"
        import ReporteEvolucionPrescripcion from '../pages/EvolucionesPrescripciones/reportes/ReporteEvolucionPrescripcionById'
      //FIN EVOLUCIONES PRESCRIPCIONES
        //INICIO DETALLE EVOLUCIONES PRESCRIPCIONES
          import DetallesEvolucionesPrescripciones from '../pages/detallesEvolucionesPrescripciones'
          import CreateDetalleEvolucionPrescripcion from "../pages/EvolucionesPrescripciones/DetallesEvolucionesPrescripciones/CreateDetalleEvolucionPrescripcion"
          import EditDetalleEvolucionPrescripcion from "../pages/EvolucionesPrescripciones/DetallesEvolucionesPrescripciones/EditDetalleEvolucionPrescripcion"
          import DeleteDetalleEvolucionPrescripcion from "../pages/EvolucionesPrescripciones/DetallesEvolucionesPrescripciones/DeleteDetalleEvolucionPrescripcion"
        //FIN DETALLE EVOLUCIONES PRESCRIPCIONES
  //FIN DOCUMENTOS
  
import ProtectedRoutes from './ProtectedRoutes'
import ReadEspecialidadesList from '../pages/Especialidades/ReadEspecialidadesList';
function App() {
  return (
    <>
      <Router> 
              {/* PUBLIC ROUTES */}
        <Routes>
          
          <Route path="/" element={<Landpage />}/>
          <Route path="/login" element={<Login />}/>
          
              {/* PRIVATE ROUTES */}
          <Route element={<ProtectedRoutes/>}>  
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                {/* SECCION DE USUARIOS  */}
                <Route path="/users/*" element={<Users/>}>
                  <Route path="new" element={<CreateUser/>}/>
                  <Route path='edit' element={<EditUser/>}/>
                  <Route path="delete" element={<DeleteUser/>}/>
                </Route>
                {/* FIN SECCION DE USUARIOS  */}
                {/* SECCION DE CONSULTORIOS  */}
                <Route path="/consultorios/*" element={<Consultorios/>}>
                  <Route path="new" element={<CreateConsultorio/>}/>
                  <Route path='edit' element={<EditConsultorio/>}/>
                  <Route path="delete" element={<DeleteConsultorio/>}/>
                </Route>
                {/* FIN SECCION DE CONSULTORIOS  */}
                {/* SECCION DE ESPECIALIDADES  */}
                <Route path="/especialidades/*" element={<Especialidades/>}>
                  <Route path="show/*" element={<ReadEspecialidadesList/>}>
                    <Route path="new" element={<CreateEspecialidad/>}/>
                    <Route path='edit' element={<EditEspecialidad/>}/>
                    <Route path="delete" element={<DeleteEspecialidad/>}/>
                  </Route>
                </Route>
                {/* FIN SECCION DE ESPECIALIDADES */}
                {/* SECCION DE PROFESIONALES  */}
                <Route path="/profesionales/*" element={<Profesionales/>}>
                  <Route path="new" element={<CreateProfesional/>}/>
                  <Route path='edit' element={<EditProfesional/>}/>
                  <Route path="delete" element={<DeleteProfesional/>}/>
                </Route>
                {/* FIN SECCION DE PROFESIONALES  */}
                {/* SECCION DE HISTORIAS CLINICAS  */}
                <Route path="/historias-clinicas/*" element={<HistoriasClinicas/>}>
                  <Route path="new" element={<CreateHistoriaClinica/>}/>
                  <Route path='edit' element={<EditHistoriaClinica/>}/>
                  <Route path="delete" element={<DeleteHistoriaClinica/>}/>
                  <Route path="reporte" element={<ReporteHistoriaClinica/>}/>
                </Route>
                {/* FIN SECCION DE HISTORIAS CLINICAS  */}
                
                {/* SECCION DE EVOLUCIONES PRESCRIPCIONES  */}
                <Route path="/evoluciones-prescripciones/*" element={<EvolucionesPrescripciones/>}>
                  <Route path="new" element={<CreateEvolucionPrescripcion/>}/>
                  <Route path='edit' element={<EditEvolucionPrescripcion/>}/>
                  <Route path="delete" element={<DeleteEvolucionPrescripcion/>}/>
                  <Route path="reporte" element={<ReporteEvolucionPrescripcion/>}/>
                  
                    <Route path="details/*" element={<DetallesEvolucionesPrescripciones/>}>
                      <Route path="new" element={<CreateDetalleEvolucionPrescripcion/>}/>
                      <Route path='edit' element={<EditDetalleEvolucionPrescripcion/>}/>
                      <Route path="delete" element={<DeleteDetalleEvolucionPrescripcion/>}/>
                    </Route>
                </Route>
                {/* FIN SECCION DE PROFESIONALES  */}
                
                {/* SECCION DE RESERVAS DE CITAS  */}
                <Route path="/reservas-citas/*" element={<ReservasCitas/>}>
                  <Route path="new" element={<CreateReservaCita/>}/>
                  {/* <Route path='edit' element={<EditReservaCita/>}/> */}
                  {/* <Route path="delete" element={<DeleteReservaCita/>}/> */}
                </Route>
                {/* FIN SECCION DE RESERVAS DE CITAS */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
