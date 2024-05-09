import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard/dashboard';
import BranchCreate from './pages/BranchCreate/BranchCreate';
import UserCreate from './pages/Customer/UserCreate';
import BranchList from './pages/BranchList/BranchList';
import BranchData from './components/BranchData/BranchData';
import SidebarMenu from './pages/Sidebar/Sidebar';
import UserList from './pages/Customer/UserList';
import Login from './pages/LoginPage/LoginPage';

function App() {


const [login, setLogin] = useState(true);

useEffect(() => {
  const token = sessionStorage.getItem('token');
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
        </Routes> 
      </div>
        ): (
          <> 
          <SidebarMenu />
      <div className='w-full '>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/branch" element={<BranchList />} />
          <Route path="/branch/create" element={<BranchCreate />} />
          <Route path="/employee" element={<UserList/>} />
          <Route path="/employee/create" element={<UserCreate />} />
          <Route path="/setting" element={<h1>Setting</h1>} />
        </Routes>
      </div>
      </>
        )} 
        </div>
    </BrowserRouter>
  );
}

export default App;
