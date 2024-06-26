import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard/dashboard';
import BranchCreate from './pages/BranchCreate/BranchCreate';
import UserCreate from './pages/Customer/UserCreate';
import BranchList from './pages/BranchList/BranchList';
import SidebarMenu from './pages/Sidebar/Sidebar';
import Login from './pages/LoginPage/LoginPage';
import ViewProfile from './pages/Customer/ViewProfile';
import EditProfile from './pages/Customer/EditProfile';
import UpdatePassword from './pages/Customer/ChangePassword';
import CreateCustomer from './pages/Customer/CreateCustomer';
import CustomerList from './pages/Customer/CustomerList';
import CreateGoldRate from './pages/addData/addGoldrate';
import { Toaster } from 'react-hot-toast';
import ResetPassword from './pages/LoginPage/ResetPassword';
import UsersList from './pages/Customer/UsersList';

function App() {


const [login, setLogin] = useState(true);

useEffect(() => {
  const token = localStorage.getItem('token');
  if(token){
    setLogin(false);
  }
}
,[])


  return (
    <BrowserRouter>
      <div className="h-[100vh] flex ">
      { login ? 
      (
      <div className='w-full'>
      <Routes>
        <Route path="/" element={<Login setLogin={setLogin}/>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        </Routes> 
      </div>
        ): (
          <> 
          <SidebarMenu />
      <div className='w-full '>
      <div><Toaster/></div>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/branch" element={<BranchList />} />
          <Route path="/branch/create" element={<BranchCreate />} />
          <Route path="/userlist" element={<UsersList/>} />
          <Route path="/allCustomers" element={<CustomerList/>} />
          <Route path="/employee/create" element={<UserCreate />} />
          <Route path="/setting" element={<h1>Setting</h1>} />
          <Route path="/profile" element={<ViewProfile/>} />
          <Route path="/EditProfile" element={<EditProfile/>} />
          <Route path="/UpdatePassword" element={<UpdatePassword/>} />
          <Route path="/createCustomer" element={<CreateCustomer/>} />
          <Route path="addgoldrate" element={<CreateGoldRate/>} />
         


        </Routes>
      </div>
      </>
        )} 
        </div>
    </BrowserRouter>
  );
}

export default App;
