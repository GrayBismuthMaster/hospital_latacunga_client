import Index from './EvolucionesPrescripciones/Index'
import { Outlet } from 'react-router-dom'
const evolucionesPrescripciones = () => {
    return (
        <>
        <h1>Evoluciones y prescripciones</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default evolucionesPrescripciones
