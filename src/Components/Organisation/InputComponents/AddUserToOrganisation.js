import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormComponent from '../../Reusable_Components/FormComponent';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';
import axios from 'axios';

const AddUserToOrganisation = ({ onSubmit }) => {
  const { organisationId } = useParams();
  const id = organisationId.replace(/\D/g, ''); 
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState([]);
  const [organisation, setOrganisation] = useState(null);
  const route = 'addUserToOrganisation';
  const token = localStorage.getItem('token');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
  useEffect(() => {
    // Fetch users and organisation details for the form
    fetchUsers();
    fetchOrganisationDetails();
  }, []);

  const fetchUsers = async () => {
    try {
        // console.log(`${API_DOMAIN}${API_ROUTES.users}`)
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
        // console.log(headers)
      const response = await axios.get(`${API_DOMAIN}${API_ROUTES.users}`, {headers: { Authorization: `Bearer ${token}`},});
      const usersData = response.data;
      console.log(response.data)

      // Set the state with the fetched users
      setUsers(usersData[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchOrganisationDetails = async () => {
    try {
      const response = await axios.get(`${API_DOMAIN}${API_ROUTES.organisations}/${id}`,{headers: { Authorization: `Bearer ${token}`},});
      const organisationData = response.data['organisation'];
      
      // Set the state with the fetched organisation details
      // setOrganisation(organisationData);
    } catch (error) {
      console.error('Error fetching organisation details:', error);
    }
  };
 

  const addUserToOrganisationFields = [
    {
      name: 'user_id',
      label: 'User',
      type: 'select',
      options: users.map((user) => ({ label: user.name, value: user.id })),
    },
    {
      name: 'organisationId',
      label: '',
      type: 'hidden',
      value: id,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Member', value: 'member' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    // Add more fields as needed
  ];

  return (
    <div>
      <h1>Add User to Organisation: {organisation && organisation.name}</h1>
      <FormComponent fields={addUserToOrganisationFields} initialFormData={formData} route={route} />
    </div>
  );
};

export default AddUserToOrganisation;
