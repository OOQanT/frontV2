
import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import { ButtonGroup } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';

import Main from './routes/main';
import Join from './routes/Join';
import Login from './routes/Login';
import Product from './routes/product';
import Cart from './routes/Cart';
import Order from './routes/Order';

import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Logout from './modules/logout';
import { setUser } from './modules/store';
import { jwtDecode } from 'jwt-decode';

function App() {

  let user = useSelector((state)=>{
    return state;
  })
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const accessToken = localStorage.getItem('access');
  useEffect(()=>{
    if(accessToken){
      let {username, nickname, role} = jwtDecode(accessToken);
      let userData = {username : username, nickname:nickname, role:role};
      dispatch(setUser(userData));
    }
  },[dispatch])

  return (
    <div>

      <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
         <IconButton size="large"edge="start"color="inherit"aria-label="menu"sx={{ mr: 2 }}  >
         
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: '#000000' }}>
                  Shop
                </Typography>
                {
                  user.user.username ? <Button color="inherit" style={{ color: '#000000' }} disabled>Hello {user.user.nickname}</Button>   :
                  <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{
                    navigate('/login')
                  }}>Login</Button>   
                }

                {
                  user.user.username ? <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{
                    Logout();
                    dispatch(setUser({username: '', nickanme: '', role: ''}))
                  }}>logout</Button>  :
                  <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{
                    navigate('/join')
                  }}>Join</Button> 
                }
                
                
        </Toolbar> 
      </AppBar>

      
      <Routes>
        <Route path='/' element={<Main></Main>}/>
        <Route path='/join' element={<Join></Join>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<Order/>}/>
      </Routes>
      
    </div>
    
  );
}

export default App;
