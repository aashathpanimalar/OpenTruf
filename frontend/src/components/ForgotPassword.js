
import React, { useState } from 'react';
import axios from 'axios';
const ForgotPassword = () => {
  const [emailId, setEmailId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmailId(event.target.value);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckEmail = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/check-email', { emailId, forForgotPassword: true });
      if (response.data.message === 'OTP sent to email for password reset') {
        setOtpSent(true);
      } else {
        setErrorMessage('This Email is Not used in account creation');
      }
    } catch (error) {
      console.error('Error checking email:', error.message);
      setErrorMessage(error.response.data.error || 'Error checking email');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setVerifyError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { emailId, otp });
      if (response.data.message === 'OTP verified successfully') {
        setOtpVerified(true);
      } else {
        setVerifyError('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      setVerifyError(error.response.data.error || 'Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordChangeError('');
    setLoading(true);

    if ((newPassword.length < 6 || newPassword.length > 15) && (confirmPassword.length < 6 || newPassword.length > 15)) {
      setPasswordChangeError('Password must be between 6 and 15 characters');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/change-password', { emailId, newPassword });
      if (response.data.message === 'Password changed successfully') {
        alert('Password changed successfully');
        window.location.reload();
        // Optionally, you can redirect the user to the login page or any other page
      } else {
        setPasswordChangeError('Error changing password');
      }
    } catch (error) {
      console.error('Error changing password:', error.message);
      setPasswordChangeError(error.response.data.error || 'Error changing password');
    } finally {
      setLoading(false);
    }
  };

  if (otpVerified) {
    return (
      <div className="card-3d-wrapper">
        <div className="card-front">
          <div className="center-wrap">
            <div className="section text-center">
              <h4 className="mb-4 pb-3">Reset Password</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    className="form-style"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <i className={`input-icon uil ${showNewPassword ? 'uil-eye' : 'uil-eye-slash'}`} onClick={toggleNewPassword}></i>
                </div>

                <div className="form-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="form-style"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <i className={`input-icon uil ${showConfirmPassword ? 'uil-eye' : 'uil-eye-slash'}`} onClick={toggleConfirmPassword}></i>
                </div>
                <button
                  type="button"
                  className="btn mt-4"
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Change Password'}
                </button>
                {passwordChangeError && (
                  <div className="error-message">{passwordChangeError}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (otpSent) {
    return (
      <div className="card-3d-wrapper">
        <div className="card-front">
          <div className="center-wrap">
            <div className="section text-center">
              <h4 className="mb-4 pb-3">Enter OTP</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <i className="input-icon uil uil-key-skeleton-alt"></i>
                  <input
                    type="text"
                    required
                    className="form-style"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn mt-4"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Verify OTP'}
                </button>
                {verifyError && (
                  <div className="error-message">{verifyError}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-3d-wrapper">
      <div className="card-front">
        <div className="center-wrap">
          <div className="section text-center">
            <h4 className="mb-4 pb-3">Forgot Password?</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input
                  type="email"
                  required
                  className="form-style"
                  placeholder="Enter your Email ID"
                  value={emailId}
                  onChange={handleEmailChange}
                />
                <i className="input-icon uil uil-at"></i>
              </div>
              <button
                type="button"
                className="btn mt-4"
                onClick={handleCheckEmail}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Check Email'}
              </button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
