import React from 'react';
import { getRoleID } from '../../utils/DBManagerService';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
 const roleId = getRoleID();

 return (
  <div className='page-container'>
   <p>Portfolio Page</p>
   <div className='page-content'>
    <div className='sub-navbar'>
     <ul className='sub-navbar-list'>
      {roleId === '1' ? (
       <>
        <li><Link to="/create-templates">Create Templates</Link></li>
        <li><Link to="/create-categories">Create Categories</Link></li>
       </>
      ) : (
       <li><Link to="/create-portfolio">Create Portfolio</Link></li>
      )}
     </ul>
    </div>
   </div>
  </div>
 );
};

export default PortfolioPage;
