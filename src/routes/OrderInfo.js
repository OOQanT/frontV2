
import { TextField, Button, Dialog, DialogTitle, Container, Box } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';


function OrderInfo(){

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data ?? 'No data';
    const totalPrice = location.state?.totalPrice ?? 'No total price';

    console.log(data);
    console.log(totalPrice);

    const handleButtonClick = () => {
      // 이벤트 핸들러 내에서 navigate 함수 사용
      const dataToSend = {
        item: data,
        totalPrice: totalPrice,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        postcode: formData.postcode,
        address: formData.address,
        detailAddress: formData.detailAddress,
        deliveryMessage: formData.deliveryMessage
      };
      
      navigate('/toss', { state: dataToSend });
    };

    const [validation, setValidation] = useState({
      recipientNameValid: true,
      phoneNumberValid: true,
      emailValid:true,
      postcodeValid: true,
      addressValid: true,
      detailAddressValid: true,
      deliveryMessageValid: true
    });

    const handlePaymentClick = () => {
      const { recipientName, phoneNumber, email, postcode, address, detailAddress, deliveryMessage } = formData;
      const newValidation = {
        recipientNameValid: !!recipientName,
        phoneNumberValid: !!phoneNumber,
        emailValid: !!email,
        postcodeValid: !!postcode,
        addressValid: !!address,
        detailAddressValid: !!detailAddress,
        deliveryMessageValid: !!deliveryMessage
      };
  
      setValidation(newValidation);
  
      // 모든 유효성 검사가 통과했는지 확인
      const allValid = Object.values(newValidation).every(value => value === true);
  
      if (allValid) {
        create_order();
        // 모든 입력이 유효한 경우의 로직을 여기에 추가
        console.log('모든 입력이 유효합니다. 결제를 진행하세요.');
      } else {
        // 유효하지 않은 입력이 있는 경우
        console.log('입력되지 않은 정보가 있습니다. 확인해주세요.');
      }
    };

    const [formData, setFormData] = useState({
        recipientName: '',
        phoneNumber: '',
        email:'',
        postcode: '',
        address: '',
        detailAddress: '',
        deliveryMessage: ''
      });
      const [openAddressDialog, setOpenAddressDialog] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleCompleteAddress = (data) => {
        setFormData(prevState => ({
          ...prevState,
          postcode: data.zonecode,
          address: data.address
        }));
        setOpenAddressDialog(false);
      };

      async function create_order(){
        await axios.post(`http://localhost:8080/order/create_Order`,{
            address: formData.address,
            detailAddress: formData.detailAddress,
            payment: "card"
        },{
            headers:{
                'access' : localStorage.getItem('access'),
                'Content-Type' : 'application/json'
            }
        })
        .then((action)=>{
          handleButtonClick();
        })
        .catch((error)=>{
            console.log(error.response);
            if(error.status == 403){
              alert('인증이 만료되었습니다. 다시 로그인해주세요.')
              window.location.replace('/login');
            }
        })
    }

    return(
        <div>
            <Container maxWidth="sm">
                <h2>주문 폼</h2>
                
                <h3 style={{marginTop:'30px'}}>주문정보입력</h3>
                <Box sx={{ border: 1,  borderColor: 'grey.500',  borderRadius: 2,  padding: 2,  marginBottom: 2 }}>
                    <TextField fullWidth label="수령자 이름" name="recipientName" value={formData.recipientName} onChange={handleChange} margin="normal" />
                    {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>*수령자 이름을 입력해주세요</p>}
                    
                    <TextField fullWidth label="전화번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} margin="normal" />
                    {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>*전화번호를 입력해주세요</p>}

                    <TextField fullWidth label="이메일" name="email" value={formData.email} onChange={handleChange} margin="normal" />
                    {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>* 이메일을 입력해주세요</p>}
                    
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}> */}
                <TextField label="우편번호" name="postcode" value={formData.postcode} onChange={handleChange} margin="normal" sx={{ width: '75%' }} InputProps={{ readOnly: true, }}/>
                <Button variant="outlined" onClick={() => setOpenAddressDialog(true)} sx={{ height: '56px', width:'25%' }} style={{marginTop:'16px'}}>주소 찾기</Button>
                {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>*우편번호를 입력해주세요</p>}
                {/* </Box> */}
                    <TextField fullWidth label="주소" name="address" value={formData.address} onChange={handleChange} margin="normal" InputProps={{ readOnly: true, }} />
                    <TextField fullWidth label="상세주소" name="detailAddress" value={formData.detailAddress} onChange={handleChange} margin="normal"/>
                    {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>*상세주소를 입력해주세요</p>}
                    
                    <TextField fullWidth label="배송 메시지" name="deliveryMessage" value={formData.deliveryMessage} onChange={handleChange} margin="normal"/>
                    {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>*배송메시지를 입력해주세요</p>}
                    
                    <hr style={{ borderWidth: '1px', borderColor: 'black', marginTop:'15px', marginBottom:'20px' }} />
                    <p>상품 목록 : {
                        data.length > 1 ?
                        <span>{data[0].itemName} 외 {data.length -1 }개</span> 
                        : <span>{data[0].itemName}</span>
                      } </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>결제 금액 : <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{totalPrice}</span> 원</span>
                      <Button style={{ textAlign: 'right' }} onClick={()=>{
                        create_order();
                      }}>결제</Button>
                    </div>
                </Box>
                <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)} aria-labelledby="address-search-title" aria-describedby="address-search-description"  sx={{
                            '& .MuiDialog-paper': { // Dialog 내부의 paper 컴포넌트에 적용되는 스타일
                            maxWidth: 'none', // 최대 너비 제한 없음
                            width: '20%', // 다이얼로그의 너비를 화면 너비의 80%로 설정
                            //maxHeight: '80vh' // 다이얼로그의 최대 높이를 뷰포트 높이의 80%로 제한
                            },
                        }}>
                <DaumPostcode onComplete={handleCompleteAddress} style={{ width: '100%', height: '500px' }} />
              </Dialog>
            </Container>
        </div>
    )
}

export default OrderInfo;