import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './address.css';

const Address = () => {
  const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem('addresses');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  });

  const [newAddress, setNewAddress] = useState({
    name: '',
    houseNo: '',
    street: '',
    area: '',
    city: '',
    pincode: '',
    contact: ''
  });

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleAddAddress = () => {
    if (Object.values(newAddress).every(field => field.trim() !== '')) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({
        name: '',
        houseNo: '',
        street: '',
        area: '',
        city: '',
        pincode: '',
        contact: ''
      });
    }
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (index === selectedAddressIndex) {
      setSelectedAddressIndex(null);
    } else if (index < selectedAddressIndex) {
      setSelectedAddressIndex(selectedAddressIndex - 1);
    }
  };

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
  };

  const handlePaymentClick = () => {
    if (selectedAddressIndex !== null) {
      navigate('/payment');
    } else {
      alert('Please select an address to proceed to payment.');
    }
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <h3>Add New Address</h3>
        <div className='Address'>
          <input
            type="text"
            name="name"
            value={newAddress.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="houseNo"
            value={newAddress.houseNo}
            onChange={handleChange}
            placeholder="House Number"
          />
          <input
            type="text"
            name="street"
            value={newAddress.street}
            onChange={handleChange}
            placeholder="Street"
          />
          <input
            type="text"
            name="area"
            value={newAddress.area}
            onChange={handleChange}
            placeholder="Area"
          />
          <input
            type="text"
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            type="text"
            name="pincode"
            value={newAddress.pincode}
            onChange={handleChange}
            placeholder="Pincode"
          />
          <input
            type="text"
            name="contact"
            value={newAddress.contact}
            onChange={handleChange}
            placeholder="Contact Number"
          />
          
        </div>
        <br />
        <button onClick={handleAddAddress} id='add'>Add</button>
        <br /><br />
      </div>
      <div className='savedAddress'>
        <ul>
          <h3>Saved address</h3>
          {addresses.map((address, index) => (
            <li key={index} className="task-item">
              <input
                type="radio"
                name="selectedAddress"
                checked={index === selectedAddressIndex}
                onChange={() => handleSelectAddress(index)}
              />
              
              <div><b>Name:</b> {address.name},</div>
              <div><b>House No:</b> {address.houseNo},</div>
              <div><b>Street:</b> {address.street},</div>
              <div><b>Area:</b> {address.area},</div>
              <div><b>City:</b> {address.city},</div>
              <div><b>Pincode:</b> {address.pincode},</div>
              <div><b>Contact No:</b> {address.contact}</div>
              <button onClick={() => handleRemoveAddress(index)}>Remove</button>
            </li>
          ))}
        </ul>
        </div>
        <button id='payment' onClick={handlePaymentClick}>Payment</button>
      </div>
    
  );
};

export default Address;
