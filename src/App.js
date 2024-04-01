
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

import { useState } from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'



function Header(){
  return(
    <header>
      <h1>Welcome</h1>
    </header>
  )
}

function Nav(){
  return(
    <nav>
      <ol>
        <li>html</li>
        <li>css</li>
      </ol>
    </nav>
  )
}

function Article(){
  let [open,setOpen] = useState(false);
  return(
    <article>
      <h2>Welcome</h2>
      Hello web!
      <br/>
      <br/>

      <ButtonGroup>
        <Button variant="contained" onClick={()=>{
          setOpen(true)
        }}>Create</Button>
        <Button variant="contained">Update</Button>
        <Button variant="contained">Delete</Button>
      </ButtonGroup>

      <Dialog open={open}>
        <DialogTitle>create</DialogTitle>
        <DialogContentText>
          Hello Create
        </DialogContentText>
        <DialogActions>
          <Button variant="contained">Create</Button>
          <Button variant="contained" onClick={()=>{
            setOpen(false);
          }}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </article>
  )
}

function App() {

  let navigate = useNavigate();

  return (
    <div>

      <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
         <IconButton size="large"edge="start"color="inherit"aria-label="menu"sx={{ mr: 2 }}  >
         
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: '#000000' }}>
                  Shop
                </Typography>
                <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{
                  navigate('/login')
                }}>Login</Button>     
                <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{
                  navigate('/join')
                }}>Join</Button> 
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
