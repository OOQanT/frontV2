import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Box,
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

function ProductV2() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomTextField = styled(TextField)({
    '& input': {
      textAlign: 'center',
    },
  });

  return (
    // maxWidth를 "xl"로 설정하여 컨테이너의 최대 너비를 확장
    <Container maxWidth="xl" sx={{ my: 4 }} style={{marginTop:'150px'}}>
      <Grid container spacing={4}>
        {/* Grid item의 xs와 md 값을 조정하여 화면 너비에 따라 차지하는 비율을 조정 */}
        <Grid item xs={12} md={7} lg={9}>
          <Card>
            <CardMedia
              component="img"
              height="800" // 이미지의 높이를 조정하여 더 크게 표시
              image="/img/default_item_image.png"
              alt="상품 이미지"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                상품 이름
              </Typography>
              <Typography variant="body1" color="text.secondary">
                여기에 상품 설명을 입력하세요.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', pl: 2 }}>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <RemoveIcon />
                </IconButton>
                <CustomTextField
                  variant="outlined"
                  size="small"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                />
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{ mr: 2 }}
              >
                장바구니
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={7} lg={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="상품 상세" value="1" />
              <Tab label="상품 후기" value="2" />
              <Tab label="Q&A" value="3" />
            </Tabs>
          </Box>
          <Box>
            {value === '1' && <Typography sx={{ p: 2 }}>상품 상세 정보</Typography>}
            {value === '2' && <Typography sx={{ p: 2 }}>상품 후기</Typography>}
            {value === '3' && <Typography sx={{ p: 2 }}>Q&A</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductV2;

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button, Container, Grid, Typography, IconButton, TextField, Card, CardContent, CardActions, Box, CardMedia, Paper } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { styled } from '@mui/material/styles';

// const CustomCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   transition: "transform 0.15s ease-in-out",
//   "&:hover": {
//     transform: "scale3d(1.05, 1.05, 1)",
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const Highlight = styled('span')(({ theme }) => ({
//   backgroundColor: theme.palette.action.selected,
//   padding: theme.spacing(0.5),
//   borderRadius: theme.shape.borderRadius,
// }));

// function Product() {
//     const { id } = useParams();
//     const [quantity, setQuantity] = useState(1);
//     const price = 100; // 예시 가격, 실제 구현 시 서버에서 가져오는 데이터 사용
//     const totalPrice = price * quantity;

//     return (
//         <Container maxWidth="lg" sx={{ my: 4 }}>
//             <Typography variant="h4" gutterBottom component="div" textAlign="center">
//                 Discover Our <Highlight>Exclusive Product</Highlight>
//             </Typography>
//             <Grid container spacing={4} justifyContent="center">
//                 <Grid item xs={12} md={6}>
//                     <CustomCard>
//                         <CardMedia
//                             component="img"
//                             height="400"
//                             image="/img/default_item_image.png"
//                             alt="상품 이미지"
//                         />
//                         <CardContent>
//                             <Typography gutterBottom variant="h5" component="div">
//                                 상품 이름
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 상품 설명이 여기에 표시됩니다. 이 상품은 어쩌고 저쩌고...
//                             </Typography>
//                         </CardContent>
//                         <CardActions disableSpacing sx={{ justifyContent: 'space-between', p: 2 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}><RemoveIcon /></IconButton>
//                                 <TextField
//                                     size="small"
//                                     value={quantity}
//                                     onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
//                                     type="number"
//                                     InputProps={{ inputProps: { min: 1 } }}
//                                     sx={{ width: '60px', mx: 1 }}
//                                 />
//                                 <IconButton onClick={() => setQuantity(quantity + 1)}><AddIcon /></IconButton>
//                             </Box>
//                             <Typography variant="h6">Total: ${totalPrice}</Typography>
//                         </CardActions>
//                     </CustomCard>
//                 </Grid>
//                 <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<ShoppingCartIcon />}
//                         sx={{ py: 1.5, px: 5, alignSelf: 'center' }}
//                     >
//                         Add to Cart
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }

// export default Product;



