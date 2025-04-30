import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGooglePlus, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; 
import { styles } from '../assets/styles2';  
import Lottie from 'lottie-react';  // Make sure Lottie is installed
import ani2 from '../assets/ani2.json';  // Your splash screen animation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();  
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);  // Hide splash after 3-5 seconds
    }, 3000); // 3 seconds delay
    return () => clearTimeout(timer);  // Cleanup timer on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server error");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFacebookClick = () => {
    alert('Facebook button clicked!');
  };

  const handleGooglePlusClick = () => {
    alert('Google+ button clicked!');
  };

  const handleLinkedinClick = () => {
    alert('LinkedIn button clicked!');
  };

  // Show splash screen if showSplash is true
  if (showSplash) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          zIndex: 1000,
        }}
      >
        <Lottie animationData={ani2} loop={false} style={{ width: 500, height: 500 }} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Right Section (formerly left) */}
      <div style={styles.rightContainer}>
        <div style={styles.backgroundPattern}></div>
        <h1 style={styles.title}>New Here?</h1>
        <p style={{ fontSize: '2.2rem', fontWeight: '600', zIndex: 1, marginBottom: '10px' }}>Demo Login</p>
<p style={{ fontSize: '1.5rem', lineHeight: '1.8', zIndex: 1 }}>
  <strong>Email:</strong> demo@gmail.com<br />
  <strong>Password:</strong> demo
</p>

        <button onClick={() => navigate('/register')} style={styles.buttons}>SIGN Up</button>
      </div>

      {/* Left Section (formerly right) */}
      <div style={styles.leftContainer}>
        <h1 style={styles.title}>Login to Your Account</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={styles.subtitle}>Login using social network</p>
        <div style={styles.socialIcons}>
          <button onClick={handleFacebookClick}> 
            <FontAwesomeIcon icon={faFacebook} size="2x" color="#3b5998" />
          </button>
          <button onClick={handleGooglePlusClick}> 
            <FontAwesomeIcon icon={faGooglePlus} size="2x" color="#dd4b39" />
          </button>
          <button onClick={handleLinkedinClick}> 
            <FontAwesomeIcon icon={faLinkedin} size="2x" color="#007bb5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              style={styles.eyeIcon}
            />
             <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
           
          </div>

          <div>
            <button
              type="submit"
              style={styles.button}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;