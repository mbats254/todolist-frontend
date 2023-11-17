import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterUser from "./Components/Auth/RegisterUser";
import Login from "./Components/Auth/Login";
import OrganisationListDetails from "./Components/Organisation/ListComponents/OrganisationListDetails";
import OrganisationInput from "./Components/Organisation/InputComponents/OrganisationInput";
import ItemToDoInput from "./Components/ToDoItem/InputComponents/ItemToDoInput";
import AddUserToOrganisation from "./Components/Organisation/InputComponents/AddUserToOrganisation";
import OrganisationMembersListDetails from "./Components/Organisation/ListComponents/OrganisationMembersListDetails";
import SingleOrganisationDetail from "./Components/Organisation/SingleItemDetailsComponents/SingleOrganisationDetail";
import SingleUserTask from "./Components/ToDoItem/ListComponents/SingleUserTask";


const App = () => {
   return (
      <BrowserRouter>
         <Routes>
           
            

         {/* Auth Module Routes    */}
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<RegisterUser/>} />

          {/* Organisation Routes */}
            <Route path="/organisation/list" element={<OrganisationListDetails/>} />
            <Route path="/organisation/input/:organisationId?" element={<OrganisationInput/>} />
            <Route path="/add/user/organisation/input/:organisationId" element={<AddUserToOrganisation/>} />
            <Route path="/organisation/members/:organisationId" element={<OrganisationMembersListDetails/>} />
            <Route path="/single/organisation/:organisationId" element={<SingleOrganisationDetail/>} />
           
          {/* To Do Routes   */}          
          <Route path="/to/do/item/input/:userId" element={<ItemToDoInput/>} />
          <Route path="/single/user/tasks/:userId" element={<SingleUserTask/>} />
            
         </Routes>
      </BrowserRouter>
   );
};
 
export default App;