// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/Navbar';
// import Category from './components/Category';
// import Products, { products } from './components/Products';
// import Footer from './components/Footer';
// import Cart, { TotalCostContext } from './components/Cart';
// import Address from './components/Address';
// import Payment from './components/Payment';
// import Login from './components/Login';
// import api from './api/api';


// function App() {
//   const [cartItems, setCartItems] = useState({});
//   const [address, setAddress] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);

// const fetchUser = async () => {
//   try {
//     const response = await api.get('/user');
//     if (response.data) {
//       setLoggedIn(true)
//     }
//   }
//   catch (err) {
//     console.log('User Unauthorized..');
//   }
// }

// useEffect(() => {
//   !loggedIn && fetchUser()
// }, [loggedIn])

// const handleLogin = async (emailId, password) => {
//   try {
//     await api.post('/api/login', { emailId, password });
//     fetchUser()
//   } catch (error) {
//     console.error('Login error:', error);
//   }
// };

//   const handleAddToCart = (product) => {
//     setCartItems((prevItems) => {
//       const newCart = { ...prevItems, [product.title]: (prevItems[product.title] || 0) + 1 };
//       return newCart;
//     });
//   };

//   const handleRemoveFromCart = (product) => {
//     setCartItems((prevItems) => {
//       const newCart = { ...prevItems };
//       if (newCart[product.title] > 1) {
//         newCart[product.title] -= 1;
//       } else {
//         delete newCart[product.title];
//       }
//       return newCart;
//     });
//   };

//   const handleProceedToPayment = async () => {
//     if (!address || !paymentMethod) {
//       alert('Please complete the address and payment method.');
//       return;
//     }

//     const cartItemsArray = Object.entries(cartItems).map(([title, quantity]) => ({
//       title,
//       quantity,
//       price: products.find(p => p.title === title)?.price || 0
//     }));

//     try {
//       await axios.post('/api/saveOrder', {
//         cartItems: cartItemsArray,
//         address,
//         paymentMethod
//       });
//       alert('Order saved successfully!');
//     } catch (error) {
//       console.error('Error saving order:', error);
//     }
//   };

//   const totalCost = Object.values(cartItems).reduce((acc, quantity) => {
//     const product = products.find(p => p.title === Object.keys(cartItems).find(key => cartItems[key] === quantity));
//     return acc + (product?.price || 0) * quantity;
//   }, 0);

//   return (
//     <>
//       <TotalCostContext.Provider value={totalCost}>
//         <Router>
//           <div>
//             <div id="root"></div>
//             <fieldset id="main">
//               <fieldset id="main2">
//                 <Routes>
//                   <Route path="/" element={<Login />} />
//                   <Route
//                     path="/Ecommerce"
//                     element={
                      
//                         <>
//                           <Navbar cartItemCount={Object.values(cartItems).reduce((a, b) => a + b, 0)} />
//                           <div id="body1">
//                             <Category />
//                             <Products onAddToCart={handleAddToCart} cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
//                           </div>
//                           <fieldset id="foot">
//                             <Footer />
//                           </fieldset>
//                         </>
                      
//                     }
//                   />
//                   <Route
//                     path="/cart"
//                     element={
                      
//                         <Cart cartItems={cartItems} products={products} onRemoveFromCart={handleRemoveFromCart} />
                      
//                     }
//                   />
//                   <Route
//                     path="/address"
//                     element={
                      
//                         <Address onAddressSelect={setAddress} />
                      
//                     }
//                   />
//                   <Route
//                     path="/payment"
//                     element={
                      
//                         <Payment onPaymentMethodSelect={setPaymentMethod} onProceedToPayment={handleProceedToPayment} />
                      
//                     }
//                   />
//                 </Routes>
//               </fieldset>
//             </fieldset>
//           </div>
//         </Router>
//       </TotalCostContext.Provider>
//     </>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { products } from './components/Products';
import Cart, { TotalCostContext } from './components/Cart';
import Address from './components/Address';
import Payment from './components/Payment';
import Login from './components/Login';
import api from './api/api';
import Ecommerce from './components/Ecommerce';

function App() {
  const [cartItems, setCartItems] = useState({});
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


  const fetchUser = async () => {
    try {
      const response = await api.get('/api/user');
      if (response.data) {
        setLoggedIn(true)
      }else{
        setLoggedIn(false);
      }
    }
    catch (err) {
      setLoggedIn(false);
      console.log('User Unauthorized..');
    }
  }

  useEffect(() => {
    !loggedIn && fetchUser()
  }, [loggedIn])


  const handleLogin = async (emailId, password) => {
    try {
      await api.post('/api/login', { emailId, password });
      fetchUser()
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const newCart = { ...prevItems };
      if (newCart[product.title] > 1) {
        newCart[product.title] -= 1;
      } else {
        delete newCart[product.title];
      }
      return newCart;
    });
  };

  const handleProceedToPayment = async () => {
    if (!address || !paymentMethod) {
      alert('Please complete the address and payment method.');
      return;
    }

    const cartItemsArray = Object.entries(cartItems).map(([title, quantity]) => ({
      title,
      quantity,
      price: products.find(p => p.title === title)?.price || 0
    }));

    try {
      await axios.post('/api/saveOrder', {
        cartItems: cartItemsArray,
        address,
        paymentMethod
      });
      alert('Order saved successfully!');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const totalCost = Object.values(cartItems).reduce((acc, quantity) => {
    const product = products.find(p => p.title === Object.keys(cartItems).find(key => cartItems[key] === quantity));
    return acc + (product?.price || 0) * quantity;
  }, 0);

  return (
    <>
      <TotalCostContext.Provider value={totalCost}>
        <Router>
          <div>
            <div id="root"></div>
            <fieldset id="main">
              <fieldset id="main2">
                <Routes>
                  {loggedIn ?
                    <>
                    <Route path="/" element={<Ecommerce setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems} fetchUser={fetchUser} handleRemoveFromCart={handleRemoveFromCart} />} />
                      <Route path="/cart" element={<Cart cartItems={cartItems} products={products} onRemoveFromCart={handleRemoveFromCart} />}/>
                      <Route path="/address" element={<Address onAddressSelect={setAddress} />}/>
                      <Route path="/payment" element={<Payment onPaymentMethodSelect={setPaymentMethod} onProceedToPayment={handleProceedToPayment} />}/>
                    </>
                  :
                  <Route path="/" element={<Login onLogin={handleLogin} fetchUser={fetchUser} />} />
                  }
                </Routes>
              </fieldset>
            </fieldset>
          </div>
        </Router>
      </TotalCostContext.Provider>
    </>
  );
}

export default App;
