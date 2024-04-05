
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
import { Box } from '@mui/material';

import Main from './routes/main';
import Join from './routes/Join';
import Login from './routes/Login';
import Product from './routes/product';
import Cart from './routes/Cart';
import Order from './routes/Order';
import ProductForm from './routes/ProductForm';
import ProductFormModal from './routes/ProductFormModal';
import ProductV2 from './routes/ProdictV2';
import OrderInfo from './routes/OrderInfo';

import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate, BrowserRouter} from 'react-router-dom'
import Logout from './modules/logout';
import { setUser } from './modules/store';
import { jwtDecode } from 'jwt-decode';

function App() {

  let user = useSelector((state)=>{
    return state;
  })
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  let accessToken = localStorage.getItem('access');
  useEffect(()=>{
    const checkTokenValidity = async () => {
      if (accessToken) {
        try {
          await axios.get('http://localhost:8080/api/token/validate', {
            headers: {
              'access': accessToken
            }
          });

          // 응답이 성공적이라면, 토큰이 유효합니다. 사용자 상태를 업데이트합니다.
          let {username, nickname, role} = jwtDecode(accessToken);
          let userData = {username: username, nickname: nickname, role: role};
          dispatch(setUser(userData));
        } catch (error) {
          // 토큰이 유효하지 않거나 요청에 실패했습니다.
          // 로컬 스토리지에서 토큰을 제거하고 사용자 상태를 초기화합니다.
          localStorage.removeItem('access');
          dispatch(setUser({username: '', nickname: '', role: ''}));

          //다시 토큰을 발급하는 로직
        }
      }
    };

    checkTokenValidity();
  },[navigate,dispatch])

  return (
    <div>

      <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
                <IconButton size="large"edge="start"color="inherit"aria-label="menu"sx={{ mr: 2 }} disabled >
                  
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: '#000000' }} onClick={()=>{
                  navigate('/');
                }}>
                  Shop
                </Typography>

                {
                  user.user.username ?
                  <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{

                    setIsModalOpen(true)
                    console.log(isModalOpen);
                    
                  }}> 상품등록 </Button> 
                  : null
                }
                {
                  user.user.username ? 
                  <Button color="inherit" style={{ color: '#000000' }} onClick={()=>{
                    navigate('/order')
                  }}> 주문목록 </Button>
                  : null
                }

                {
                  user.user.username ? 
                  <Button color="inherit" style={{ color: '#000000', marginRight:'50px' }} onClick={()=>{
                    navigate('/cart')
                  }}> 장바구니 </Button>
                  : null
                }

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
                    navigate('/');
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
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<Order/>}/>
          <Route path='/ProductForm' element={<ProductForm/>} />
          <Route path='/OrderInfo' element={<OrderInfo/>} />
          
          <Route path='/ProductV2' element={<ProductV2/>} />
        </Routes>
      

      <ProductFormModal isOpen={isModalOpen} onClose={()=>{
        setIsModalOpen(false);
      }} />
      

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 6,
        }}
        component="footer"
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center" style={{marginRight:'70px'}}>
            {"Copyright © "}
            <a href="http://www.mndsystem.com/" style={{ color: 'inherit', textDecoration: 'none' }}>
              MnDSystem
            </a>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </Box>
    </div>
    
  );
}

export default App;
