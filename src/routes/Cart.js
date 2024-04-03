
import { Button, Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

function Cart(){
    
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3), 
      ];

    return (
        <div>
            <Container fixed>
                <h3 style={{marginTop:'40px'}}>장바구니</h3>
                <br/>
                <br/>

                <hr style={{ borderWidth: '3px', borderColor: 'black' }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Profuct Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">X</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            
                            <TableCell align="center"><img src='img/default_item_image.png'  /></TableCell>
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                            <TableCell align="center">
                                <IconButton sx={{ color: 'red' }}>
                                    <CloseIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <hr style={{ borderWidth: '3px', borderColor: 'black' }} />
                
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div style={{marginTop:'15px'}}>총금액 : </div>
                    </Grid>
                    <Grid item xs={6} style={{textAlign:'right'}}>
                        <Button variant="contained" style={{marginTop:'15px', backgroundColor:'black'}}>주문하기</Button>
                    </Grid>
                </Grid>

                

            </Container>
        </div>
    )
}

export default Cart;