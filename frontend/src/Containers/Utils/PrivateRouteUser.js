import {Outlet,Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRouteUser = ()=>{
    const user=useSelector(state=>state.auth)
    return(
        user? <Outlet/>:<Navigate to ='/login'/>
    )
}

export default PrivateRouteUser