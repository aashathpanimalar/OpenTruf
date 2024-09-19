//routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP, registerUser, loginUser, checkEmail, changePassword, updateCart,placeOrder} = require('../controllers/userController');


router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/check-email', checkEmail);
router.post('/change-password', changePassword);
router.post('/cart',updateCart);
router.post('/place-order', placeOrder);

module.exports = router;

