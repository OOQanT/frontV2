import { Button, Container, Grid, Paper, TextField, styled} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Product(){

    const {id} = useParams();

    let [quantity,setQuantity] = useState(1);
    let [totalPrice,setTotalPrice] = useState();

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    let [data,setData] = useState();

    const [open, setOpen] = React.useState(false); //다이얼로그 창
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };


    async function getItem(){
        await axios.get(`http://localhost:8080/item/getItems/${id}`,{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then((action)=>{
            let response = action.data;
            setData(response);
            setTotalPrice(response.price);
        })
        .catch((error)=>{
            console.log(error.response);
        })
    }

    async function add_cart(){
        await axios.post('http://localhost:8080/cart/addItem',{
            itemId: data.id,
            quantity: quantity
        },{
            headers:{
                'access' : localStorage.getItem('access'),
                'Content-Type' : 'application/json'
            }
        })
        .then((action)=>{
            //alert('장바구니에 추가되었습니다.');
            handleClickOpen();
        })
        .catch((error)=>{
            console.log(error.response);
        })
    }

    useState(()=>{
        getItem();
    },[]);

    return(
        <div>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title"> 장바구니에 추가되었습니다. </DialogTitle>
                    <DialogContent>
                       
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>확인</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {
                data ? 
                
                <Container fixed style={{marginTop:'30px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <img src='/img/default_item_image.png' style={{width:'500px'}}/>
                    </Grid>
    
                    <Grid item xs={12} sm={6} style={{ padding: '20px', borderRight: '1px solid #eee' }}>
                        <h2 style={{ marginBottom: '20px' }}>{data.itemName}</h2>
                        <p style={{ fontSize: '18px', marginBottom: '10px' }}>가격: ${data.price}</p>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <span style={{ marginRight: '10px' }}>수량:</span>
                            <IconButton 
                                style={{ margin: '0 5px' }}
                                onClick={() => {
                                    let newQuantity = quantity + 1;
                                    setQuantity(newQuantity);
                                    setTotalPrice(data.price * newQuantity);
                                }}
                                aria-label="increase quantity"
                            >
                                <AddIcon />
                            </IconButton>
                            <CustomTextField 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => {
                                    let newQuantity = parseInt(e.target.value, 10);
                                    setQuantity(newQuantity >= 1 ? newQuantity : 1);
                                    setTotalPrice(data.price * (newQuantity >= 1 ? newQuantity : 1));
                                }}
                            />
                            <IconButton 
                                style={{ margin: '0 5px' }}
                                onClick={() => {
                                    let newQuantity = quantity > 1 ? quantity - 1 : 1;
                                    setQuantity(newQuantity);
                                    setTotalPrice(data.price * newQuantity);
                                }}
                                aria-label="decrease quantity"
                            >
                                <RemoveIcon />
                            </IconButton>
                         </div>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>총금액 : ${totalPrice.toFixed(2)}</p>
                        <Button 
                            variant="contained" 
                            style={{ backgroundColor: '#1976d2', color: 'white', padding: '10px 20px', display: 'block', margin: '20px auto' }}
                            onClick={() => {
                                 console.log(data); 
                                 add_cart();
                                }}>
                            장바구니에 추가
                        </Button>
                    </Grid>

                </Grid>
                
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="상품 상세" value="1" />
                            <Tab label="상품 후기" value="2" />
                            <Tab label="Q&A" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel value="1">{data.description}</TabPanel>
                        <TabPanel value="2">상품 후기</TabPanel>
                        <TabPanel value="3">QnA</TabPanel>
                    </TabContext>
                </Box>
    
                </Container> :

                <Box sx={{display: 'flex', justifyContent: 'center',  alignItems: 'center',  marginTop : '30%' }}>
                    <CircularProgress />
                </Box>
            }
            
            
        </div>
    )
}

const CustomTextField = styled('input')(({ theme }) => ({
    margin: '0 5px',
    padding: '5px 10px',
    width: '60px', // 필드의 너비를 조절
    textAlign: 'center', // 텍스트를 가운데 정렬
    border: `1px solid ${theme.palette.divider}`, // 테마 색상을 사용한 테두리 색상
    borderRadius: '4px', // 모서리 둥글기
    '&:focus': {
        borderColor: theme.palette.primary.main, // 포커스 시 테두리 색상 변경
    },
}));

// const CustomTextField = styled('input')({
//     padding: '8px 12px', // 내부 여백 설정
//     borderRadius: '8px', // 모서리를 둥글게 설정
//     border: '1px solid #bdbdbd', // 테두리 설정
//     outline: 'none', // 포커스 시 테두리 제거
//     fontSize: '14px', // 폰트 크기 설정
//     height: '15px', // 높이 설정
//     width: '30px'
//   });

export default Product;