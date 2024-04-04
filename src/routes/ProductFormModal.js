import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Box, Dialog, Modal } from '@mui/material';

function ProductFormModal({ isOpen, onClose }) {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        onClose(); // 폼 제출 후 모달 닫기
    };

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
        zIndex: 1300
    };

    return (
        <Modal
            open={isOpen} // isOpen 사용
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                        상품 등록
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="상품명" name="name" value={product.name} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="가격" name="price" type="number" value={product.price} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="수량" name="quantity" type="number" value={product.quantity} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="상품 설명" name="description" multiline rows={4} value={product.description} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" component="label"> 상품 이미지 업로드
                                <input type="file" hidden onChange={handleImageChange} />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> 등록</Button>
                        </Grid>
                    </Grid>
                </form>
                </Container>
            </Box>
        </Modal>
    );
}

export default ProductFormModal;