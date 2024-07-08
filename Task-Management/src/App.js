import "./App.css";
import {Navigate,Route,Routes} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Trash from "./pages/Trash";
import Signup from "./pages/Signup";
function App() {
  return (
   <div className="w-screen min-h-screen  ">
   <Routes>
     <Route element={<Layout/>}>
       <Route index path='/' element={<Navigate to='/dashboard' />} />
       <Route path='/dashboard' element={<Dashboard />} />
       <Route path='/team' element={<Users />} />
       <Route path='/tasks' element={<Tasks />} />
       <Route path='/completed/:status' element={<Tasks />} />
       <Route path='/in-progress/:status' element={<Tasks />} />
       <Route path='/todo/:status' element={<Tasks />} />
       <Route path='/task/:id' element={<TaskDetails />} /> 
       <Route path='/trashed' element={<Trash />} />
       
       <Route path='/profile' element={<Profile/>}/>
     </Route>
       <Route path="/log-in"  element={<Login/>}/>
       <Route path="/sign-in" element={<Signup/>}/>
   </Routes>
   </div>
  );
}

export default App;
