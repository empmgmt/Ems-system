import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGooglePlus, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { styles } from "../assets/styles";
import Lottie from "lottie-react";
import ani2 from "../assets/ani2.json";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("Employee"); // Default role
  const [secret, setSecret] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }
  
    const userData = {
      name,
      email,
      password,
      role: userType,
      secret: userType === "Admin" ? secret : undefined,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };
  return (
    <>
      {showSplash && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          display: "flex", justifyContent: "center", alignItems: "center",
          backgroundColor: "#ffffff", zIndex: 1000
        }}>
          <Lottie animationData={ani2} loop={false} style={{ width: "500px", height: "500px" }} />
        </div>
      )}

      {!showSplash && (
        <div style={styles.container}>
          {/* Left Section */}
          <div style={styles.leftContainer}>
            <h1 style={styles.title}>Welcome Back!</h1>
            <p style={styles.subtitle}>To keep connected, please login</p>
            <button onClick={() => navigate("/login")} style={styles.buttons}>SIGN IN</button>
          </div>

          {/* Right Section */}
          <div style={styles.rightContainer}>
            <h1 style={styles.title}>Create Account</h1>
            <div style={styles.socialIcons}>
              <button><FontAwesomeIcon icon={faFacebook} size="3x" color="#3b5998" /></button>
              <button><FontAwesomeIcon icon={faGooglePlus} size="3x" color="#dd4b39" /></button>
              <button><FontAwesomeIcon icon={faLinkedin} size="3x" color="#007bb5" /></button>
            </div>
            <p style={styles.subtitle}>or use your email for registration:</p>

            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
              {/* User Type Selection */}
              <label style={styles.stitle}>Register as</label>
              <div style={styles.radioContainer}>
                <input type="radio" id="employee" name="userType" value="Employee"
                  checked={userType === "Employee"} onChange={() => setUserType("Employee")} />
                <label htmlFor="employee" style={styles.subtitle}>Employee  </label>

                <input type="radio" id="admin" name="userType" value="Admin"
                  checked={userType === "Admin"} onChange={() => setUserType("Admin")} />
                <label htmlFor="admin" style={styles.subtitle}>Admin</label>
              </div>

              {/* Input Fields */}
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />

              {/* Password Field with Toggle Visibility */}
              <div style={{ position: "relative", width: "100%" }}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon} />
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
              </div>

              {/* Secret Code for Admins */}
              {userType === "Admin" && (
                <input type="text" placeholder="Admin Secret Code" value={secret} onChange={(e) => setSecret(e.target.value)} required={userType === "Admin"} style={styles.input} />
              )}

              {/* Submit Button */}
              <button type="button" onClick={handleSignUp} style={styles.button}>SIGN UP</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
