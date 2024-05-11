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
import { CgProfile } from 'react-icons/cg';

const SidebarMenu = () => {
    const [branchManagementExpanded, setBranchManagementExpanded] = useState(false);
    const [customerManagementExpanded, setCustomerManagementExpanded] = useState(false);
    const [userManagementExpanded, setUserManagementExpanded] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [ProfileExpanded, setProfileExpanded] = useState(false);


    const toggleBranchManagementExpand = () => {
        setBranchManagementExpanded(!branchManagementExpanded);
    };

    const toggleCustomerManagementExpand = () => {
        setCustomerManagementExpanded(!customerManagementExpanded);
    };



    const toggleUserManagementExpand = () => {
        setUserManagementExpanded(!userManagementExpanded);
    }

    const toggleProfileExpand = () => {
        setProfileExpanded(!ProfileExpanded);
    }

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className=' h-[100vh]  overflow-hidden  '>
            <Sidebar
                collapsed={sidebarCollapsed}
                width='300px'
                collapsedWidth='80px'
                className=' h-full '


                backgroundColor='#007FFF'

                collapsible
            >
                <Menu

                    className='pt-10'
                >
                    <div className="flex w-full justify-start ml-6 items-center ">
                        <button onClick={toggleSidebar} className="text-black bg-blue-100 my-1 rounded-sm">
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
                        <MenuItem><Link to='/branch/create'>Create Branch</Link></MenuItem>
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
                        <MenuItem><Link to='/userlist'>User List</Link></MenuItem>

                    </SubMenu>

                    <SubMenu
                        label='Customer Management'
                        icon={<PeopleRoundedIcon />}
                        open={customerManagementExpanded}
                        onOpenChange={toggleCustomerManagementExpand}
                        rootIconComponent={customerManagementExpanded ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon}
                    >
                        <MenuItem><Link to='/createCustomer'>Create Customer</Link></MenuItem>
                        <MenuItem><Link to='/customerlist'>Customer List</Link></MenuItem>

                    </SubMenu>

                    <SubMenu
                        label='My Account'
                        icon={<CgProfile size={25}/>}
                        open={ProfileExpanded}
                        onOpenChange={toggleProfileExpand}
                        rootIconComponent={ProfileExpanded ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon}
                    >
                        <MenuItem><Link to='/profile'>View Profile</Link></MenuItem>
                        <MenuItem><Link to='/editProfile'>Update Profile</Link></MenuItem>
                        <MenuItem><Link to='/updatePassword'>Change Password</Link></MenuItem>
                        <MenuItem><a onClick={()=>{
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href='/'
                        }}>Log Out</a></MenuItem>

                    </SubMenu>



                 
                </Menu>
            </Sidebar>

        </div>
    );
};

export default SidebarMenu;