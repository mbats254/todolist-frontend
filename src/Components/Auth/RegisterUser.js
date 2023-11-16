import React, { useState } from 'react';
import FormComponent from '../Reusable_Components/FormComponent';


const RegisterUser = () => {  
  const route = 'userRegister'; 
  const redirectRoute = '/organisation/list'
  const [formData, setFormData] = useState({});

  

  const userFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'c_password', label: 'Confirm Password', type: 'password' },
    { name: 'role', label: 'Role', type: 'text', value:'admin' },
    // Add other fields as needed for user registration
  ];

  return (
    <div>
      <h1>Create User</h1>
      <FormComponent fields={userFields} initialFormData={formData} route={route} redirectRoute={redirectRoute} />
    </div>
  );
};

export default RegisterUser;
