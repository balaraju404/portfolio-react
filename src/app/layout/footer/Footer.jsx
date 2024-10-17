import React from 'react';
import pkg from '../../../../package.json';

const Footer = () => {
 return (
  <footer className="footer">
   <p>All Rights Reserved, 2024 - 2024, Balaraju Gandham</p>
   <p>Version: v{pkg.version}</p>
   <p><a href="/terms" className="footer-link">Terms and Conditions</a></p>
  </footer>
 );
};

export default Footer;
