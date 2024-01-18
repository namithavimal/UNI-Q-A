import React from './leftbar.scss'
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Leftbar = () => {

    // Get the Current student user Id

    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/stdAuth/logout");
        navigate("/Login")
      } catch (err) {
        console.log(err.response.data);
      }
    };

    return (
      <div className="leftbar">
        <div className="container">
            <div className="menu">   
            <div className="user">
            {/* <img src="https://ifisa.info/wp-content/uploads/2015/09/QA.jpg" alt="UNI-QA"/> */}
            <PersonIcon/>
            <span>{currentUser.studentName}</span>
            </div>
            <div className="logout"  onClick={handleLogout}>
            <LogoutIcon/>
            <span>Logout</span>
            </div>

            </div>
        </div>
    </div>
    )
  }
  export default Leftbar;
