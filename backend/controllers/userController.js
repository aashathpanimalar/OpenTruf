const { generateAccessToken, generateRefreshToken } = require('../middleware/middleware');

//controllers/userController.js
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const db = require('../models');
const User = db.User;


const otps = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Generate OTP and send email
const generateOTP = async (req, res) => {
  const { emailId } = req.body;

  try {
    // Check if the email is already registered using Sequelize
    const user = await User.findOne({ where: { emailId: req.body.emailId } });
    if (user) {
      // If the email is already registered, send an error response
      return res.status(400).json({ error: 'This Email ID is already Registered.' });
    }

    // Generate a new OTP and store it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Registration OTP:", otp);
    otps[emailId] = otp;

    // Configure the mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: 'Verify your Email address',
      text: `You need to verify your email address to create a sign-up on the Pepper Paradise website. Enter the following code to verify your email address: ${otp}`,
    };

    // Send the OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP email:', error.message);
        return res.status(500).json({ error: 'Error sending OTP email' });
      }
      res.status(200).json({ message: 'OTP sent successfully' });
    });
  } catch (error) {
    console.error('Error generating OTP:', error.message);
    res.status(500).json({ error: 'An error occurred while generating OTP' });
  }
};


// Verify OTP
const verifyOTP = (req, res) => {
  const { emailId, otp } = req.body;
  console.log(emailId, otp);
  console.log(otps);
  
  
  if (otps[emailId] === otp) {
    delete otps[emailId];
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const { emailId, fullName, phoneNumber, password } = req.body;

  try {
    // Check if the email is already registered
    const emailCheck = await User.findOne({ where: { emailId } });
    if (emailCheck) {
      return res.status(400).json({ error: 'This Email ID is already Registered.' });
    }    

    // Check if the phone number is already registered
    const phoneNumberCheck = await User.findOne({ where: { phoneNumber } });
    if (phoneNumberCheck) {
      return res.status(410).json({ error: 'This Phone Number is already Registered' });
    }

    // Hash the password and save the user using Sequelize
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      phoneNumber,
      emailId,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error storing user:', error.message);
    res.status(500).json({ error: 'An error occurred while storing user details' });
  }
};

// ============> Credential login <===========
const loginUser = async (req, res) => {
  try {
    console.log(req.body.emailId)
    const { emailId, password } = req.body;

    const user = await User.findOne({ where: { emailId } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // Create a payload for the JWT token
    const tokenPayload = { id: user._id, emailId: user.emailId };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    console.log(accessToken);

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      secure: true,   // Set to true in production with HTTPS
      sameSite: 'None' // Set 'SameSite' to 'None' for cross-site cookies
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 259200000, // 30 days
      secure: true,   // Set to true in production with HTTPS
      sameSite: 'None' // Set 'SameSite' to 'None' for cross-site cookies
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const checkEmail = async (req, res) => {
  const { emailId, forForgotPassword } = req.body;

  try {
    // Check if the email exists using Sequelize
    const user = await User.findOne({ where: { emailId } });
    if (!user) {
      if (forForgotPassword) {
        return res.status(400).json({ error: 'This Email is Not used' });
      } else {
        return res.status(400).json({ error: 'This Email ID is already Registered' });
      }
    }

    if (forForgotPassword) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otps[emailId] = otp;
      console.log("Forgot Password OTP:", otp);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailId,
        subject: 'Verify your Email address',
        text: `You need to verify your email address to reset your password. Enter the following code: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending OTP email:', error.message);
          return res.status(500).json({ error: 'Error sending OTP email' });
        }
        res.status(200).json({ message: 'OTP sent to email for password reset' });
      });
    } else {
      res.status(200).json({ message: 'Email exists' });
    }
  } catch (error) {
    console.error('Error checking email:', error.message);
    res.status(500).json({ error: 'An error occurred while checking email' });
  }
};

// Change user's password
const changePassword = async (req, res) => {
  const { emailId, newPassword } = req.body;

  try {
    // Check if the user exists using Sequelize
    const user = await User.findOne({ where: { emailId } });
    if (!user) {
      return res.status(400).json({ error: 'This Email ID does not exist' });
    }

    // Hash the new password and update the user record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error.message);
    res.status(500).json({ error: 'An error occurred while changing the password' });
  }
};


// Handle /api/cart route
const updateCart = async (req, res) => {
  try {
    const cart = req.body;
    // Your logic to handle the cart data
    res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Handle /api/place-order route
const placeOrder = async (req, res) => {
  try {
    const orderData = req.body;

    if (!orderData.products || !orderData.totalQuantity || !orderData.totalPrice || !orderData.address || !orderData.paymentMethod) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    const savedOrder = await Promise.all(orderData.products.map(async (product) => {
      return await db.Order.create({
        title: product.title,
        quantity: product.quantity,
        price: product.price,
        paymentMethod: orderData.paymentMethod,
        emailId: orderData.emailId, 
        // Store address in individual columns
        name: orderData.address.name,
        houseNo: orderData.address.houseNo,
        street: orderData.address.street,
        area: orderData.address.area,
        city: orderData.address.city,
        pincode: orderData.address.pincode,
        contact: orderData.address.contact,
      });
    }));

    res.status(200).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const logout = async (req, res) => {
  res.cookie('accessToken', null, {
    httpOnly: true,
    maxAge: -1, // Immediate expiration
    secure: true,   // Set to true in production with HTTPS
    sameSite: 'None' // Set 'SameSite' to 'None' for cross-site cookies
  });
  res.cookie('refreshToken', null, {
    httpOnly: true,
    maxAge: -1,
    secure: true,   // Set to true in production with HTTPS
    sameSite: 'None' // Set 'SameSite' to 'None' for cross-site cookies
  });
  res.json({ message: 'Logout successful' });
};




module.exports = {
  generateOTP,
  verifyOTP,
  registerUser,
  loginUser,
  checkEmail,
  changePassword,
  placeOrder,
  updateCart,
  logout
};
