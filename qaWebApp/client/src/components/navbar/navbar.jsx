import React from './navbar.scss'
import { Link, useNavigate} from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useState} from "react";
import { AuthContext } from "../../context/authContext";
import { useSearch } from "../../context/searchContext";
import axios from "axios";

const Navbar = () => {

  // Get the Current student user Id

  const {currentUser} = useContext(AuthContext)
  const { searchTerm, setSearchTerm } = useSearch();

  const navigate = useNavigate();
  const { logout} = useContext(AuthContext);

  const handleLogout = async (e) => {

    e.preventDefault();

    try {
      // await axios.post("http://localhost:8080/api/stdAuth/logout");
      await logout();

      navigate("/Login")
    } catch (err) {
      console.log(err.response.data);
    }
  };


  return (
    <div className='navbar'>
        <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
            <img src="https://ifisa.info/wp-content/uploads/2015/09/QA.jpg" alt="UNI-QA"/>
        </Link>
            <span>UNI-Q&A</span>
            <div className="search">
                <SearchOutlinedIcon />
                <input type="text" placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
      </div>
    <div className="right">
      {/* <Link to="/Profile/:{currentUser.studentId}" style={{ textDecoration: "none" }}>
        <AccountBoxOutlinedIcon />
        </Link> */}
        <div className="user">
        <Link to={`/Profile/${currentUser.studentId}`} style={{ textDecoration: "none" }}>
          <img src={currentUser.profilePic} alt="CurrentUser" />
        </Link>
        <span>{currentUser.studentName}</span>
       
        </div>
        <div className="logout" onClick={handleLogout}>
            <LogoutIcon/>
            <span>Logout</span>
        </div>
      </div>
    </div>
  )
}
export default Navbar;