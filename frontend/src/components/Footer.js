import React from 'react';
function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <h3 style={{ color: 'black' }} id="about">
            About
          </h3>
        </li>
        <li><a href="#about-us">About us</a></li>
        <li><a href="#careers">Careers</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <ul>
        <li>
          <h3 style={{ color: 'black' }} id="contact">
            Contact
          </h3>
        </li>
        <li>Address: Mohammadpur, Ramnad</li>
        <li>Phone: 9962526764</li>
        <li>Email: aashathpanimalar@gmail.com</li>
      </ul>
      <ul>
        <h3 style={{ color: 'black' }}>
          Useful Link
        </h3>
        <li><a href="#terms">Terms & Condition</a></li>
        <li><a href="#policy">Privacy Policy</a></li>
        <li><a href="#return">Return & Exchange</a></li>
      </ul>
      <ul>
        <li>
          <h3 style={{ color: 'black' }}>
            Follow Us
          </h3>
        </li>
        <li><a href="#facebook">Facebook</a></li>
        <li><a href="#instagram">Instagram</a></li>
        <li><a href="#Youtube">Youtube</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
