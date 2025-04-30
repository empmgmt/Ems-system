import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGooglePlus, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { styles } from "../assets/styles";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password || !secret) {
      alert("Please fill all required fields");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: "Admin",
      secret,
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
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftContainer}>
        <h1 style={styles.title}>Welcome Back!</h1>
        <p style={styles.subtitle}>To keep connected, please login</p>
        <button onClick={() => navigate("/login")} style={styles.buttons}>
          SIGN IN
        </button>
      </div>

      {/* Right Section */}
      <div style={styles.rightContainer}>
        <h1 style={styles.title}>Create Admin Account</h1>
        <div style={styles.socialIcons}>
          <button>
            <FontAwesomeIcon icon={faFacebook} size="3x" color="#3b5998" />
          </button>
          <button>
            <FontAwesomeIcon icon={faGooglePlus} size="3x" color="#dd4b39" />
          </button>
          <button>
            <FontAwesomeIcon icon={faLinkedin} size="3x" color="#007bb5" />
          </button>
        </div>
        <p style={styles.subtitle}>or use your email for registration:</p>
        <div>
          <h2 style={styles.subtitle2}>Register</h2>
        </div>

        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          {/* Password Field with Toggle Visibility */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            />
          </div>

          {/* Secret Code */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showSecret ? "text" : "password"}
              placeholder="Secret Code"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              style={styles.input}
            />
            <FontAwesomeIcon
              icon={showSecret ? faEyeSlash : faEye}
              onClick={() => setShowSecret(!showSecret)}
              style={styles.eyeIcon}
            />
          </div>

          {/* Submit Button */}
          <button type="button" onClick={handleSignUp} style={styles.button}>
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;