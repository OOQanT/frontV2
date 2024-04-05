
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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React, { useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

function Cart(){
    
      const navigate = useNavigate();
      const handleButtonClick = () => {
        // 이벤트 핸들러 내에서 navigate 함수 사용
        const dataToSend = {
          data: data,
          totalPrice: totalPrice
        };
        
        navigate('/OrderInfo', { state: dataToSend });
      };
    

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = (agree) => {
        setOpen(false);
        if (agree) {
          delete_cart(deleteItemId);
          setDeleteItemId(null);
          // 여기에 사용자가 확인을 눌렀을 때 실행할 로직을 추가
        } else {
          // 여기에 사용자가 취소를 눌렀을 때 실행할 로직을 추가
        }
      };

      let [data,setData] = useState(null);
      let [totalPrice,setTotalPrice] = useState(0);
      let [editQuantity,setEditQuantity] = useState([]);

      let [deleteItemId,setDeleteItemId] = useState();

      const dataToSend = {
        data: data, // 여기서 'data'는 전달하고자 하는 데이터입니다.
        totalPrice: totalPrice // 'totalPrice'는 전달하고자 하는 총 금액입니다.
      };

      async function getCartList(){
        await axios.get('http://localhost:8080/cart/cartList',{
            headers:{
                'access' : localStorage.getItem('access'),
                'Content-Type' : 'application/json'
            }
        })
        .then((action)=>{
            let response = action.data.cartList;
            setData(response);
            setEditQuantity(response.map(item => item.quantity));

            let total = response.reduce((acc, item) => acc + item.total_price, 0);
            setTotalPrice(total);
        })
        .catch((error)=>{
            if(error.response.status == 403){
                alert('인증 만료 다시 로그인해주세요.');
                window.location.replace('/login');
            }else{
                console.log(error.response);
            }
        })
    }

    async function delete_cart(cart_id){
        await axios.delete(`http://localhost:8080/cart/${cart_id}/delete`,{
            headers:{
                'access' : localStorage.getItem('access'),
                'Content-Type' : 'application/json'
            }
        })
        .then((action)=>{
            alert("상품이 삭제되었습니다.");
            window.location.replace('/cart');
        })
        .catch((error)=>{
            if(error.response.status == 403){
                alert('인증 만료 다시 로그인해주세요.');
                window.location.replace('/login');
            }else{
                console.error(error);
            }
        })
    }

    useState(()=>{
        getCartList();
    },[])

    const [openAddress, setOpenAddress] = useState(false); // 팝업 열림 상태

    // 팝업을 여는 함수
    const addressHandleOpen = () => {
        setOpenAddress(true);
    };
  
    // 팝업을 닫는 함수
    const addressHandleClose = () => {
        setOpenAddress(false);
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let zoneCode = data.zonecode; // 우편번호 추출
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
    
        // 우편번호와 함께 주소 출력
        console.log(`[우편번호: ${zoneCode}] ${fullAddress}`); 
        addressHandleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"상품삭제"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    상품을 장바구니에서 삭제하시겠습니까?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => handleClose(false)}>취소</Button>
                <Button onClick={() => handleClose(true)} autoFocus>확인</Button>
                </DialogActions>
            </Dialog>
            <Container fixed>
                <h3 style={{marginTop:'40px'}}>장바구니</h3>
                <br/>
                <br/>
                {
                    data ? 
                    
                    <>
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
                            {data.map((data, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                
                                <TableCell align="center"><img src='img/default_item_image.png'  /></TableCell>
                                <TableCell align="center">{data.itemName}</TableCell>
                                <TableCell align="center">{data.price}</TableCell>
                                <TableCell align="center">{data.quantity}</TableCell>
                                <TableCell align="center">{data.total_price}</TableCell>
                                <TableCell align="center">
                                    <IconButton sx={{ color: 'red' }} onClick={()=>{
                                        handleClickOpen()
                                        setDeleteItemId(data.cartId);
                                    }}>
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
                            <div style={{marginTop:'15px'}}>총금액 : <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{totalPrice}</span> 원</div>
                        </Grid>
                        <Grid item xs={6} style={{textAlign:'right'}}>
                            <Button variant="contained" style={{marginTop:'15px', backgroundColor:'black'}} onClick={()=>{
                                console.log(data);
                                console.log(totalPrice);
                                handleButtonClick();
                            }}>주문하기</Button>
                        </Grid>
                    </Grid> 
                    {/* <div>
                        <Button variant="outlined" onClick={addressHandleOpen} >주소 찾기</Button>
                        <Dialog open={openAddress} onClose={addressHandleClose} aria-labelledby="address-search-title" aria-describedby="address-search-description" sx={{
                            '& .MuiDialog-paper': { // Dialog 내부의 paper 컴포넌트에 적용되는 스타일
                            maxWidth: 'none', // 최대 너비 제한 없음
                            width: '35%', // 다이얼로그의 너비를 화면 너비의 80%로 설정
                            //maxHeight: '80vh' // 다이얼로그의 최대 높이를 뷰포트 높이의 80%로 제한
                            },
                        }}>
                            <DaumPostcode onComplete={handleComplete} style={{ width: '100%', height: '600px' }} />
                        </Dialog>
                    </div> */}
                    </>
                    : 
                    <Box sx={{display: 'flex', justifyContent: 'center',  alignItems: 'center',  marginTop : '30%' }}>
                        <CircularProgress />
                    </Box>


                }
                
            </Container>
        </div>
    )
    
}

export default Cart;