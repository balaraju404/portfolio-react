import React from 'react'

const CreatePortfolio = () => {
 return (
  <div className='page-container'>
   <div>
    <p>CreatePortfolio</p>
    <button>Create</button>
   </div>
   <div>
    <div className='portfolio-header'>
     <input type="text" placeholder='enter title name' name="title_header_name" id="title_header_name" />
    </div>
    <div>
     <div className='portfolio-home'>
      <div>
       <input type="text" placeholder='enter user name' name="user_name" id='' />
       <input type="text" placeholder="enter desgination name" name="" id="" />
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default CreatePortfolio