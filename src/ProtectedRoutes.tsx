import React from 'react'
import { Outlet } from 'react-router-dom';
//Layout 
import Navbar from "../components/Layout/Navbar/Navbar";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
//Getting redux data
import {connect} from 'react-redux' 

const ProtectedRoutes = (props:any) => {
    const [auth, setAuth] = React.useState(false);
    React.useEffect(() => {
                setAuth(props.isSignedIn);
    }, []);
    
    if(auth ){
        return(
            <>
            
                <Navbar/>
                <div className="container">
                <Sidebar/>
                    <div className="others"> 
                            <Outlet/>
                            
                    </div>
                </div>
            </>
        )
    }else{
        return(
                <div>
                   NO PERMITIDO
                </div>
            
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        isSignedIn : state.auth.isSignedIn
    }
}

export default connect(
    mapStateToProps
)(ProtectedRoutes);