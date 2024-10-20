import React, { useEffect, useId, useState } from 'react';
import axios from 'axios'; // Add axios import
import { getRoleID, getUserID } from '../../utils/DBManagerService';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINT_URL } from '../../utils/constants';
import img from '../../assets/images/portfolio.png'

const PortfolioPage = () => {
 const navigate = useNavigate()
 const roleId = getRoleID();
 const [portfoliosData, setPortfoliosData] = useState([]);
 const [myPortfoliosData, setMyPortfoliosData] = useState([]);

 const getPortfolios = async () => {
  try {
   const response = await axios.post(`${API_ENDPOINT_URL}portfolio/getAll`, {});
   const data = response.data;
   console.log(data);
   if (data.status) {
    setPortfoliosData(data.data);
    console.log(data.data, getUserID());

    const myPortfolios = data.data.filter(item => item['user_id'] === getUserID());
    setMyPortfoliosData(myPortfolios);
   } else {
    alert(data.msg || JSON.stringify(data));
   }
  } catch (error) {
   alert(JSON.stringify(error));
  }
 };

 useEffect(() => {
  getPortfolios(); // Call the function to fetch portfolios
 }, []);

 function onNavigate(id) {
  navigate('/portfolio/:' + id)
 }

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
      ) : roleId === 2 ? (
       <li><Link to="/create-portfolio">Create Portfolio</Link></li>
      ) : null}
     </ul>
    </div>
    <div>
     {myPortfoliosData.length > 0 ? (
      <div>
       <h6>My Portfolios:</h6>
       <div className='portfolio-list' >
        {myPortfoliosData.map((item, index) => (
         <div key={index} className='portfolio-card' onClick={() => { onNavigate(item['_id']) }}>
          <img src={item.img || img} alt="Portfolio img" /> {/* Corrected this line */}
          <h6 className='text-center'>{item['portfolio_name'] || 'Name not available'}</h6>
          <p>{item.description || ''}</p>
         </div>
        ))}
       </div>
      </div>
     ) : (
      <p>No data found</p>
     )}
    </div>
    <div>
     {portfoliosData.length > 0 ? (
      <div>
       <h6>Portfolios:</h6>
       <div className='portfolio-list'>
        {myPortfoliosData.map((item, index) => (
         <div key={index} className='portfolio-card'>
          <img src={item.img || img} alt="Portfolio img" /> {/* Corrected this line */}
          <h6 className='text-center'>{item['portfolio_name'] || 'Name not available'}</h6>
         </div>
        ))}
       </div>
      </div>
     ) : (
      <p>No data found</p>
     )}
    </div>
   </div>
  </div>
 );
};

export default PortfolioPage;
