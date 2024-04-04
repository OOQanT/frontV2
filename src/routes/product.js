import { Button, Container, Grid, Paper, TextField, styled} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Product(){

    const {id} = useParams();

    let [quantity,setQuantity] = useState(1);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
        <div>
            <Container fixed container spacing={2} style={{marginTop:'30px'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                   <img src='/img/default_item_image.png' style={{width:'500px'}}/>
                </Grid>

                <Grid item xs={6}>
                    <p>상품이름</p>
                    <p>가격</p>
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                        수량:  
                        <IconButton style={{ width: '40px', height: '40px' }}>
                            <AddIcon onClick={(e)=>{
                                let copy = quantity;
                                copy++;
                                setQuantity(copy);
                            }} />
                        </IconButton>
                        <CustomTextField type="number" value={quantity} onChange={(e)=>{
                            setQuantity(e.target.value);
                        }}/>
                        <IconButton onClick={(e) => {
                            if (quantity > 1) {
                                let copy = quantity;
                                copy--;
                                setQuantity(copy);
                            }
                        }}>
                        <RemoveIcon />
                        </IconButton>
                    </p>
                    <p>총금액 : </p>
                    <Button variant="contained" style={{ display: 'block', margin: '0 auto' }}>장바구니</Button>
                    </Grid>
            </Grid>
            <hr/>
            </Container>
            
        </div>
    )
}

const CustomTextField = styled('input')({
    padding: '8px 12px', // 내부 여백 설정
    borderRadius: '8px', // 모서리를 둥글게 설정
    border: '1px solid #bdbdbd', // 테두리 설정
    outline: 'none', // 포커스 시 테두리 제거
    fontSize: '14px', // 폰트 크기 설정
    height: '15px', // 높이 설정
    width: '30px'
  });

export default Product;