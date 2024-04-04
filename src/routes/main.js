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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Main(){
    const navigate = useNavigate();

    let [itemname,setItemname] = useState('');

    let [items,setItems] = useState([]);
    let [totalPages,setTotalPages] = useState();
    let [currentPage,setCurrentPage] = useState(1);

    function getItems(itemname, pageNumber){
        axios.get('http://localhost:8080/item/getItemsPaging',{
            params:{
                itemName : itemname,
                page : pageNumber,
            }
        })
        .then((response)=>{
            console.log(response.data);
            setItems(response.data.content);
            setTotalPages(response.data.totalPages);
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
            
            <div className="banner-container img">
                <img src="/img/fern-1250903_1280.jpg" alt="대문 이미지"/>
                <button className="banner-button">리뷰 게시판</button>
            </div>

            <Container fixed>
                <Grid container spacing={2} style={{marginTop:'3px',justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={8}>
                        <TextField fullWidth label="상품 검색" id="fullWidth" onChange={(e)=>{
                            setItemname(e.target.value);
                        }}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" style={{ height: '55px' }} onClick={()=>{
                            console.log(items);
                        }}>검색</Button>
                    </Grid>
                </Grid>
            </Container>

            <Container fixed  maxWidth="lg" style={{marginTop:'15px', marginBottom:'15px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {items.map((data, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia component="img" height="140" image="img/default_item_image.png" alt="green iguana"/>
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
            
            <Stack spacing={2} style={{marginTop:'3px',marginRight:'30px',justifyContent: 'center', alignItems: 'center' }}>
                <Pagination count={totalPages} page={currentPage}  onChange={handlePageChange} shape="rounded" />
            </Stack>
        </div>
    )
}

export default Main;