import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoSettings } from "react-icons/io5";

const SidebarMenu = () => {
    const [branchManagementExpanded, setBranchManagementExpanded] = useState(false);
    const [customerManagementExpanded, setCustomerManagementExpanded] = useState(false);
    const [userManagementExpanded, setUserManagementExpanded] = useState(false);    
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleBranchManagementExpand = () => {
        setBranchManagementExpanded(!branchManagementExpanded);
    };

    const toggleCustomerManagementExpand = () => {
        setCustomerManagementExpanded(!customerManagementExpanded);
    };

    const toggleUserManagementExpand = () => {
        setUserManagementExpanded(!userManagementExpanded);
    }

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className=' h-[100vh] bg-blue-400 overflow-hidden w-auto'>
            <Sidebar
                collapsed={sidebarCollapsed}
                width={sidebarCollapsed ? 80 : 250} // Adjust the width here
                collapsible
            >
                <Menu>
                    <div className="flex w-full justify-start ml-6 items-center ">
                        <button onClick={toggleSidebar} className="text-black my-1">
                            {sidebarCollapsed ? <MenuRoundedIcon /> : <ChevronLeftRoundedIcon />}
                        </button>
                    </div>
                </Menu>

                <Menu>
                    <MenuItem icon={<GridViewRoundedIcon />}><Link to='/'>Dashboard</Link></MenuItem>
                    <SubMenu
                        label='Branch Management'
                        icon={<BusinessRoundedIcon />}
                        open={branchManagementExpanded}
                        onOpenChange={toggleBranchManagementExpand}
                        rootIconComponent={branchManagementExpanded ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon}
                    >
                        {/* <MenuItem><Link to='/branch/create'>Create Branch</Link></MenuItem> */}
                        <MenuItem><Link to='/branch'>Branch List</Link></MenuItem>   
                    </SubMenu>
                    <SubMenu
                        label='User Management'
                        icon={<AccountCircleRoundedIcon />}
                        open={userManagementExpanded}
                        onOpenChange={toggleUserManagementExpand}
                        rootIconComponent={userManagementExpanded ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon}
                    >
                        <MenuItem><Link to='/employee/create'>Create User</Link></MenuItem>
                        <MenuItem><Link to='/employee'>User List</Link></MenuItem>
                       
                    </SubMenu>

                    <SubMenu
                        label='Customer Management'
                        icon={<PeopleRoundedIcon />}
                        open={customerManagementExpanded}
                        onOpenChange={toggleCustomerManagementExpand}
                        rootIconComponent={customerManagementExpanded ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon}
                    >  
                        <MenuItem><Link to='/employee/create'>Create Customer</Link></MenuItem>
                        <MenuItem><Link to='/employee'>Customer List</Link></MenuItem>
                        
                    </SubMenu>



                    <MenuItem icon={<IoSettings />}><Link to='/setting'>Setting</Link></MenuItem>
                </Menu>
            </Sidebar>
            
        </div>
    );
};

export default SidebarMenu;