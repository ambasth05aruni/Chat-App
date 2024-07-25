import { AppBar, Backdrop, Box,  IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

import React, { lazy, Suspense, useState } from 'react'
import { orange } from '../../constants/color'
import {Notifications as NotificationsIcon, Logout as LogoutIcon,Add as AddIcon, Menu as MenuIcon , Search as SearchIcon , Group as GroupIcon} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../constants/config'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userExists, userNotExists } from '../../redux/reducers/auth'
import { setIsMobile, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
 
const SearchDialog = lazy(()=>import('../specific/Search'))
const NotificationsDialog = lazy(()=>import('../specific/Notifications'))
const NewGroupDialog = lazy(()=>import('../specific/NewGroup'))

const Header = () => {

const navigate = useNavigate()
const dispatch =  useDispatch();

const {isSearch,isNotification} = useSelector(state=>state.misc)


const [isNewGroup, setIsNewGroup] = useState(false);




    const handleMobile = () => {
        dispatch(setIsMobile(true))
         
    }
    const openSearch = () => {
        dispatch(setIsSearch(true))
       
    }
    const openNewGroup = () => {
        setIsNewGroup((prev)=>!prev)
    }
    const openNotification = () => {
       dispatch(setIsNotification(true))
    }
    const navigateToGroup = () => {
       navigate('/groups')
    }

    const logOutHandler = async() => {
        // console.log('Logout')
   try {
    const {data} = await axios.get(`${server}/api/v1/user/logout`,{
        withCredentials:true
    })
    dispatch(userNotExists())
    toast.success(data.message)
   } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong")
   }
    }


  return <>
  <Box sx={{flexGrow:1}} height={"4rem"}>
<AppBar position='static' sx={{
    bgcolor:orange
}}>

<Toolbar>
    <Typography
    variant='h6'
    sx={{display:{xs:"none", sm:"block"}}}
    >
     Chat App   
    </Typography>

    <Box sx={{display:{xs:"block", sm:"none"}}}>
<IconButton color='inherit' onClick={handleMobile}><MenuIcon/></IconButton>
    </Box>
<Box sx={{
    flexGrow:1
}}/>

    <Box>
<IconBtn
title={'Search'}
icon={<SearchIcon/>}
onClick={openSearch}

/>
<IconBtn
title={'New Group'}
icon={<AddIcon/>}
onClick={openNewGroup}

/>
<IconBtn
title={'Manage Groups'}
icon={<GroupIcon/>}
onClick={navigateToGroup}

/>

<IconBtn
title={'Notifications'}
icon={<NotificationsIcon/>}
onClick={openNotification}

/>

<IconBtn
title={'Logout'}
icon={<LogoutIcon/>}
onClick={logOutHandler}

/>





    {/* <Tooltip title="Search">
    <IconButton color='inherit' size='large' onClick={openSearchDialog}><SearchIcon/></IconButton>
    </Tooltip> */}

{/* <Tooltip title='New Group'>
<IconButton color='inherit' size='large' onClick={openNewGroup}><AddIcon/></IconButton>
</Tooltip> */}

{/* <Tooltip title="Manage Groups">

<IconButton color='inherit' size='large' onClick={navigateToGroup}><GroupIcon/></IconButton>
</Tooltip> */}

    </Box>
</Toolbar>

</AppBar>

  </Box>


{
    isSearch && (
       <Suspense fallback={<Backdrop open/>}>
         <SearchDialog/>
         </Suspense>
    )
}

{
    isNotification && (
       <Suspense fallback={<Backdrop open/>}>
         <NotificationsDialog/>
         </Suspense>
    )
}

{
    isNewGroup && (
       <Suspense fallback={<Backdrop open/>}>
        <NewGroupDialog/>
         </Suspense>
    )
}
  
  
  
  
  </>
}

const IconBtn =({title, icon, onClick}) =>{
    return (
        <Tooltip title={title}>
        <IconButton color='inherit' size='large' onClick={onClick}>{icon}</IconButton>
        </Tooltip>
    )
}

export default Header