//middleware/middleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config()

function generateAccessToken(payload) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_KEY
    return jwt.sign(payload, accessTokenSecret, { expiresIn: '1h' });
}

function generateRefreshToken(payload) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_KEY
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '30d' });
}

const loginRequired = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies || {}; // Add a fallback to avoid destructuring error
    const accessTokenSecret = process.env.ACCESS_TOKEN_KEY;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_KEY;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: 'No tokens provided' });
    }

    try {
        jwt.verify(accessToken, accessTokenSecret, async (err, decoded) => {
            if (err && (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') && refreshToken) {
                jwt.verify(refreshToken, refreshTokenSecret, async (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        return res.status(401).json({ message: 'Refresh token invalid or expired' });
                    }
                    let newAccessToken;
                    let user;

                    if (refreshDecoded.emailId) {
                        user = await User.findOne({ emailId: refreshDecoded.emailId });
                        if (!user) {
                            return res.status(404).json({ message: 'User not found' });
                        }

                        newAccessToken = generateAccessToken({
                            emailId: user.emailId,
                            user_type: user.user_type
                        });
                    } else if (refreshDecoded.username) {
                        user = await User.findOne({ username: refreshDecoded.username });
                        if (!user) {
                            return res.status(404).json({ message: 'User not found' });
                        }

                        newAccessToken = generateAccessToken({
                            username: user.username,
                            user_type: user.user_type
                        });
                    }

                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        maxAge: 3600000, // 1 hour
                        secure: true, // Set to true in production with HTTPS
                        sameSite: 'None' // Set 'SameSite' to 'None' for cross-site cookies
                    });

                    req.user = user;
                    next();
                });
            } else if (err) {
                return res.status(401).json({ message: 'Invalid access token' });
            } else {
                let user;
                if (decoded.emailId) {
                    user = await User.findOne({ emailId: decoded.emailId });
                } else if (decoded.username) {
                    user = await User.findOne({ username: decoded.username });
                }
                req.user = user;
                next();
            }
        });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    loginRequired
}