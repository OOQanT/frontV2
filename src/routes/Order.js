import { Container } from '@mui/material';
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
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import axios from 'axios';

function Order(){

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3), 
      ];

    let [data,setData] = useState([]);
    let [date,setDate] = useState([]);

    function formatDate(dateArray) {
        // 배열에서 각 요소를 추출하여 Date 객체를 생성합니다.
        // 월은 0부터 시작하므로 1을 빼줍니다.
        const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
      
        // 생성된 Date 객체를 사용하여 날짜를 포맷팅합니다.
        return format(date, "yyyy-MM-dd HH:mm");
      }

    async function getOrders(){
        await axios.get('http://localhost:8080/order/order_list',{
            headers:{
                'access' : localStorage.getItem('access'),
                'Content-Type' : 'application/json'
            }
        })
        .then((action)=>{
            let response = action.data;
            setData(response.orderList);
            
            const formattedDates = response.orderList.map(data => formatDate(data.orderTime));
            setDate(formattedDates);
        })
        .catch((error)=>{
            console.log(error);
            console.log(error.status)
        })
    }

    useEffect(()=>{
        getOrders();
    },[])

    return(
        <div>
            <Container fixed>
                <h3 style={{marginTop:'40px'}}>주문목록</h3>
                <hr style={{ borderWidth: '3px', borderColor: 'black' }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            {/* <TableCell align="center">Image</TableCell> */}
                            <TableCell align="center">order Id</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                            <TableCell align="center">Order Date</TableCell>
                            <TableCell align="center">Delivery</TableCell>
                            <TableCell align="center">Payment</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((data,index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            
                            {/* <TableCell align="center"><img src='img/default_item_image.png'/></TableCell> */}
                            <TableCell align="center">{data.orderId}</TableCell>
                            <TableCell align="center">{data.totalPrice}</TableCell>
                            <TableCell align="center">{date[index]}</TableCell>
                            <TableCell align="center">{data.delivery}</TableCell>
                            <TableCell align="center">{data.payment}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default Order;