export const API_DOMAIN = 'http://127.0.0.1:8000/'; // backend domain

export const API_ROUTES = {
  // Auth
  userRegister: 'api/user/register',
  userLogin: 'api/user/login',
  organisations : 'api/organisations',
  itemToDos: 'api/organisations/todo-items/',
  users: 'api/all/users'



  
  // Add other routes as needed
};

export const getApiEndpoint = (route) => `${API_DOMAIN}${API_ROUTES[route]}`;
