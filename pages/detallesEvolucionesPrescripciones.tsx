import Index from './EvolucionesPrescripciones/DetallesEvolucionesPrescripciones/Index'
import { Outlet } from 'react-router-dom'
const detallesEvolucionesPrescripciones = () => {
    return (
        <>
        <h1>Detalle Evoluciones y prescripciones</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default detallesEvolucionesPrescripciones
