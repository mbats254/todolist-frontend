import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterUser from "./Components/Auth/RegisterUser";
import Login from "./Components/Auth/Login";
import OrganisationListDetails from "./Components/Organisation/ListComponents/OrganisationListDetails";
import OrganisationInput from "./Components/Organisation/InputComponents/OrganisationInput";
import ItemToDoInput from "./Components/ToDoItem/InputComponents/ItemToDoInput";
import AddUserToOrganisation from "./Components/Organisation/InputComponents/AddUserToOrganisation";


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
           
          {/* To Do Routes   */}          
          <Route path="/to/do/item/input" element={<ItemToDoInput/>} />
            
         </Routes>
      </BrowserRouter>
   );
};
 
export default App;