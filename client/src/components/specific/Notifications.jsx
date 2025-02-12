import { Avatar, Button, Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../../constants/SampleData'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'

const Notifications = () => {

const {isNotification} = useSelector((state)=>state.misc)
const dispatch = useDispatch();

const {isLoading, data, error, isError} = useGetNotificationsQuery();

const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler =async({ _id, accept}) => {
    dispatch(setIsNotification(false))
    try {
      const res = await acceptRequest({requestId:_id, accept})

      if(res.data?.success){
        console.log("use socket")
        toast.success(res.data?.message || "Something went wrong")
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong")
      
    }
   
  }

  const closeHandler =()=> dispatch(setIsNotification(false))

  useErrors([{error, isError}])
  return(
   <Dialog open={isNotification} onClose={closeHandler}>
    <Stack p={{xs: "1rem", sm:"2rem"}} maxWidth={"25rem"}>
      <DialogTitle >Notifications</DialogTitle>
      
{
  isLoading ? <Skeleton/> : 
  <>
  {
  data?.allRequests.length > 0 ? (
    data.allRequests?.map(({sender, _id}) => <NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id}/>)
   ) : (
     <Typography textAlign={"center"}>0 Notifications</Typography>
    )}
  </>
}

  </Stack>
  </Dialog>
)}
  
  

   
const NotificationItem =memo(({sender, _id, handler}) =>{
  const {name, avatar} =sender;
  return (
    <ListItem>
    <Stack direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    width={"100%"}
    >
        <Avatar src={avatar}/>
        <Typography 
        variant='body1'
        sx={{flexGrow: 1,
            display:"-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:"100%"
        }}
        
        >
          {`${name} sent you a friend request.`}
        </Typography>

<Stack direction={{
  xs:"column",
  sm:"row"
}}>
  <Button onClick={()=>handler({_id, accept:true})}>Accept</Button>
  <Button color='error' onClick={()=>handler({_id, accept:false})}>Decline</Button>
</Stack>
       

    </Stack>
  </ListItem>
  )
})

export default Notifications