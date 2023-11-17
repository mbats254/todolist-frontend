import React, { useState, useEffect } from 'react';
import FormComponent from '../../Reusable_Components/FormComponent';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemToDoInput = ({ onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [organisations, setOrganisations] = useState([]);
  const route = 'itemToDos';
  const { userId } = useParams();
  const id = userId.replace(/\D/g, '');

  useEffect(() => {
    // Fetch organisations for the select field
    console.log(id)
    fetchOrganisations();

    // Check if editing an existing item to do
    // You can get the item ID from the route or props if available
    // For this example, I'm assuming you have a separate mechanism to determine editing
    setIsEditing(false);

    // Fetch item details if editing
    if (isEditing) {
      // Fetch item details logic goes here
      // Use setFormData to set the initial values for editing
    }
  }, [isEditing]);

  const fetchOrganisations = async () => {
    try {
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
      const response = await axios.get(`${API_DOMAIN}${API_ROUTES.organisations}`,{headers});
      const organisationsData = response.data['organisations'];
        console.log(organisationsData)
      // Set the state with the fetched organisations
      setOrganisations(organisationsData);
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  const itemToDoFields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'user_id', label: '', type: 'hidden', readOnly:true, value:id },
   
    // Add more fields as needed
  ];

  return (
    <div>
      <h1>{isEditing ? 'Edit Item To Do' : 'Create Item To Do'}</h1>
      <FormComponent fields={itemToDoFields} initialFormData={formData} route={route} />
    </div>
  );
};

export default ItemToDoInput;
