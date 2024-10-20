import axios from 'axios'
import React, { useState } from 'react'
import { API_ENDPOINT_URL } from '../../../utils/constants'
import { getUserID } from '../../../utils/DBManagerService'

const CreatePortfolio = () => {
 const [postParams, setPostParams] = useState()
 const [headerParams, setHeaderParams] = useState({ 'title_header_name': '', 'name': '', 'designation_name': '' })
 async function onCreate() {
  await setupPostParams()
  console.log(postParams);
  try {
   const response = await axios.post(`${API_ENDPOINT_URL}portfolio/create`, postParams);
   const data = response['data']
   console.log(data);
   if (data['status']) {
    alert(data['msg'])
   } else {
    alert(data['msg'] || JSON.stringify(data))
   }
  } catch (error) {
   alert(JSON.stringify(error))
  }
 }
 async function setupPostParams() {
  let params = {}
  params['user_id'] = getUserID()
  params = { ...params, ...headerParams }
  await setPostParams(params)
  console.log(params);
  
 }
 function onChangeHeader(event) {
  const { name, value } = event.target
  setHeaderParams((prev) => ({ ...prev, [name]: value }))
 }

 return (
  <div className='page-container'>
   <div className='d-flex justify-space-between align-items-center'>
    <p>CreatePortfolio</p>
    <div className='d-flex'>
    <input onChange={onChangeHeader} type="text" name='portfolio_name' id='portfolio_name' placeholder='enter portfolio name' />
    <button onClick={onCreate}>Create</button>
    </div>
   </div>
   <div className='d-flex column'>
    <div className='portfolio-header'>
     <input onChange={onChangeHeader} type="text" placeholder='enter title name' name="title_header_name" id="title_header_name" />
    </div>
    <div>
     <div className='portfolio-home'>
      <div>
       <input onChange={onChangeHeader} type="text" placeholder='enter user name' name="name" id='name' />
       <input onChange={onChangeHeader} type="text" placeholder="enter desgination name" name="designation_name" id="designation_name" />
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default CreatePortfolio