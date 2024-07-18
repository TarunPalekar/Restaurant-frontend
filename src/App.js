import RestaurantInterface from "./screens/restaurant/restaurantInterface";

import DisplayAllRestaurant from "./screens/restaurant/DisplayAllRestaurant";
import CatagoryInterface from "./screens/restaurant/catagory";
import DisplayAllCatagory from "./screens/restaurant/DisplayAllCatagory";
import SubCatagoryInterface from "./screens/restaurant/subcatagory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisplaySubCatagory from "./screens/restaurant/DisplaySubCatagory";
import TableBooking from "./screens/restaurant/tablebooking";
import DisplayTableBook from "./screens/restaurant/DisplayTableBook";
import LoginPage from "./screens/superadmin/loginpage";
import Dashboard from "./screens/superadmin/dashboard";
import Adminlogin from "./adminlogin/adminlogin";
import AdminDashboard from "./adminlogin/admindashboard";
import FoodBooking from "./screens/FoodBooking/FoodBooking";
import Reports from "./components/Report/Reports";

function App() {
   return (<div>
      <Router>
         <Routes>
          
            <Route element={<LoginPage/>} path='/' />
            <Route element={<Adminlogin/>} path='/adminlogin' />
           
            <Route element={<AdminDashboard/>} path='/admindashboard/*' />
            
            <Route element={<Dashboard/>} path='/dashboard/*' />
            <Route element={<FoodBooking/>} path='/foodbooking'/>
            <Route element={<Reports/>} path='/report'/>
            
            

         </Routes>
      </Router>
   </div>)

}

export default App;
