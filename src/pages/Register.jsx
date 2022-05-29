import React, { useState } from 'react';
import '../scss/Register.scss';
import axios from 'axios';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  let navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: ''
  });
 
  const handleChange = (event) => {
    const {name, value} = event.target;
    setUserDetails((prevState) => {
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

  const validate = (userDetails) => {
    if(userDetails.name.length < 3) {
      $("#error_text").text('Isim minimum 3 isaretden ibaret olmalidir!');
      return false;
    }

    if(userDetails.email === "") {
      $("#error_text").text('Email adresi daxil olunmayib!');
      return false;
    }

    if(!validateEmail(userDetails.email)) {
      $("#error_text").text('Email adresi duzgun deyil');
      return false;
    }

    if(userDetails.password.length === 0 || userDetails.checkPassword.length === 0) {
      $("#error_text").text('Sifre qeyd olunmayib!');
      return false;
    }

    if(userDetails.password.length < 6) {
      $("#error_text").text('sifre minimum 6 isareden ibaret olmalidir!');
      return false;
    }

    if(userDetails.password !== userDetails.checkPassword) {
      $('#error_text').text('Sifreler uygun gelmir!');
      return false;
    }
    return true;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const User = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password
    }
    
    if(validate(userDetails)) {
        const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, User)
        .then(res => res.data)
        .catch((err) => {
          if(err.response.data.error.errors.name && err.response.data.error.errors.email) {
            $("#error_text").text('Isim ve Email artiq istifade olunur');
            console.log(token.error);
          } else if(err.response.data.error.errors.name) {
            $("#error_text").text('Isim artiq istifade olunur');
          } else {
            $("#error_text").text('Email artiq istifade olunur');
          }
        })
        if(token.user) {
          $("#error_text").text('Qeydiyyat oldunuz!').css('color', 'green');
          setTimeout(() => {
            navigate('/addTodo');
            localStorage.setItem('user', token.user);
          }, 1000)
        }
    }
  }

  return (
    <div className='register_container'>
      <div className="form-wrapper">
        <form action="">
          <h2>Sign Up</h2>
          <span id='error_text' style={{color: 'red'}}></span>
          <div className="full_name  form_single_item">
            <input
            name='name'
            type="name"
            id='full_name'
            placeholder='Full Name'
            value={userDetails.name}
            required
            maxLength={20}
            onChange={handleChange}
            />
          </div>
          <div className="email_address form_single_item">
            <input
            name='email'
            type="email"
            id='email'
            placeholder='Email Address'
            value={userDetails.email}
            required
            onChange={handleChange}
            />
          </div>
          <div className="password form_single_item">
            <input
            name='password'
            type="password"
            id='password'
            value={userDetails.password}
            placeholder='Create Password'
            required
            onChange={handleChange}
            />
          </div>
          <div className="password form_single_item">
            <input
            name='checkPassword'
            type="password"
            id='password_repeat'
            value={userDetails.checkPassword}
            placeholder='Repeat Password'
            required
            onChange={handleChange}
            />
          </div>
          <div className="form_button">
            <button type='button' onClick={submitHandler}>Create Account</button>
          </div>
          <p>Already have an account <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register