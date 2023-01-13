import Index from './HistoriasClinicas/Index'
import { Outlet } from 'react-router-dom'
const historiasClinicas = () => {
    return (
        <>
        <h1>Historias Clínicas</h1>
            <Index/>
            
            <Outlet/>
        </>
    )
}

export default historiasClinicas
