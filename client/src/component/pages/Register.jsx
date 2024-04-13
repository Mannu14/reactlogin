import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [alertMsg, setAlertMsg] = useState('');

  const navigate = useNavigate();

  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [language, setLanguage] = useState();
  const [image, setImage] = useState(null); // Store image as a file object
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation on frontend (optional)
    if (!firstname || !email || !password || !confirmpassword) {
      setAlertMsg('Please fill in all required fields.');
      return;
    }
    if (password !== confirmpassword) {
      setAlertMsg('Passwords do not match.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('language', language);
    if (image) { // Only append image if selected
      formData.append('image', image);
    }
    formData.append('password', password);
    formData.append('confirmpassword', confirmpassword);
    try {
      const response = await axios.post('http://localhost:4000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlertMsg(response.data.alertMsg); // Update message from server
      if(response.data.alertMsg === 'successful registration'){
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setAlertMsg('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-form">
      <div className="container">
        <h2 className="heading">
          <span>Registration</span> Form
        </h2>
        <hr />
        <div className="field">
          <form id="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <p>
              <input type="text" id="firstname" onChange={(e)=> setFirstName(e.target.value)} autoComplete="off" name="firstname" placeholder="First Name Unique*" required />
            </p>
            <p>
              <input type="text" id="lastname" onChange={(e)=> setLastName(e.target.value)} autoComplete="off" name="lastname" placeholder="Last Name" />
            </p>
            <p>
              <input type="email" id="email" onChange={(e)=> setEmail(e.target.value)} autoFocus name="email" placeholder="name123@gmail.com" required />
            </p>
            <p>
              <input type="text" id="phone" onChange={(e)=> setPhone(e.target.value)} autoComplete="off" minLength="10" maxLength="10" name="phone" placeholder="Phone No*" required />
            </p>
            <p>
              <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} accept="image/*" autoComplete="off" name="image" className="mainheading_file_2" required />
            </p>
            <p>
              <input type="text" id="address" onChange={(e)=> setAddress(e.target.value)} autoComplete="off" name="address" placeholder="address where you live *" required />
            </p>
            <p>
              <input type="text" id="language" onChange={(e)=> setLanguage(e.target.value)} autoComplete="off" name="language" placeholder="What is Your language" />
            </p>
            <p>
              <input type="password" id="pswrd_1" onChange={(e)=> setPassword(e.target.value)} name="password" placeholder="Password *" required />
            </p>
            <p>
              <input type="password" id="pswrd_2" onChange={(e)=> setConfirmPassword(e.target.value)} name="confirmpassword" placeholder="Confirm password *" required />
            </p>
            {alertMsg && <p id="alart-msg">{alertMsg}</p>}
            <p className="submit-1">
              <input id="submit-btn" type="submit" value="Register" />
            </p>
          </form>
          <p className="Login">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
