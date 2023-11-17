import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleItemDetailTemplate from '../../Reusable_Components/SingleItemDetailTemplate';
import OrganisationMembersListDetails from '../ListComponents/OrganisationMembersListDetails';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';
import { useParams } from 'react-router-dom';

const SingleOrganisationDetail = () => {
  const [organisationDetails, setOrganisationDetails] = useState(null);
  const { organisationId } = useParams();
  const id = organisationId.replace(/\D/g, '');
 

  useEffect(() => {
    const fetchOrganisationDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
        const response = await axios.get(`${API_DOMAIN}${API_ROUTES.organisations}/${id}`, {headers: { Authorization: `Bearer ${token}`}});
        const data = response.data; // Assuming your API returns the organization details
       console.log(data)
        setOrganisationDetails(data['organisation']);
      } catch (error) {
        console.error('Error fetching organisation details:', error);
      }
    };

    fetchOrganisationDetails();
  }, [organisationId]);

  const columns = [
    { label: 'Organisation ID', field: 'id' },
    { label: 'Name', field: 'name' },
   
    
    // Add more fields as needed
  ];

  const membersLink = "/organisation/members/"+organisationId;
  const addnewUser = "/add/user/organisation/input/"+organisationId;
  console.log(organisationDetails)
  return (
    <div>
      {organisationDetails ? (
        <div>
          <SingleItemDetailTemplate details={organisationDetails} columns={columns} />
          <a href={membersLink}>Access Member Details</a>
          <a href={addnewUser}>Add new user to organisation</a>
 
        </div>
      ) : (
        <p>Loading organisation details...</p>
      )}
    </div>
  );
};

export default SingleOrganisationDetail;
