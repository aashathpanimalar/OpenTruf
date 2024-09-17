
import React, { useState, useEffect } from 'react';

function ProductCard({ product, onAddToCart, onRemoveFromCart }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let savedCart;
    try {
      savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
      savedCart = [];
    }
    
    const existingProduct = savedCart.find(item => item.title === product.title);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }
  }, [product.title]);

  const updateCart = (newQuantity) => {
    let savedCart;
    try {
        savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        savedCart = [];
    }

    const existingProductIndex = savedCart.findIndex(item => item.title === product.title);

    if (newQuantity === 0) {
        if (existingProductIndex !== -1) {
            savedCart.splice(existingProductIndex, 1);
        }
    } else {
        if (existingProductIndex !== -1) {
            savedCart[existingProductIndex].quantity = newQuantity;
        } else {
            savedCart.push({ title: product.title, quantity: newQuantity });
        }
    }

    localStorage.setItem('cart', JSON.stringify(savedCart));

    // Get the token from localStorage
    const token = localStorage.getItem('authToken');

    // Send the updated cart to the backend with the token in the headers
    fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify(savedCart),
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating cart:', error));
};


  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
      onRemoveFromCart(product);
    }
  };

  const handleRatingClick = (event) => {
    // No operation
  };

  return (
    <fieldset className="item" id="product" style={{ marginTop: '18px' }}>
      <center>
        <img src={product.imgSrc} style={{ padding: '0%', borderStyle: 'none' }} alt={product.title} />
        <br />
        <b>{product.title}</b><br />
        <div className="rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                id={`star${star}-${product.title}`}
                name={`rating-${product.title}`}
                value={star}
                checked={product.rating === star}
                onChange={handleRatingClick}
              />
              <label htmlFor={`star${star}-${product.title}`}>★</label>
            </React.Fragment>
          ))}
        </div><br />
        Price: {`$${product.price}.00`}<br />

        {quantity > 0 ? (
          <div style={{display:'flex',justifyContent:'center'}}>
            <button className="card" onClick={handleRemoveFromCart} style={{ padding: '6px', width: '40px' }}>-</button>
           <p style={{margin:'0%',padding:'0%'}}> Quantity: {quantity}</p>
            <button className="card" onClick={handleAddToCart} style={{ padding: '6px', width: '40px' }}>+</button>
          </div>
        ) : (
          <button className="card" onClick={handleAddToCart} style={{marginLeft:'0%'}}>Add To Cart</button>
        )}
      </center>
    </fieldset>
  );
}

export default ProductCard;
