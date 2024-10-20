import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserID, getUserName } from '../../utils/DBManagerService';

const Header = () => {
 const navigate = useNavigate()
 const userId = getUserID()
 const curPage = window.location.href.split('/')[3]
 const [acvPage, setAcvPage] = useState(curPage)

 function onPageChange(pageValue) {
  setAcvPage(pageValue)
  navigate('/' + pageValue)
 }
 function onLogout() {
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
    userId ? ('') : ('')
   }
   {
    userId ? (<div className='d-flex justify-space-between align-items-center gap-2'>
     <p>{getUserName()}</p>
     <button className='login-btn'><Link onClick={onLogout}>Logout</Link></button>
    </div>)
     : (<button className='login-btn'><Link to="/login">Login</Link></button>)
   }
  </header>
 );
}

export default Header;
