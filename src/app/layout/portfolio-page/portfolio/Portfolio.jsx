import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT_URL } from '../../../utils/constants';

const Portfolio = () => {
 const pageArr = window.location.href.split('/');
 const portfolioId = pageArr[pageArr.length - 1].slice(1);

 const [portfolioData, setPortfolioData] = useState({});
 const [loading, setLoading] = useState(true);
 const [editMode, setEditMode] = useState(false);
 const [headerParams, setHeaderParams] = useState({
  portfolio_name: '',
  title_header_name: '',
  name: '',
  designation_name: '',
 });
 const [error, setError] = useState(null);

 const onChangeHeader = (event) => {
  const { name, value } = event.target;
  setHeaderParams((prev) => ({ ...prev, [name]: value }));
 };

 const getPortfolio = useCallback(async () => {
  setLoading(true);
  try {
   const params = { portfolio_id: portfolioId };
   const response = await axios.post(`${API_ENDPOINT_URL}portfolio/getAll`, params);
   const data = response.data;

   if (data.status) {
    setPortfolioData(data.data[0]);
    setHeaderParams({
     portfolio_name: data.data[0].portfolio_name,
     title_header_name: data.data[0].title_header_name,
     name: data.data[0].name,
     designation_name: data.data[0].designation_name,
    });
   } else {
    setError(data.msg || 'Failed to fetch portfolio data.');
   }
  } catch (error) {
   setError('An error occurred while fetching portfolio data.');
  } finally {
   setLoading(false);
  }
 }, [portfolioId]);

 useEffect(() => {
  getPortfolio();
 }, [getPortfolio]);

 const onEdit = () => {
  setEditMode(true);
 };

 const onCancel = () => {
  setEditMode(false);
  setHeaderParams({
   portfolio_name: portfolioData.portfolio_name,
   title_header_name: portfolioData.title_header_name,
   name: portfolioData.name,
   designation_name: portfolioData.designation_name,
  });
 };

 const onSave = async () => {
  // Implement save functionality
  // Example:
  // await axios.post(`${API_ENDPOINT_URL}portfolio/update`, { ...headerParams, portfolioId });
  setEditMode(false);
 };

 if (loading) {
  return <div>Loading...</div>;
 }

 return (
  <div className='page-container portfolio primary'>
   <div className='d-flex justify-space-between align-items-center'>
    {editMode ? (
     <input
      onChange={onChangeHeader}
      type='text'
      name='portfolio_name'
      value={headerParams.portfolio_name}
     />
    ) : (
     <p>{portfolioData.portfolio_name}</p>
    )}
    {editMode ? (
     <div className='d-flex gap-2 align-items-center'>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave}>Save</button>
     </div>
    ) : (
     <button onClick={onEdit}>Edit</button>
    )}
   </div>
   <div className='header-content'>
    <h2>{portfolioData.title_header_name}</h2>
    <div>
     <p>
      Hello,<br />
      My Name is {portfolioData.name},<br />
      I am a {portfolioData.designation_name}.
     </p>
    </div>
   </div>
   {portfolioData.skills && (
    <div className='skills-content'>
     <h2>Skills</h2>
     <div className='skills-list'>
      {portfolioData.skills.map((skill, index) => (
       <div key={index} className='skill-category'>
        <span className='skill-title'>{skill.skill_title}</span>
        <div className='skills'>
         {skill.skills.map((s, i) => (
          <div key={i} className='skill-item'>
           <span className='skill-name'>{s.skill_name}</span>
           <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${s.percentage}%` }} ></div>
           </div>
           {`${s.percentage}%`}
          </div>
         ))}
        </div>
       </div>
      ))}
     </div>
    </div>
   )}
   {error && <div className='error-message'>{error}</div>} {/* Display any error messages */}
  </div>
 );
};

export default Portfolio;
