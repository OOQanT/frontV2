import { Button, Container, TextField } from '@mui/material';
import React from 'react';

function Login(){
    return(
        <div>
            
            <Container fixed style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'30px'}}>
                <div style={{ marginBottom: '10px' }}>
                    Login
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField label="username" style={{ width: '400px' }} />
                </div>
                <div>
                    <TextField type='password' label="password" style={{ width: '400px' }} />
                </div>
                <div style={{marginTop:'15px'}}>
                    <Button variant="contained" style={{width:'400px'}}>Login</Button>
                </div>
            </Container>
        </div>
    )
}

export default Login;