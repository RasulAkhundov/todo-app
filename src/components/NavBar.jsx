import React from 'react';
import '../scss/Navbar.scss'
import { Link } from 'react-router-dom';

const NavBar = () => {
  
  const userMe = window.localStorage.getItem('user');

  const logOutFunction = () => {
    if(userMe) {
      window.localStorage.removeItem('user');
      console.log('fwefe')
    }
  }

  return (
    <div className='navbar'>
        <div className="container">
          <Link to={'/'}>
            <div className="logo d-flex">
              <h3>To</h3>
              <h3 style={{color: '#6F9B95'}}>Do</h3>
            </div>
          </Link>
        <div className="navigation">
            <Link to="/">Home</Link>
            <Link to="/login"><button type='button' id='navbar_btn' onClick={logOutFunction}>
              {userMe ? 'Log Out' : 'Sign in'}
            </button></Link>
        </div>
        </div>
    </div>
  )
}

export default NavBar