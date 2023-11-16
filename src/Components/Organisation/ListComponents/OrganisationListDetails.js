import React, { useEffect, useState } from 'react';
import ListTemplate from '../../Reusable_Components/ListTemplate';
import axios from 'axios';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';

const OrganisationListDetails = () => {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    // Fetch organisations data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
        const response = await axios.get(`${API_DOMAIN}${API_ROUTES.organisations}`,{headers});
        
        setOrganisations(response.data['organisations']);
      } catch (error) {
        console.error('Error fetching organisations:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs once after the initial render

  const columns = [
    { label: 'Name', value: 'name' },
    {
        label: 'Edit',
        value: (organisationId) => <button onClick={() => handleEdit(organisationId)}>Edit</button>,
      },
  
  ];
  
  const handleEdit = (id) => {
    // Handle edit action
    // alert('Edit Device Type: ' + id);
    
    window.location.href = `/organisation/input/:${id}`
  };

  return (
    <div>
      <h1>Organisation List</h1>
      <ListTemplate columns={columns} onEdit={handleEdit} data={organisations} />
    </div>
  );
};

export default OrganisationListDetails;
