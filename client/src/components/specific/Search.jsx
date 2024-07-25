import { useInputValidation } from '6pp'
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import  {sampleUsers}  from '../../constants/SampleData'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'

import { useAsyncMutation } from '../../hooks/hooks'

// const users =[1,2,3]

const Search = () => {

  const {isSearch} = useSelector(state=>state.misc)

  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation)

  const dispatch = useDispatch();

const search = useInputValidation("")

const [users,setUsers] = useState([])


const addFriendHandler = async(id) => {
  // console.log(id)
  sendFriendRequest("Sending friend request..", {userId: id})

}

const searchCloseHandler =()=>{
dispatch(setIsSearch(false))
}

useEffect (() => {
  const timeOutId = setTimeout(()=>{
    searchUser(search.value)
    .then(({data})=>setUsers(data.users))
    .catch((err)=>console.log(err))
  },1000)
  return ()=>{
    clearTimeout(timeOutId)
  
  }
  

}, [search.value])


  return (
      <Dialog open={isSearch} onClose={searchCloseHandler}>
    <Stack p={"2rem"} direction={"column"} width={"25rem"} >
      <DialogTitle textAlign={"center"}>Find People</DialogTitle>
<TextField
 label="" value={search.value} onChange={search.changeHandler}
variant='outlined'
size='small'
InputProps={{
  startAdornment: (
    <InputAdornment position='start'>
    <SearchIcon/>
    </InputAdornment>
  ),
}}
/>

<List>
 {
    users.map((i)=>(
      <UserItem user={i}
      key={i._id}
      handler={addFriendHandler}
      handlerIsLoading={isLoadingSendFriendRequest}
      /> 
      // <ListItem>
      //   <ListItemText/>
      // </ListItem>
    ))
  }

</List>
    </Stack>


  </Dialog>
  )
}

export default Search