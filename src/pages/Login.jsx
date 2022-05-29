import React, { useState } from 'react';
import '../scss/Login.scss';
import axios from 'axios';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        [name]:value
      }
    })
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validate = (userInfo) => {
    if(!validateEmail(userInfo.email)) {
      $("#error_text").text('Email adresi duzgun deyil');
      return false;
    }

    if(userInfo.password.length < 6) {
      $("#error_text").text('sifre minimum 6 isareden ibaret olmalidir!');
      return false;
    }
    return true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if(validate(userInfo)) {
      const User = {
        email: userInfo.email,
        password: userInfo.password
      }
      const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, User)
      .then(res => res.data);
      if(token.user) {
        $("#error_text").text('Giris etdiniz!').css('color', 'green');
          setTimeout(() => {
            navigate('/addTodo');
            localStorage.setItem('user', token.user);
          }, 1000)
      } else {
        $("#error_text").text(`${token.alert.msg}`);
      }
    }
  }

  return (
    <div className='login_container'>
      <div className="form-wrapper">
        <form action="">
          <h2>Sign In</h2>

          <span id='error_text' style={{color: 'red'}}></span>
          <div className="email_address form_single_item">
            <input
            name='email'
            type="email"
            id='email'
            placeholder='Email Address'
            value={userInfo.email}
            required
            onChange={handleChange}
            />
          </div>
          <div className="password form_single_item">
            <input
            name='password'
            type="password"
            id='password'
            value={userInfo.password}
            placeholder='Create Password'
            required
            onChange={handleChange}
            />
          </div>
          <div className="form_button">
            <button type='button' onClick={submitHandler}>Sign In</button>
          </div>
          <p>Don't have an account yet <Link to="/register">Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login