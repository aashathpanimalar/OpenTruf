import React from 'react'
import Navbar from './Navbar';
import Category from './Category';
import Products from './Products';
import Footer from './Footer';

const Ecommerce = ({setLoggedIn,setCartItems,cartItems,handleRemoveFromCart, fetchUser}) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            const newCart = { ...prevItems, [product.title]: (prevItems[product.title] || 0) + 1 };
            return newCart;
        });
    };

    return (
        <>
            <Navbar cartItemCount={Object.values(cartItems).reduce((a, b) => a + b, 0)} onLogout={handleLogout} fetchUser={fetchUser} />
            <div id="body1">
                <Category />
                <Products onAddToCart={handleAddToCart} cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
            </div>
            <fieldset id="foot">
                <Footer />
            </fieldset>
        </>
    )
}

export default Ecommerce