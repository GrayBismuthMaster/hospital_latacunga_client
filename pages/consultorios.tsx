import Index from './Consultorios/Index'
import { Outlet } from 'react-router-dom'
const consultorios = () => {
    return (
        <>
        <h1>Consultorios</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default consultorios
