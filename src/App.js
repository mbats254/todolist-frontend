import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterUser from "./Components/Auth/RegisterUser";
import Login from "./Components/Auth/Login";
import OrganisationListDetails from "./Components/Organisation/ListComponents/OrganisationListDetails";


const App = () => {
   return (
      <BrowserRouter>
         <Routes>
           
            

         {/* Auth Module Routes    */}
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<RegisterUser/>} />

          {/* Organisation Routes */}
            <Route path="/organisation/list" element={<OrganisationListDetails/>} />
           
                  
        
            
         </Routes>
      </BrowserRouter>
   );
};
 
export default App;