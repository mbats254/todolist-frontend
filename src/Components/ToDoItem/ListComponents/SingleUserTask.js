import React, { useEffect, useState } from 'react';
import ListTemplate from '../../Reusable_Components/ListTemplate';
import axios from 'axios';
import { API_DOMAIN, API_ROUTES } from '../../Reusable_Components/apiConfig';
import { useParams } from 'react-router-dom';

const SingleUserTask = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState([]);
  const id = userId.replace(/\D/g, '');

  useEffect(() => {
    // Fetch tasks assigned to the specified user
    const fetchUserTasks = async () => {
      try {
        const token = localStorage.getItem('token');

        
        const response = await axios.post(`${API_DOMAIN}${API_ROUTES.userTasks}`, {user_id: id}, {headers: { Authorization: `Bearer ${token}`}});
        console.log(response.data)
        setTasks(response.data[0]);
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchUserTasks();
  }, [userId]);

  const columns = [
    { label: 'Task Title', value: 'title' },
    { label: 'Description', value: 'description' },
    // { label: 'Due Date', value: 'due_date' },
    // Add more columns as needed based on your task model
  ];

  return (
    <div>
      {tasks ? (
        <div>
      <h1>User Tasks</h1>
      {/* Render ListTemplate with user tasks data and columns */}
      <ListTemplate columns={columns} data={tasks} />
      </div>
      ) : (
        <p>Loading user tasks...</p>
      )}
      
    </div>
  );
};

export default SingleUserTask;
