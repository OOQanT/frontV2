import React from 'react';
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

function Main(){

    // const Item = styled(Paper)(({ theme }) => ({
    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    //   }));

    return(
        <div>
            
            <div className="banner-container img">
                <img src="/img/fern-1250903_1280.jpg" alt="대문 이미지"/>
                <button className="banner-button">리뷰 게시판</button>
            </div>

            <Container fixed>
                <Grid container spacing={2} style={{marginTop:'3px',justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={8}>
                        <TextField fullWidth label="상품 검색" id="fullWidth" />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" style={{ height: '55px' }}>검색</Button>
                    </Grid>
                </Grid>
            </Container>

            <Container fixed  maxWidth="lg" style={{marginTop:'15px', marginBottom:'15px'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(9)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image="img/default_item_image.png"
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>

                    </Grid>
                    ))}
                </Grid>
            </Container>
            
            <Stack spacing={2} style={{marginTop:'3px',marginRight:'30px',justifyContent: 'center', alignItems: 'center' }}>
                <Pagination count={10} shape="rounded" />
            </Stack>

        </div>
    )
}

export default Main;