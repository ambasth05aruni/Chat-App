import React, { useState } from 'react'
import {Avatar, Button, Container, IconButton, Paper, TextField, Typography, Stack} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VisuallyHiddenInput } from '../components/styles/StyleComponent';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp'
import { usernameValidator } from '../utils/validators';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { userExists } from '../redux/reducers/auth';



const Login = () => {
const [isLogin, setIsLogin] = useState(true);
const toggleLogin =()=> setIsLogin(prev => !prev);


const name = useInputValidation("")
const bio = useInputValidation("")
const userName = useInputValidation("", usernameValidator)
const password = useStrongPassword()
const avatar = useFileHandler("single")

const dispatch = useDispatch()

const handleLogin  = async(e) => {
  e.preventDefault()

  const config ={
    withCredentials :true,
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
 const {data}= await axios.post(
  `${server}/api/v1/user/login`,
   {
      username: userName.value,
      password: password.value,
    },
    config
    )
    dispatch(userExists(true))
    toast.success(data.message)
    
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong")
  }

 }

const handleSignup =async(e) => {
e.preventDefault();

const formData = new FormData();
formData.append("avatar", avatar.file);
formData.append("name", name.value);
formData.append("bio", bio.value);
formData.append("username", userName.value);
formData.append("password", password.value);

const config =  {
    withCredentials:true,
    headers:{
      "Content-Type":"multipart/form-data"
    }

  }
try {
  const {data} = await axios.post(
    `${server}/api/v1/user/new`,
    formData,
    config,
  );
  dispatch(userExists(true))
  toast.success(data.message)
}
     catch (error) {

        toast.error(error?.response?.data?.message || "Something went wrong")
  
}


}

  return (
    <div 
    style={{
      backgroundImage:  "linear-gradient(to right,rgba(173, 83, 137, 1), rgba(60, 16, 83, 1))"

    }}>
    <Container component={"main"} maxWidth='xs' sx={{height: "100vh",display:"flex", justifyContent:"center", alignItems:"center" }}>
      <Paper 
      elevation={3}
       sx={{
        padding:4,
         display:"flex", 
         flexDirection:"column",
        alignItems:"center"
      }}
      >
        {
          isLogin ?  (
            <>
            <Typography variant='h5'>Login</Typography>
            <form style={
              {
                width:"100%",
                marginTop:"1rem"
              }
            }
            
            onSubmit={handleLogin}>
              <TextField 
              required 
              fullWidth
               label="Username"
               margin='normal'
               variant='outlined'
               value={userName.value || "" }
                onChange={userName.changeHandler}
               />

<TextField 
              required 
              fullWidth
               label="Password"
               type='password'
               margin='normal'
               variant='outlined'
              value={password.value || ""}
                onChange={password.changeHandler}
              
               />
               <Button sx={
                 {marginTop: "1rem"}
               } variant="contained" color="primary" type="submit"  fullWidth>
                Login
                </Button>

                <Typography
                textAlign={'center'} m={"1rem"}
                
                >Or</Typography>

                <Button  variant="text"
                color="secondary"
                onClick={toggleLogin}
                fullWidth>
                Sign Up
                </Button>


            </form>
           
          </>
          ):(
            <>
            <Typography variant='h5'>Sign Up</Typography>
            <form style={
              {
                width:"100%",
                marginTop:"1rem",
                
              }
            }
            onSubmit={handleSignup}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar sx={{
                  width: "10rem",
                  height: "10rem",
                  objectFit:"contain"
                }}
                src={avatar.preview }
                />



                <IconButton sx={{
                  position:"absolute",
                  right:0,
                  bottom:0,
                  backgroundColor:"rgba(0,0,0,0.5)",
                  "&:hover":{
                    backgroundColor:"rgba(0,0,0,0.7)",
                  },

                }}
                component="label"
                
                >
                  <>
                  <CameraAltIcon/>
                  <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
                  </>
                </IconButton>

              </Stack>

              {
  avatar.error && (
    <Typography margin={"1rem"}
    width={"fit-content"}
    display={"block"}
    color="error" variant='caption'>{avatar.error}</Typography>
  )
}





<TextField 
              required 
              fullWidth
               label="Name"
               margin='normal'
               variant='outlined'
               value ={name.value}
               onChange={name.changeHandler}

               />

<TextField 
              required 
              fullWidth
               label="Bio"
               margin='normal'
               variant='outlined'
                value={bio.value}
                onChange={bio.changeHandler}
               />

              <TextField 
              required 
              fullWidth
               label="Username"
               margin='normal'
               variant='outlined'
               value={userName.value}
               onChange={userName.changeHandler}
               />

{
  userName.error && (
    <Typography color="error" variant='caption'>{userName.error}</Typography>
  )
}





<TextField 
              required 
              fullWidth
               label="Password"
               type='password'
               margin='normal'
               variant='outlined'
                value={password.value}
                onChange={password.changeHandler}
              
               />

{
  password.error && (
    <Typography color="error" variant='caption'>{password.error}</Typography>
  )
}

               <Button sx={
                 {marginTop: "1rem"}
               } variant="contained" color="primary" type="submit"  fullWidth>
                Sign Up
                </Button>

                <Typography
                textAlign={'center'} m={"1rem"}
                
                >Or</Typography>

                <Button  variant="text"
                color="secondary"
                onClick={toggleLogin}
                fullWidth>
              Log In 
                </Button>


            </form>
           
          </>
           ) }

      </Paper>

    </Container>
    </div>
  )
}

export default Login