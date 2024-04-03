import axios from 'axios';
import { setUser } from './store';
import { useDispatch } from 'react-redux';

function Logout(){
    axios.post('http://localhost:8080/logout',{},{
        withCredentials:true,
        credentials: 'include'
    })
    .then(()=>{
        localStorage.removeItem('access');
    })
    .catch((error)=>{
        console.log(error.message);
    })
}

export default Logout;