import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT_URL, LS_USER_DATA_KEY } from '../../utils/constants';

const Login = () => {
 const [formState, setFormState] = useState({ username: '', password: '' });
 const [loading, setLoading] = useState(false);
 const { username, password } = formState;

 const onChange = (event) => {
  const { name, value } = event.target;
  setFormState((prevState) => ({
   ...prevState,
   [name]: value,
  }));
 };

 const onLogin = async () => {
  const params = { 'login_name': username, 'login_password': password };
  setLoading(true);
  try {
   const res = await axios.post(`${API_ENDPOINT_URL}login/check`, params);
   const data = res.data;

   if (data.status) {
    localStorage.setItem(LS_USER_DATA_KEY, JSON.stringify(data.data));
    alert(data.msg);
   } else {
    alert(data.msg || 'Login failed.');
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
  <div className='page-container'>
   <h1>Login</h1>
   <div className='login-content'>
    <input
     type="text"
     placeholder="Enter username"
     name="username"
     value={username}
     onChange={onChange}
    />
    <input
     type="password"
     placeholder="Enter password"
     name="password"
     value={password}
     onChange={onChange}
    />
    <button onClick={onLogin} disabled={loading}>
     {loading ? 'Logging in...' : 'Login'}
    </button>
   </div>
  </div>
 );

};

export default Login;
