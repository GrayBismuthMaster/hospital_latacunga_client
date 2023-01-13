import Index from './Especialidades/Index'
import { Outlet } from 'react-router-dom'
const especialidades = () => {
    return (
        <>
        <h1>Especialidades</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default especialidades
