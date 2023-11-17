import React, { useState, useEffect } from 'react';
import ListTemplate from '../../Reusable_Components/ListTemplate';
import axios from 'axios';
import { API_ROUTES, API_DOMAIN } from '../../Reusable_Components/apiConfig';
import { useParams } from 'react-router-dom';

const OrganisationMembersListDetails = ({}) => {
  const { organisationId } = useParams();
  const [members, setMembers] = useState([]);
  const theid = organisationId.replace(/\D/g, '');

  useEffect(() => {
    fetchOrganisationMembers();
  }, [theid]);

  const fetchOrganisationMembers = async () => {
    // console.log(`${API_DOMAIN}${API_ROUTES.organisationMembers}`)
    try {
        const token = localStorage.getItem('token');

        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`  }
       console.log(theid)
      const response = await axios.post(`${API_DOMAIN}${API_ROUTES.organisationMembers}`, {organisation_id: theid}, {headers: { Authorization: `Bearer ${token}`}});
    //    console.log(response.data)
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
    { label: 'Member ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    {
        label: 'Create Task',
        value: (userId) => <button onClick={() => createTask(userId)}>Create Task</button>,
      },
    {
        label: 'View Tasks',
        value: (userId) => <button onClick={() => viewTask(userId)}>View User Tasks</button>,
      },
    // Add more fields as needed
  ];
//   
  const viewTask = (userId) => {
    // Handle edit action
    // alert('Edit Device Type: ' + id);
    
    window.location.href = `/single/user/tasks/:${userId}`
  };
  const createTask = (userId) => {
    // Handle edit action
    // alert('Edit Device Type: ' + id);
    
    window.location.href = `/to/do/item/input/:${userId}`
  };


console.log(members)
  return (
    <div>
      <h1>Organisation Members</h1>
      <ListTemplate data={members} onEdit={createTask} onAccessDetails={viewTask} columns={columns} />
    </div>
  );
};

export default OrganisationMembersListDetails;
