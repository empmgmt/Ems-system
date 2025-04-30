import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const authContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("https://ems-system-z6m1.onrender.com/api/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

export { useAuth };
export default authContext;
