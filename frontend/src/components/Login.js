
// import React, { useState, useEffect } from 'react';
// import './login.css';
// import OtpComponent from './OtpComponent';
// import ForgotPassword from './ForgotPassword';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [step, setStep] = useState(1);
//   const [emailId, setEmailId] = useState('');
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phoneNumber: '',
//     password: ''
//   });

//   const [loginData, setLoginData] = useState({
//     emailId: '',
//     password: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loginErrorMessage, setLoginErrorMessage] = useState('');
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isEmailReadOnly, setIsEmailReadOnly] = useState(false);

//   // Effect to clear loggedInUser from localStorage on component mount
//   useEffect(() => {
//     localStorage.removeItem('loggedInUser');
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleLoginChange = (event) => {
//     const { name, value } = event.target;
//     setLoginData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleEmailChange = (event) => {
//     setEmailId(event.target.value);
//   };

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     setErrorMessage('');
//     setLoading(true);

//     const { fullName, phoneNumber, password } = formData;

//     if (!fullName || !phoneNumber || !password) {
//       setErrorMessage('All fields are required');
//       setLoading(false);
//       return;
//     }
//     if (password.length < 6 || password.length > 15) {
//       setErrorMessage('Password must be between 6 and 15 characters');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/register', {
//         emailId,
//         fullName,
//         phoneNumber,
//         password,
//       });
//       alert('User registered successfully');
//       setFormData({ fullName: '', phoneNumber: '', password: '' });
//       setEmailId('');
//       setOtp('');
//       setIsEmailVerified(false);
//       setIsEmailReadOnly(false);
//       setStep(1); // Move to step 1 after registration
//     } catch (error) {
//       console.error('Error registering user:', error.message);
//       setErrorMessage(error.response.data.error || 'Error registering user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();
//     setLoginErrorMessage('');
//     setLoading(true);
  
//     const { emailId, password } = loginData;
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', { emailId, password });
//       const { token } = response.data; // Get JWT token from response
      
//       // Store JWT token in local storage
//       localStorage.setItem('token', token);
  
//       // Navigate to a protected route after successful login
//       navigate('/Ecommerce');
//       localStorage.setItem('loggedInUser', emailId);
//       setLoginData({ emailId: '', password: '' });
//     } catch (error) {
//       console.error('Error logging in:', error.message);
//       setLoginErrorMessage(error.response.data.error || 'Error logging in');
//     } finally {
//       setLoading(false);
//     }
//   };
  




//   const handleForgotPasswordClick = () => {
//     setStep(3); // Navigate to ForgotPassword component
//   };

//   return (
//     <div className='loginbody'>
//       <div className="section">


        
//         <div className="container">
//           <div className="row full-height justify-content-center">
//             <div className="col-12 text-center align-self-center py-5">
//               <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                 {step !== 3 && (
//                   <>
//                     <h6 className="mb-0 pb-3">
//                       <span>Log In </span><span>Sign Up</span>
//                     </h6>
//                     <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
//                     <label htmlFor="reg-log"></label>
//                   </>
//                 )}
//                 <div className="card-3d-wrap mx-auto">
//                   <div className="card-3d-wrapper">
//                     {step === 3 ? (
//                       <ForgotPassword />
//                     ) : (
//                       <>
//                         <div className="card-front">
//                           <div className="center-wrap">
//                             <div className="section text-center">
//                               <h4 className="mb-4 pb-3">Log In</h4>
//                               <form onSubmit={handleLoginSubmit}>
//                                 <div className="form-group">
//                                   <input
//                                     type="email"
//                                     required
//                                     className="form-style"
//                                     placeholder="Email ID"
//                                     name="emailId"
//                                     value={loginData.emailId}
//                                     onChange={handleLoginChange}
//                                   />
//                                   <i className="input-icon uil uil-at"></i>
//                                 </div>
//                                 <div className="form-group mt-2">
//                                   <input
//                                     type="password"
//                                     required
//                                     className="form-style"
//                                     placeholder="Password"
//                                     name="password"
//                                     value={loginData.password}
//                                     onChange={handleLoginChange}
//                                   />
//                                   <p className="mb-0 mt-4 text-center">
//                                     <a href="#" className="link" onClick={handleForgotPasswordClick}>Forgot your password?</a>
//                                   </p>
//                                   <i className="input-icon uil uil-lock-alt"></i>
//                                 </div>
//                                 {loginErrorMessage && (
//                                   <div className="error-message">{loginErrorMessage}</div>
//                                 )}
//                                 <button type="submit" className="btn mt-4">
//                                   {loading ? 'Loading...' : 'Login'}
//                                 </button>
//                               </form>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="card-back">
//                           <div className="center-wrap">
//                             <div className="section text-center">
//                               <h4 className="mb-4 pb-3">Sign Up</h4>
//                               <form onSubmit={handleRegister}>
//                                 <div className="form-group">
//                                   <input
//                                     type="email"
//                                     required
//                                     className="form-style"
//                                     placeholder="Email ID"
//                                     name="emailId"
//                                     value={emailId}
//                                     onChange={handleEmailChange}
//                                     readOnly={isEmailReadOnly}
//                                   />
//                                   <i className="input-icon uil uil-at"></i>
//                                 </div>
//                                 {step === 1 && (
//                                   <OtpComponent
//                                     emailId={emailId}
//                                     setOtp={setOtp}
//                                     setStep={setStep}
//                                     setIsEmailVerified={setIsEmailVerified}
//                                     setIsEmailReadOnly={setIsEmailReadOnly}
//                                   />
//                                 )}
//                                 {step === 2 && (
//                                   <>
//                                     <div className="form-group mt-2">
//                                       <input
//                                         type="text"
//                                         required
//                                         className="form-style"
//                                         placeholder="Full Name"
//                                         name="fullName"
//                                         value={formData.fullName}
//                                         onChange={handleChange}
//                                       />
//                                       <i className="input-icon uil uil-user"></i>
//                                     </div>
//                                     <div className="form-group mt-2">
//                                       <input
//                                         type="text"
//                                         required
//                                         className="form-style"
//                                         placeholder="Phone Number"
//                                         name="phoneNumber"
//                                         value={formData.phoneNumber}
//                                         onChange={handleChange}
//                                       />
//                                       <i className="input-icon uil uil-phone"></i>
//                                     </div>
//                                     <div className="form-group mt-2">
//                                       <input
//                                         type="password"
//                                         required
//                                         className="form-style"
//                                         placeholder="Password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                       />
//                                       <i className="input-icon uil uil-lock-alt"></i>
//                                     </div>
//                                     {errorMessage && (
//                                       <div className="error-message">{errorMessage}</div>
//                                     )}
//                                     <button type="submit" className="btn mt-4">
//                                       {loading ? 'Loading...' : 'Sign Up'}
//                                     </button>
//                                   </>
//                                 )}
//                               </form>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import './login.css';
import OtpComponent from './OtpComponent';
import ForgotPassword from './ForgotPassword';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = ({fetchUser}) => {
  const [step, setStep] = useState(1);
  const [emailId, setEmailId] = useState('');
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    emailId: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(false);

  // Effect to clear loggedInUser from localStorage on component mount
  useEffect(() => {
    localStorage.removeItem('loggedInUser');
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEmailChange = (event) => {
    setEmailId(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const { fullName, phoneNumber, password } = formData;

    if (!fullName || !phoneNumber || !password) {
      setErrorMessage('All fields are required');
      setLoading(false);
      return;
    }
    if (password.length < 6 || password.length > 15) {
      setErrorMessage('Password must be between 6 and 15 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        emailId,
        fullName,
        phoneNumber,
        password,
      });
      alert('User registered successfully');
      setFormData({ fullName: '', phoneNumber: '', password: '' });
      setEmailId('');
      setOtp('');
      setIsEmailVerified(false);
      setIsEmailReadOnly(false);
      setStep(1); // Move to step 1 after registration
    } catch (error) {
      console.error('Error registering user:', error.message);
      setErrorMessage(error.response?.data?.error || 'Error registering user');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginErrorMessage('');
    setLoading(true);

    const { emailId, password } = loginData;

    try {
      const response = await api.post('/api/login', { emailId, password });
      fetchUser();
      setLoginData({ emailId: '', password: '' });
    } catch (error) {
      console.error('Error logging in:', error.message);
      setLoginErrorMessage(error.response.data.error || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };


  const handleForgotPasswordClick = () => {
    setStep(3); // Navigate to ForgotPassword component
  };

  return (
    <div className='loginbody'>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                {step !== 3 && (
                  <>
                    <h6 className="mb-0 pb-3">
                      <span>Log In </span><span>Sign Up</span>
                    </h6>
                    <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                    <label htmlFor="reg-log"></label>
                  </>
                )}
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {step === 3 ? (
                      <ForgotPassword />
                    ) : (
                      <>
                        <div className="card-front">
                          <div className="center-wrap">
                            <div className="section text-center">
                              <h4 className="mb-4 pb-3">Log In</h4>
                              <form onSubmit={handleLoginSubmit}>
                                <div className="form-group">
                                  <input
                                    type="email"
                                    required
                                    className="form-style"
                                    placeholder="Email ID"
                                    name="emailId"
                                    value={loginData.emailId}
                                    onChange={handleLoginChange}
                                  />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input
                                    type="password"
                                    required
                                    className="form-style"
                                    placeholder="Password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                  />
                                  <p className="mb-0 mt-4 text-center">
                                    <a href="#" className="link" onClick={handleForgotPasswordClick}>Forgot your password?</a>
                                  </p>
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                {loginErrorMessage && (
                                  <div className="error-message">{loginErrorMessage}</div>
                                )}
                                <button type="submit" className="btn mt-4">
                                  {loading ? 'Loading...' : 'Login'}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="card-back">
                          <div className="center-wrap">
                            <div className="section text-center">
                              <h4 className="mb-4 pb-3">Sign Up</h4>
                              <form onSubmit={handleRegister}>
                                <div className="form-group">
                                  <input
                                    type="email"
                                    required
                                    className="form-style"
                                    placeholder="Email ID"
                                    name="emailId"
                                    value={emailId}
                                    onChange={handleEmailChange}
                                    readOnly={isEmailReadOnly}
                                  />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                {step === 1 && (
                                  <OtpComponent
                                    emailId={emailId}
                                    setOtp={setOtp}
                                    setStep={setStep}
                                    setIsEmailVerified={setIsEmailVerified}
                                    setIsEmailReadOnly={setIsEmailReadOnly}
                                  />
                                )}
                                {step === 2 && (
                                  <>
                                    <div className="form-group mt-2">
                                      <input
                                        type="text"
                                        required
                                        className="form-style"
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                      />
                                      <i className="input-icon uil uil-user"></i>
                                    </div>
                                    <div className="form-group mt-2">
                                      <input
                                        type="text"
                                        required
                                        className="form-style"
                                        placeholder="Phone Number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                      />
                                      <i className="input-icon uil uil-phone"></i>
                                    </div>
                                    <div className="form-group mt-2">
                                      <input
                                        type="password"
                                        required
                                        className="form-style"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                      />
                                      <i className="input-icon uil uil-lock-alt"></i>
                                    </div>
                                    {errorMessage && (
                                      <div className="error-message">{errorMessage}</div>
                                    )}
                                    <button type="submit" className="btn mt-4">
                                      {loading ? 'Loading...' : 'Sign Up'}
                                    </button>
                                  </>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
