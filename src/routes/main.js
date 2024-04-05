import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Main(){
    const navigate = useNavigate();

    let [itemname,setItemname] = useState('');

    let [items,setItems] = useState([]);
    let [totalPages,setTotalPages] = useState();
    let [currentPage,setCurrentPage] = useState(1);

    const [open, setOpen] = React.useState(false); //다이얼로그 창
    let [message,setMessage] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    function getItems(itemname, pageNumber){
        axios.get('http://localhost:8080/item/getItemsPaging',{
            params:{
                itemName : itemname,
                page : pageNumber,
            }
        })
        .then((response)=>{
            console.log(response.data);

            if(response.data.totalItems == 0){
                setMessage('입력정보로 검색되는 상품이 없습니다.');
                setOpen(true);
            }else{
                setItems(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            
        })
        .catch((e)=>{
            console.log(e.message);
        })
        
    }
    

    useEffect(()=>{
        getItems(itemname, currentPage);
    },[currentPage])

    const handlePageChange = (event, value) => {
        setCurrentPage(value); // 선택된 페이지 번호로 상태 업데이트
    };       

    return(
        <div>
            
            <React.Fragment>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title"> {message} </DialogTitle>
                    <DialogContent>
                       
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>확인</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <div className="banner-container img">
                <img src="/img/fern-1250903_1280.jpg" alt="대문 이미지"/>
                <button className="banner-button">리뷰 게시판</button>
            </div>

            <Container fixed>
                <Grid container spacing={2} style={{marginTop:'3px',justifyContent: 'center', alignItems: 'center', marginLeft: '30px' }}>
                    <Grid item xs={8}>
                        <TextField fullWidth label="상품 검색" id="fullWidth"  onChange={(e)=>{
                            setItemname(e.target.value);
                        }}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" style={{ height: '55px' }} onClick={()=>{
                          
                            getItems(itemname, 1);
                            
                        }}>검색</Button>
                    </Grid>
                </Grid>
            </Container>

            {
                items ?
                <>
                    <Container fixed  maxWidth="lg" style={{marginTop:'15px', marginBottom:'30px'}}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {items.map((data, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>

                            <Card sx={{ maxWidth: 345 }} onClick={()=>{
                                navigate(`product/${data.id}`)
                            }}>
                                <CardActionArea>
                                    {
                                        data.storeFilename ? <CardMedia component="img" height="140" image={`http://localhost:8080/item/itemimages/${data.storeFilename[0]}`} alt="green iguana"/> :
                                        <CardMedia component="img" height="140" image="img/default_item_image.png" alt="green iguana"/>

                                    }
                                    {/* <CardMedia component="img" height="140" image="img/default_item_image.png" alt="green iguana"/> */}
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{data.itemName}</Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        {data.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>{data.price}원</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                            </Grid>
                            ))}
                        </Grid>
                    </Container>
            
                    <Stack spacing={2} style={{ marginTop: '3px', marginRight: '30px', justifyContent: 'center', alignItems: 'center', marginBottom: '8em' }}>
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} shape="rounded" />
                    </Stack>
                </>
                :
                <Box sx={{display: 'flex', justifyContent: 'center',  alignItems: 'center',  marginTop : '30%' }}>
                    <CircularProgress />
                </Box>
            }
            
        </div>
    )
}

export default Main;