
import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';


// Create the context
const TotalCostContext = createContext();

function Cart({ cartItems, products, onRemoveFromCart }) {
  const navigate = useNavigate();

  const handleRemoveItem = (title) => {
    const product = products.find(p => p.title === title);
    onRemoveFromCart(product);
  };

  const handlePlaceOrder = () => {
    const cartItemsArray = Object.entries(cartItems).map(([title, quantity]) => {
      const product = products.find(product => product.title === title);
      return {
        title,
        quantity,
        price: product?.price || 0,
      };
    });

    // Store the cartItemsArray in localStorage
    localStorage.setItem('cartItemsArray', JSON.stringify(cartItemsArray));
    navigate('/address');
  };

  const cartItemsArray = Object.entries(cartItems).map(([title, quantity]) => {
    const product = products.find(product => product.title === title);
    return {
      title,
      quantity,
      imgSrc: product?.imgSrc || 'default_image.jpg',
      price: product?.price || 0,
      rating: product?.rating || 0
    };
  });

  const totalCost = cartItemsArray.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <TotalCostContext.Provider value={totalCost}>
      <div>
        <fieldset style={{ backgroundColor: 'white', padding: '0px', borderStyle: 'solid', borderWidth: '3px', borderColor: 'black' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.4rem', display: 'block' }}>Cart Details</h3>
          <hr />
          <div style={{ backgroundColor: 'white' }} className='individual-cart'>
            {cartItemsArray.length === 0 ? (
              <h4 style={{ backgroundColor: 'white', padding: '150px', paddingLeft: '475px', color: 'black', display: 'block' }}>Your cart is empty</h4>
            ) : (
              cartItemsArray.map((item, index) => (
                <div key={index} style={{ borderRadius: '5px', borderWidth: '2px', borderColor: 'black', borderStyle: 'solid', margin: '4px', width: '230px', height: '413px' }} >
                  <fieldset style={{ border: 'none', padding: '0px', margin: '0px', boxShadow: '10px 10px 12px rgba(0, 0, 0, 0.3)' }}>
                    <center>
                      <img src={item.imgSrc} alt={item.title} style={{ width: '100%', height: '200px', padding: '0px' }} />
                      <h4>{item.title}</h4>
                      <p>Price: ${item.price}.00</p>
                      <p>Rating: {item.rating} stars</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Subtotal: ${item.price * item.quantity}.00</p>
                      <br />
                      <button className='card' onClick={() => handleRemoveItem(item.title)}>Remove</button>
                    </center>
                  </fieldset>
                </div>
              ))
            )}
          </div>
          {cartItemsArray.length > 0 && (
            <div style={{ textAlign: 'center', padding: '30px', fontSize: '1.2rem' }}>
              <mark><strong>Total Cost: ${totalCost}.00</strong></mark><br />
              <button id='buy' onClick={handlePlaceOrder}>Place Order</button>
            </div>
          )}
        </fieldset>
      </div>
    </TotalCostContext.Provider>
  );
}

export { TotalCostContext };
export default Cart;