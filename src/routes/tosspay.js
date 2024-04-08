import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const random = new Date().getTime() + Math.random();

const widgetClientKey = "test_ck_ma60RZblrqYqgxBOQLnMrwzYWBn1";
const customerKey = "order_"+random;


// const paymentWidget = PaymentWidget(widgetClientKey, PaymentWidget.ANONYMOUS) // 비회원 결제

export function CheckoutPage() {
    let user = useSelector((state)=>{
        return state;
    })

    const location = useLocation();
    console.log(location.state);
    const data = location.state?.data ?? 'No data';
    const totalPrice = location.state?.totalPrice ?? 'No total price';

  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(totalPrice);

  const [orderId, setOrderId] = useState(uuidv4());

  function prepare(){
    axios.post('http://localhost:8080/prepare',{
        orderCode: "order_"+orderId,
        totalPrice: price
    },{
        headers:{
            'access' : localStorage.getItem('access'),
            'Content-Type' : 'application/json' 
        }
    })
    .then((response)=>{
        console.log('성공')
    })
    .catch((error)=>{
        console.log(error);
    })
  }

  useEffect(()=>{
    prepare();
  },[])

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement", 
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: 'order_' + orderId,
        orderName: location.state.item[0] + '외 ' + location.state.item.length -1 +'건',
        customerName: user.user.nickname,
        customerEmail: location.state.email,
        customerMobilePhone: location.state.phoneNumber,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div>
      {/* 할인 쿠폰 */}
      {/* <label htmlFor="coupon-box">
        <input
          id="coupon-box"
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000);
          }}
        />
        <span>5,000원 쿠폰 적용</span>
      </label> */}
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/* 결제하기 버튼 */}
      <button onClick={handlePaymentRequest}>결제하기</button>
    </div>
  );
}
