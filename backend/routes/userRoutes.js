//routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP, registerUser, loginUser, checkEmail, changePassword, updateCart,placeOrder, logout} = require('../controllers/userController');
const { loginRequired } = require('../middleware/middleware');

router.get('/user', loginRequired, (req, res) => {
    res.json(req.user); // Send the user data as a JSON response
});

router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.post('/check-email', checkEmail);
router.post('/change-password', changePassword);
router.post('/cart',loginRequired, updateCart);            //middelware added loginRequired
router.post('/place-order',loginRequired,  placeOrder);    //middelware added loginRequired

module.exports = router;

