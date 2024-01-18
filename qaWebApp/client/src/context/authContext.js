import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8080/api/stdAuth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };
  const logout = async () => {

    await axios.post("http://localhost:8080/api/stdAuth/logout");
    console.log("logout2")
    setCurrentUser(null);

  };


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};