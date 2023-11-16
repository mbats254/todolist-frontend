import React, { useState, useEffect } from 'react';
import FormComponent from '../../Reusable_Components/FormComponent';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrganisationInput = ({ onSubmit }) => {
  const { organisationId = '' } = useParams();
  const id = organisationId.replace(/\D/g, '');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const route = 'organisations';

  useEffect(() => {
    if (organisationId) {
      setIsEditing(true);
      fetchOrganisationDetails();
    }
  }, [organisationId]);

  const fetchOrganisationDetails = async () => {
    try {

        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
        
      const response = await axios.get(`${API_DOMAIN}${API_ROUTES.organisations}/${id}`,{headers});
     
      const organisationDetails = response.data;
      setFormData(organisationDetails['organisation']);
    } catch (error) {
      console.error('Error fetching organisation details:', error);
    }
  };

  const organisationFields = [
    { name: 'name', label: 'Organisation Name', type: 'text' },
    // Add more fields as needed
  ];
console.log(formData)
  return (
    <div>
      <h1>{isEditing ? 'Edit Organisation Details' : 'Create Organisation'}</h1>
      <FormComponent fields={organisationFields} initialFormData={formData} route={route} />
    </div>
  );
};

export default OrganisationInput;
