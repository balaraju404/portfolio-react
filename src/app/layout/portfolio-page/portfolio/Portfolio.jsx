import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT_URL } from '../../../utils/constants';

const Portfolio = () => {
 const pageArr = window.location.href.split('/')
 const portfolioId = pageArr[pageArr.length - 1].slice(1);

 const [portfolioData, setPortfolioData] = useState([]);
 // const [loading, setLoading] = useState(true);
 const [editMode, setEditMode] = useState(false)

 const getPortfolio = useCallback(async () => {
  try {
   const params = { portfolio_id: portfolioId };
   const response = await axios.post(`${API_ENDPOINT_URL}portfolio/getAll`, params);
   const data = response.data;
   if (data.status) {
    setPortfolioData(data.data[0]);
   } else {
    alert(data.msg || JSON.stringify(data));
   }
  } catch (error) {
   alert(JSON.stringify(error));
  }
 }, [portfolioId]); 
 
 useEffect(() => {
  getPortfolio();
 }, [getPortfolio]);


 function onEdit() {
  setEditMode(true)
 }
 function onCancel() {
  setEditMode(false)
 }
 return (
  <div className='page-container portfolio primary'>
   <div className='d-flex justify-space-between align-items-center'>
    <p>{portfolioData['portfolio_name']}</p>
    {editMode ? (
     <div className='d-flex gap-2 align-items-center'>
      <button onClick={onCancel}>Cancel</button>
      <button>Save</button>
     </div>) : (<button onClick={onEdit}>Edit</button>)}
   </div>
   <div className='header-content'>
    <h2>{portfolioData['title_header_name']}</h2>
    <div>
     <p>Hello,<br /> My Name is {portfolioData['name']},<br />
      I am a {portfolioData['designation_name']}.
     </p>
    </div>
   </div>
  </div>
 )
}

export default Portfolio