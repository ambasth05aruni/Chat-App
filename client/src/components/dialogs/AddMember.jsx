import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/SampleData'
import UserItem from '../shared/UserItem'

const AddMember = ({addMember, isLoadingAddMember, chatId}) => {

    const [members, setMembers] = useState(sampleUsers)
const [selectedMembers, setSelectedMembers] = useState([])

  const selectMemberHandler = (id) => {

    // setMembers(prev => prev.map(user=>user._id===id? {...user, isAdded:!user.isAdded} : user))
    setSelectedMembers(prev=> prev.includes(id) ?prev.filter((currElement)=> currElement !== id):[...prev, id])
   

  }
    // const addfriendHandler = (id) => {
    //     console.log(id, chatId)
    // }
    const addMemberSubmitHandler = () => {
       closeHandler()
    }
    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([])
       
    }
  return (
   <Dialog open onClose={closeHandler}>
    <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
            {
            members.length > 0 ? ( 
                 members.map((i)=>(
                    <UserItem key={i._id} user={i} handler={selectMemberHandler}
                    isAdded={
                        selectedMembers.includes(i._id)
                    }
                    />

                ))
            ) :(
                <Typography textAlign={"center"}>No friends</Typography>

           ) }
        </Stack>
        <Stack onClick={closeHandler} direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
        <Button color='error'>Cancel</Button>
        <Button onClick={addMemberSubmitHandler}  variant='contained' disabled={isLoadingAddMember}>Submit</Button>
        </Stack>
        
    </Stack>

   </Dialog>
  )
}

export default AddMember