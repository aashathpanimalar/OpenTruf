
import React, { useState } from 'react';
import axios from 'axios';

const OtpComponent = ({ emailId, setOtp, setStep, setIsEmailVerified, setIsEmailReadOnly }) => {
  const [otpError, setOtpError] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateOtp = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const otpResponse = await axios.post('https://pepper-paradise-9iol.onrender.com/api/generate-otp', { emailId });
      alert(otpResponse.data.message);
      setOtpSent(true);
      setIsEmailReadOnly(true); // Make email field read-only after OTP is sent
    } catch (error) {
      console.error('Error generating OTP:', error.message);
      setErrorMessage(error.response.data.error || 'Error generating OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const otpVerifyResponse = await axios.post('https://pepper-paradise-9iol.onrender.com/api/verify-otp', { emailId, otp: otpInput });
      setOtp('');
      setOtpError('');
      setStep(2); // Move to step 2 after OTP verification
      setIsEmailVerified(true); // Set email as verified
      alert(otpVerifyResponse.data.message);
    } catch (error) {
      setOtpError(error.response.data.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-component">
      {!otpSent && (
        <>
          <button onClick={handleGenerateOtp} className="btn mt-4" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Generate OTP'}
          </button>
        </>
      )}
      {otpSent && (
        <> 
        <div className="form-group mt-2">
         <input
            type="text"
            placeholder="Enter OTP"
            className="form-style"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
          />
          <i className="input-icon uil uil-key-skeleton-alt"></i>
            <button onClick={handleVerifyOtp} className="btn mt-4" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          {otpError && <p style={{ color: 'red' }}>{otpError}</p>}
          </div></>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default OtpComponent;
