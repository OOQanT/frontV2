import { Button, Container, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import React, { useState } from 'react';
import { setUser } from '../modules/store';

function Login(){

    let user = useSelector((state)=>{
        return state;
    })
    let dispatch = useDispatch();

    let [username,setUsername] = useState('');
    let [password,setPassword] = useState('');

    let [isUsername,setIsUsername] = useState(false);
    let [isPassword,setIsPassword] = useState(false);

    let [message,setMessage] = useState('');
    let [content,setContent] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                    {message}
                    </DialogTitle>
                    <DialogContent>{content}</DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>확인</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            <Container fixed style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'30px'}}>
                <div style={{ marginBottom: '10px' }}>Login</div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField label="username" style={{ width: '400px' }} onChange={(e)=>{
                        setIsUsername(false);
                        setUsername(e.target.value);
                    }}/>
                </div>
                <div>
                    <TextField type='password' label="password" style={{ width: '400px' }} onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                </div>
                <div style={{marginTop:'15px'}}>
                    <Button variant="contained" style={{width:'400px'}} onClick={()=>{
                        if(username === null || username === ''){
                            setIsUsername(true);
                        }
                        else if( username === false && password === null || password === ''){
                            setIsPassword(true);
                        }else{
                            loginPost();
                        }
                    }}>Login</Button>
                </div>
                <div style={{color:'red'}}>
                    {isUsername ? <p>아아디를 입력해주세요</p> : null}
                    {isPassword ? <p>비밀번호를 입력해주세요</p> : null}
                </div>
                
            </Container>
        </div>
    )

    function loginPost(){
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        axios.post('http://localhost:8080/login',formData)
        .then((response)=>{
            console.log(response);
            const accessToken = response.headers['access'];
        
            window.localStorage.setItem('access',accessToken);
        })
        .then(()=>{
            let token = localStorage.getItem('access');
            const decodedToken = jwtDecode(token);
            let {username , nickname, role} = decodedToken;
            let userData = {username : username, nickname : nickname , role : role};
            
            console.log(userData);

            dispatch(setUser(userData));
            console.log(user.user);

            //window.location.replace("/");
        })
        .catch((e)=>{
            console.log(e.message);
            setMessage('입력하신 내용을 다시 확인해주세요.')
            setContent('아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.')
            handleClickOpen();
        })
    }
}

export default Login;