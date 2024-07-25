import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../constants/SampleData';
import { transformImage } from '../../lib/features';


const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName :" table-header",
    width: 90,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName :" table-header",
    width: 150,
    renderCell:(params)=><Avatar alt={params.row.name} src={params.row.avatar}/>
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName :" table-header",
    width: 200,
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName :" table-header",
    width: 200,
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName :" table-header",
    width: 150,
  },
  // {
  //   field: 'createdAt',
  //   headerName: 'Created At',
  //   headerClassName :" table-header",
  //   width: 200,
  // },
  // {
  //   field: 'updatedAt',
  //   headerName: 'Updated At',
  //   headerClassName :" table-header",
  //   width: 200,
  // },
  // {
  //   field: 'action',
  //   headerName: 'Action',
  //   headerClassName :" table-header",
  //   width: 200,
  // },
  
    

];
const UserManage = () => {
  const [rows, setRows] = useState([])

useEffect(()=>{
  setRows(dashboardData.users.map((i)=>({...i,id:i._id, avatar:transformImage(i.avatar,50)})))
},[])

  return (
   <AdminLayout>
   <Table heading={"All Users"} columns={columns} rows={rows}/>
   </AdminLayout>
  )
}

export default UserManage