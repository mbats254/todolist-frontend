import React, { useState } from 'react';
import FormComponent from '../Reusable_Components/FormComponent';

const LoginComponent = () => {
  
  const route = 'userLogin'; 
  const [formData, setFormData] = useState({});
  const redirectRoute = '/organisation/list'
 

  const loginFields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    

  ];

  return (
    <div>
      <h1>Login</h1>
      <FormComponent fields={loginFields} initialFormData={formData} route={route} redirectRoute={redirectRoute}/>
      <a href="/register">Register User</a> 
    </div>
  );
};

export default LoginComponent;
