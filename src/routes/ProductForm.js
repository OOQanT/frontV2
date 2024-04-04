import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';

function ProductForm() {
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
        // 여기에서 상품 정보를 처리합니다. 예: 서버로 데이터를 전송
        console.log(product);
    };

    return (
        <div>
            <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ p: 3 }}>
                <Typography component="h1" variant="h5">
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                            >
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
            </Paper>
        </Container>
        </div>
    );
}

export default ProductForm;