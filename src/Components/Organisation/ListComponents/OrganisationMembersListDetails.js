import React, { useState, useEffect } from 'react';
import ListTemplate from '../../Reusable_Components/ListTemplate';
import axios from 'axios';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';
import { useParams } from 'react-router-dom';

const OrganisationMembersListDetails = () => {
  const { organisationId } = useParams();
  const [members, setMembers] = useState([]);
  const id = organisationId.replace(/\D/g, '');

  useEffect(() => {
    fetchOrganisationMembers();
  }, [organisationId]);

  const fetchOrganisationMembers = async () => {
    try {
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
        
      const response = await axios.post(`${API_DOMAIN}${API_ROUTES.organisationMembers}`, {organisationId: id}, {headers: { Authorization: `Bearer ${token}`}},);

      const membersData = response.data[0];
      console.log(membersData)

      // Set the state with the fetched members
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching organisation members:', error);
    }
  };

  // Define the columns for the ListTemplate
  const columns = [
    { label: 'Member ID', field: 'id' },
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' },
    // Add more fields as needed
  ];
console.log(members)
  return (
    <div>
      <h1>Organisation Members</h1>
      <ListTemplate data={members} columns={columns} />
    </div>
  );
};

export default OrganisationMembersListDetails;
