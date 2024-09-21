import React, { useState, useContext } from 'react';
import { TotalCostContext } from './Cart';
import './payment.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const totalCost = useContext(TotalCostContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleProceedToPay = async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    const selectedAddress = addresses[0] || {};
    const cartItemsArray = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    const loggedInUser = localStorage.getItem('loggedInUser');


    const order = {
      products: cartItemsArray.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
      totalQuantity: Object.values(cart).reduce((a, b) => a + b, 0),
      totalPrice: totalCost,
      address: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      emailId: loggedInUser,

    };

    console.log('Order data being sent to the server:', order);

    try {
      await axios.post('https://pepper-paradise-9iol.onrender.com/api/place-order', order);
      // localStorage.setItem('order', JSON.stringify(order));
      localStorage.removeItem('cart');
      localStorage.removeItem('selectedAddress');
      localStorage.removeItem('order');
      localStorage.removeItem('cartItemsArray');
      // localStorage.removeItem('addresses');

      alert('Order placed successfully');
      navigate('/Ecommerce');
      window.location.reload();
    } catch (error) {
      console.error('Error placing order:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      alert('Failed to place order');
    }
  };


  const paymentMethods = [
    { name: 'Cash on Delivery (COD)', img: 'https://cdn-icons-png.flaticon.com/512/9198/9198191.png' },
    { name: 'Google Pay (GPay)', img: 'https://images.indianexpress.com/2018/09/how-to-use-google-pay-759.jpg?w=414' },
    { name: 'PhonePe', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTarOwLpoC0P4wPfeclqO7xzyrxjSdWCCP87g&s' },
    { name: 'Net Banking', img: 'https://png.pngtree.com/element_our/png/20181108/internet-banking-line-icon-png_233993.jpg' },
    { name: 'Credit/Debit Card', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBfT0iYTa72XMxVbUUhal-BWm7iHuqDxe4YQ&s' },
    { name: 'PayPal', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZEg1Wu9nzK4RtZAgnUMSu5WUSo4RP1ykA&s' },
    { name: 'UPI', img: 'https://cdn.iconscout.com/icon/free/png-256/free-upi-2085056-1747946.png?f=webp' }
  ];

  return (
    <>
      <br />
      <div className="payment-container">
        <h3>Payment Methods</h3>
        <ul>
          {paymentMethods.map((method, index) => (
            <li key={index} className="payment-method-item">
              <div className="payment-method">
                <img src={method.img} alt={method.name} className="payment-method-img" />
                <h1 className="payment-method-title">{method.name}</h1>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.name}
                  checked={selectedPaymentMethod === method.name}
                  onChange={handlePaymentMethodChange}
                  className="payment-method-radio"
                />
              </div>
            </li>
          ))}
        </ul>
        <button
          id='PaymentButton'
          disabled={!selectedPaymentMethod}
          onClick={handleProceedToPay}
        >
          Proceed to pay ${totalCost}.00
        </button>
      </div>
    </>
  );
};

export default Payment;
