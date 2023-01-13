import Index from './Profesionales/Index'
import { Outlet } from 'react-router-dom'
const profesionales = () => {
    return (
        <>
        <h1>Profesionales</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default profesionales
