import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserID } from '../../utils/DBManagerService';

const Header = () => {
 const userId = getUserID()

 const [acvPage, setAcvPage] = useState('home')

 function onPageChange(pageValue) {
  setAcvPage(pageValue)
 }
 function onLogout(){
  localStorage.clear()
  window.location.href = '/login'
 }
 return (
  <header className='App-header'>
   <h1>Balaraju Gandham</h1>
   <div className='navbar'>
    <ul className='navbar-list'>
     <li onClick={() => { onPageChange('home') }} className={`navbar-item ${acvPage === 'home' ? 'Active' : ''}`}>
      <Link to="/home">Home</Link>
     </li>
     <li onClick={() => { onPageChange('portfolio') }} className={`navbar-item ${acvPage === 'portfolio' ? 'Active' : ''}`}>
      <Link to="/portfolio">Portfolio</Link>
     </li>
     <li onClick={() => { onPageChange('about') }} className={`navbar-item ${acvPage === 'about' ? 'Active' : ''}`}>
      <Link to="/about">About</Link>
     </li>
     <li onClick={() => { onPageChange('contactus') }} className={`navbar-item ${acvPage === 'contactus' ? 'Active' : ''}`}>
      <Link to="/contactus">Contact Us</Link>
     </li>
    </ul>
   </div>
   {
    userId ? (<button className='login-btn'><Link onClick={onLogout}>Logout</Link></button>)
     : (<button className='login-btn'><Link to="/login">Login</Link></button>)
   }
  </header>
 );
}

export default Header;
