import { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [inputs,setInputs]= useState({
    studentId :"",
    studentEmail : "",
    studentName : "",
    studentPass : ""

  });
  const navigate = useNavigate()

  const [err, setError] = useState(false);

  const handleChange = (e) => {
    setInputs((prev)=> ({...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/stdAuth/register", inputs);
      navigate("/Login")
    } catch (err) {
      setError(err.response.data);
    }
  };

  console.log(inputs)
  return (
    <div className="register">
      <div className="card">
        <div className="left">
        <h1>UNI-Q&A</h1>
          <span>Do you have an account?</span>
          <Link to="/Login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Student Id" name="studentId" onChange={handleChange} />
            <input type="email" placeholder="Email" name="studentEmail" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="studentName" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="studentPass" onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;