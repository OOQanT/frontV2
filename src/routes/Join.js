import { Button, Container, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Join(){
    const navigate = useNavigate();

    let [username,setUsername] = useState('');
    let [nickname,setNickname] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [repassword,setRepassword] = useState('');

    let [message,setMessage] = useState('');
    let [content,setContent] = useState('');

    let [nameChecker,setNameChecker] = useState(false);
    let [nickChecker,setNickChecker] = useState(false);

    const [open, setOpen] = React.useState(false);

    let [isUsername,setIsUsername] = useState(true);
    let [isNickname,setIsNickname] = useState(true);
    let [isEmail,setIsEmail] = useState(true);
    let [isPassword,setIsPassword] = useState(true);
    let [isRepassword,setIsRepassword] = useState(true);


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
            <h4>회원가입</h4>
            <div style={{ marginBottom: '15px' }}>
                <TextField label="아이디 입력" style={{ width: '315px' }} onChange={(e)=>{
                    setUsername(e.target.value);
                    setIsUsername(true);
                }}/>
                <Button variant="contained" style={{height:'54px'}} onClick={()=>{
                    if(username === null || username === ''){
                        setIsUsername(false);
                    }else{
                        usernameCheck(username);
                    }
                }}>중복확인</Button>
                {isUsername ? null : <p style={{color:'red'}}>아이디를 입력해주세요.</p>}
                
            </div>
            <div style={{ marginBottom: '15px' }}>
            <TextField type='text' label='닉네임' style={{ width: '315px' }} onChange={(e)=>{
                setIsNickname(true);
                setNickname(e.target.value);
            }}/> 
            <Button variant="contained" style={{height:'54px'}} onClick={()=>{
                if(nickname === null || nickname === ''){
                    setIsNickname(false);
                }else{
                    nicknameCheck(nickname);
                }
            }}>중복확인</Button>
            {isNickname ? null : <p style={{color:'red'}}>닉네임을 입력해주세요.</p>}
            </div>
            <div style={{ marginBottom: '15px' }}>
                <TextField type='email' label='이메일' style={{ width: '400px' }} onChange={(e)=>{
                    setIsEmail(true);
                    setEmail(e.target.value);
                }}/> 
                {isEmail ? null : <p style={{color:'red'}}>이메일을 입력해주세요.</p>}
            </div>
            <div style={{ marginBottom: '15px' }}>
                <TextField type='password' label="비밀번호 입력" style={{ width: '400px' }} onChange={(e)=>{
                    setIsPassword(true);
                    setPassword(e.target.value);
                }}/>
                {isPassword ? null : <p style={{color:'red'}}>비밀번호를 입력해주세요.</p>}
            </div>
            <div style={{ marginBottom: '15px' }}>
                <TextField type='password' label="비밀번호 재입력" style={{ width: '400px' }} onChange={(e)=>{
                    setIsRepassword(true);
                    setRepassword(e.target.value);
                }}/>
                {isRepassword ? null : <p style={{color:'red'}}>비밀번호를 다시 입력해주세요.</p>}
            </div>
            <div>
                <Button variant="contained" style={{width:'400px'}} onClick={()=>{
                    if(username === '') setIsUsername(false)
                    if(nickname === '') setIsNickname(false);
                    if(email === '') setIsEmail(false);
                    if(password === '') setIsPassword(false);
                    if(repassword === '') setIsRepassword(false);

                    else if(nameChecker === false){
                        setMessage('아이디 중복확인을 해주세요.')
                        setContent('')
                        handleClickOpen();
                    }
                    else if(nickChecker === false){
                        setMessage('닉네임 중복확인을 해주세요')
                        setContent('')
                        handleClickOpen();
                    }
                    else if(password !== repassword){
                        setMessage('재입력한 비밀번호가 일치하지 않습니다.')
                        setContent('비밀번호를 다시 확인해주세요.')
                        handleClickOpen();
                    }
                    else{
                        joinPost();
                    }
                }}>가입하기</Button>
            </div>
            </Container>
        </div>
    )

    function usernameCheck(username){
        axios.get('http://localhost:8080/join/nameChecker',{params :{username : username}})
        .then((result)=>{
            setMessage('사용가능한 아아디 입니다.')
            setContent('')
            setNameChecker(true);
            handleClickOpen();
        })
        .catch((error)=>{
            setMessage('이미 사용중인 아이디 입니다.')
            setContent('')
            handleClickOpen();
        });
    }

    function nicknameCheck(nickname){
        axios.get('http://localhost:8080/join/nicknameChecker',{params : {nickname : nickname}})
        .then((result)=>{
            setMessage('사용가능한 닉네임 입니다.');
            setContent('');
            setNickChecker(true);
            handleClickOpen();
        })
        .catch((error)=>{
            setMessage('이미 사용중인 닉네임 입니다.')
            setContent('')
            handleClickOpen();
        })
    }

    function joinPost(){
        axios.post('http://localhost:8080/joinProc',{
            username: username,
            password: password,
            rePassword: repassword,
            nickname: nickname,
            email: email
        })
        .then(()=>{
            setMessage('가입되었습니다.')
            setContent('')
            handleClickOpen();
            navigate('/');
        })
    }
    
}

export default Join;