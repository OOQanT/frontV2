import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Grid, Box, Dialog, Modal, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function ProductFormModal({ isOpen, onClose }) {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: null
    });

    const [error, setError] = useState({
        isName: false,
        isPrice: false,
        isQuantity: false,
        isDescription: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        // 에러 상태도 업데이트하여 유효성 검사 메시지를 없앱니다.
        setError({ ...error, [name]: value ? false : true });
    };

    const handleImageChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            isName: !product.name,
            isPrice: !product.price,
            isQuantity: !product.quantity,
            isDescription: !product.description
        };
        
        setError(newErrors);

        // 오류가 있는지 확인
        const hasError = Object.values(newErrors).some(isError => isError);
        if (!hasError) {
            console.log(product);
            add_item();
           
        }
    };

    async function add_item(){
        const formData = new FormData();
        formData.append('itemName', product.name);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('description', product.description);
        formData.append('imageFiles',product.image)
        await axios.post(`http://localhost:8080/item/register`,formData,{
            headers:{
                'access' : localStorage.getItem('access'),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((action)=>{
            alert("상품이 등록되었습니다.");
            onClose(); // 폼 제출 후 모달 닫기
            window.location.replace("/");
        })
        .catch((error)=>{
            console.log(error.response);
            console.error(error);
            if(error.response.status == 403){
                alert('로그인 후 이용할 수 있습니다.');
                window.location.replace("/login");
            }
        })
    }

    // 모달 스타일 설정
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        
    };
 
    return (
        <>
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5" textAlign="center">
                        상품 등록
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="상품명"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    error={error.isName}
                                    helperText={error.isName ? "상품명을 입력해주세요" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="가격"
                                    name="price"
                                    type="number"
                                    value={product.price}
                                    onChange={handleChange}
                                    error={error.isPrice}
                                    helperText={error.isPrice ? "가격을 입력해주세요" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="수량"
                                    name="quantity"
                                    type="number"
                                    value={product.quantity}
                                    onChange={handleChange}
                                    error={error.isQuantity}
                                    helperText={error.isQuantity ? "수량을 입력해주세요" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="상품 설명"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={product.description}
                                    onChange={handleChange}
                                    error={error.isDescription}
                                    helperText={error.isDescription ? "상품 설명을 입력해주세요" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" component="label">
                                    상품 이미지 업로드
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    등록
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </Modal>
        
        </>
    );
}

export default ProductFormModal;