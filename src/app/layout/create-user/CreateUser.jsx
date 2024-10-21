import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { API_ENDPOINT_URL } from '../../utils/constants';

const CreateUser = () => {
 const navigate = useNavigate()
 const [formState, setFormState] = useState({ username: '', loginname: '', password: '' });
 const [loading, setLoading] = useState(false);
 const { username, loginname, password } = formState;

 const onChange = (event) => {
  const { name, value } = event.target;
  setFormState((prevState) => ({
   ...prevState,
   [name]: value,
  }));
 };

 const onCreate = async () => {
  if (username.length < 6) {
   return alert('Username must be at least 6 characters long');
  }
  if (loginname.length < 6) {
   return alert('Loginname must be at least 6 characters long');
  }
  if (password.length < 6) {
   return alert('Password must be at least 6 characters long');
  }
  const params = { 'user_name': username, 'login_name': loginname, 'password': password, 'role_id': 2 };
  setLoading(true);
  try {
   const res = await axios.post(`${API_ENDPOINT_URL}user/create`, params);
   const data = res.data;

   if (data.status) {
    alert(data.msg);
    navigate('/login')
   } else {
    alert(data.msg || 'Account Creation failed.');
   }
  } catch (error) {
   const errRes = error.response ? error.response.data : { msg: 'An unexpected error occurred' };
   console.error(errRes);
   alert(errRes.msg || JSON.stringify(errRes));
  } finally {
   setLoading(false);
  }
 };
 return (
  <div className='page-container container-center column'>
   <h1>Create Account</h1>
   <div className='login-content'>
    <input type="text" placeholder="Enter username" name="username" value={username} onChange={onChange} />
    <input type="text" placeholder="Enter loginname" name="loginname" value={loginname} onChange={onChange} />
    <input type="password" placeholder="Enter password" name="password" value={password} onChange={onChange} />
    <button onClick={onCreate} disabled={loading}>
     {loading ? 'Creating...' : 'Create'}
    </button>
    <p>Do You have an Account ? <Link to='/login'>Login</Link></p>
   </div>
  </div>
 );
}

export default CreateUser