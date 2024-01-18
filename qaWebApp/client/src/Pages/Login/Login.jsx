import  './Login.scss'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        studentEmail: "",
        studentPass: "",
      });
      const [err, setErr] = useState(null);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const { login } = useContext(AuthContext);
    
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await login(inputs);
          navigate("/")
        } catch (err) {
          setErr(err.response.data);
        }
      };
  return (
    <div className='Login'>
        <div className="card">
            <div className="left">
                <h1>UNI-Q&A</h1>
                <span>Dont have an account ?</span>
                <Link to="/Register">
                <button>Create Account</button>
                </Link>
            </div>
            <div className="right">
                <h1>Login</h1>
                <form action="onsubmit">
                    <input type="text" placeholder='Email'name="studentEmail" onChange={handleChange} />
                    <input type="password" placeholder='Password' name="studentPass" onChange={handleChange}/>
                    {err && err}
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    
    </div>
  )
}

export default Login