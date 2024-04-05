
import { TextField, Button, Dialog, DialogTitle, Container, Box } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

function OrderInfo(){

    const location = useLocation();
    const data = location.state?.data ?? 'No data';
    const totalPrice = location.state?.totalPrice ?? 'No total price';

    console.log(data);
    console.log(totalPrice);

    const [validation, setValidation] = useState({
      recipientNameValid: true,
      phoneNumberValid: true,
      postcodeValid: true,
      addressValid: true,
      detailAddressValid: true,
      deliveryMessageValid: true
    });

    const handlePaymentClick = () => {
      const { recipientName, phoneNumber, postcode, address, detailAddress, deliveryMessage } = formData;
      const newValidation = {
        recipientNameValid: !!recipientName,
        phoneNumberValid: !!phoneNumber,
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
            alert('상품이 주문되었습니다.')
            window.location.replace('/');
        })
        .catch((error)=>{
            console.log(error.response);
            if(error.status == 403){
              alert('인증이 만료되었습니다. 다시 로그인해주세요.')
              window.location.replace('/login');
            }
        })
    }

    useEffect(() => {
      const jquery = document.createElement("script");
      jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
      const iamport = document.createElement("script");
      iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
      document.head.appendChild(jquery);
      document.head.appendChild(iamport);
      return () => {
        document.head.removeChild(jquery);
        document.head.removeChild(iamport);
      };
    }, []);

    // const requestPay = () => {
    //   const { IMP } = window;
    //   IMP.init('imp03727886');
  
    //   IMP.request_pay({
    //     pg: 'toss_brandpay.imp03727886',
    //     pay_method: 'card',
    //     merchant_uid: new Date().getTime(),
    //     name: '테스트 상품',
    //     amount: 1004,
    //     buyer_email: 'bomin5238@naver.com',
    //     buyer_name: '장보민',
    //     buyer_tel: '010-7307-3466',
    //     buyer_addr: '서울특별시',
    //     buyer_postcode: '123-456',
    //   }, async (rsp) => {
    //     try {
    //       const { data } = await axios.post('http://localhost:8080/verifyIamport/' + rsp.imp_uid);
    //       if (rsp.paid_amount === data.response.amount) {
    //         alert('결제 성공');
    //       } else {
    //         alert('결제 실패');
    //       }
    //     } catch (error) {
    //       console.error('Error while verifying payment:', error);
    //       alert('결제 실패');
    //     }
    //   });
    // };

    function onClickPayment() {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window;
      IMP.init('고유인식번호');
  
      /* 2. 결제 데이터 정의하기 */
      const data = {
        pg: 'html5_inicis',                           
        pay_method: 'card',                          
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: 1000,                                 
        name: '테스트 상품',                  
        buyer_name: '주문자',                           
        buyer_tel: '전화번호',                     
        buyer_email: '주문자메일',               
        buyer_addr: '신사동 661-16',                    
        buyer_postcode: '06018',                     
      };
  
      /* 4. 결제 창 호출하기 */
      IMP.request_pay(data, callback);
    }

    function callback(response) {
      const {
        success,
        merchant_uid,
        error_msg,
      } = response;
  
      if (success) {
        alert('결제 성공');
      } else {
        alert(`결제 실패: ${error_msg}`);
        console.log(response);
      }
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
                    {!validation.recipientNameValid && <p style={{ color: 'red', fontSize: '13px' }}>*전화번호 이름을 입력해주세요</p>}
                    
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
                      <Button style={{ textAlign: 'right' }} onClick={handlePaymentClick}>결제</Button>
                      <Button onClick={onClickPayment}>결제test</Button>
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