import Index from './ReservasCitas/Index'
import { Outlet } from 'react-router-dom'
const reservasCitas = () => {
    return (
        <>
        <h1>Reserva de citas</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default reservasCitas
