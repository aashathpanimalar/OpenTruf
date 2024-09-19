import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ cartItemCount }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Optionally remove user data from localStorage
    localStorage.removeItem('token'); 
    navigate('/'); // Navigate to the main page
  };
  return (
    <div className="navbar">
      <button className="btn mt-4" onClick={handleLogout} style={{margin:'0'}}>Log Out</button>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <a href="#profile" className="cart-icon">
          <img src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" style={{ marginLeft: '10px', borderRadius: '50%', height: '50px', width: '50px' }} alt="Profile" />
        </a>
        <ul style={{ fontFamily: 'monospace', fontSize: '1.35rem' }}>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#product">Product</a></li>
          <li><a className="active" href="#home">Home</a></li>
        </ul>
        <div className="cart-icon">
          <Link to="/cart">
            <div className="cart-container">
              <div className="cart-symbol">&#128722;</div>
              {cartItemCount > 0 && <div className="cart-count">{cartItemCount}</div>}
            </div>
          </Link>
        </div>
      </div>
      <div id="head">
        <h2 style={{ fontFamily: 'cursive', fontSize: '2rem' }}>Discover the Diversity of Chili Peppers, From Mild to Wild</h2>
        <p style={{ fontStyle: 'italic' }}>Embark on a flavorful journey through the world of chili peppers, where the spectrum of heat ranges from mild to wild.</p>
        <br />
        <a href="#contact" className="Contact-us">
          <button className='Contact-us'>
            <h3>Contact Us</h3>
          </button>
        </a>
        <br /><br /><br /><br />
      </div>
    </div>
  );
}

export default Navbar;
