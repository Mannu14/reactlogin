import { useState } from "react";
import '../styles/login.css';
import axios from 'axios';
 import { useNavigate } from 'react-router-dom';

function Login() {
  const [errorMsg, setAlertMsg] = useState('');

   const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      setAlertMsg('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email,
        password: password
      });
  console.log(response.data.token);
      setAlertMsg(response.data.errorMsg || ''); 
      if (response.status === 201) {
        if(response.data.errorMsg === 'passwordMatch'){
          // navigate('/Profile');
          setAlertMsg('go to Profile'); 
        }
      }
    } catch (error) {
      console.error(error);
      setAlertMsg('Login failed. Please try again.');
    }
  };
  
  return (
    <>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="container" style={{ width: "50vh" }}>
            <h2 className="heading">
              <span>Login</span> Form
            </h2>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            <hr />
            <div className="field">
              <label htmlFor="email">
                Email:
                <input autoFocus type="email" onChange={(e)=> setEmail(e.target.value)} name="email" id="email" placeholder="name123@gmail.com" />
              </label>
              <label htmlFor="password">
                Password:
                <input className="password" type="password" onChange={(e)=> setPassword(e.target.value)} name="password" placeholder="Password *" />
              </label>
              <label htmlFor="submit" className="submit">
              <button type="submit" className="input-submit" style={{ width: "100%" }}>
                Sign in
              </button>
              </label>
            </div>
            <label className="sign-in">
              <input type="radio" /> Remember me
              <span style={{ color: "blue" }}>
                <a href="/">Need help?</a>
              </span>
            </label>
            <hr />
          </div>
          <div className="Create">
            <a href="register">Create an Account</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
