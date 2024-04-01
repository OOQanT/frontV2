import { Button, Container, TextField } from '@mui/material';
import React from 'react';

function Join(){
    return(
        <div>
            
            <Container fixed style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'30px'}}>
            <h4>회원가입</h4>
            <div style={{ marginBottom: '10px' }}>
                <TextField label="아이디 입력" style={{ width: '315px' }} />
                <Button variant="contained" style={{height:'54px'}}>중복확인</Button>
            </div>
            <div style={{ marginBottom: '10px' }}>
            <TextField type='text' label='닉네임' style={{ width: '315px' }}/> 
            <Button variant="contained" style={{height:'54px'}}>중복확인</Button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField type='email' label='이메일' style={{ width: '400px' }}/> 
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField type='password' label="비밀번호 입력" style={{ width: '400px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <TextField type='password' label="비밀번호 재입력" style={{ width: '400px' }} />
            </div>
            <div>
                <Button variant="contained" style={{width:'400px'}}>가입하기</Button>
            </div>
            </Container>
        </div>
    )
}

export default Join;