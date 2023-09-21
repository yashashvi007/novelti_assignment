import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Form from '../../components/Form/Form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Users() {
  const [users , setUsers]  = useState([])
  const [user , setUser] = useState('')
  const [toggleRefresh ,setToggleRefresh] = useState(false)
  const [editIndex , setEditIndex] = useState(null)
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(()=> {
    if(!localStorage.getItem('users')){
      setUsers([])
    }else {
      setUsers(JSON.parse(localStorage.getItem('users'))) 
    }
  } ,[toggleRefresh])

  const deleteUser = (i) => {
    
    const x = users 
    x.splice(i , 1)
    localStorage.setItem('users' , JSON.stringify(x) )
    setToggleRefresh(!toggleRefresh)
  }

  const openEdit = (i) => {
    setEditIndex(i)
    setOpen(true)
    setUser(users[i])
  }

  const toggleRefreshHandler = ()=>{
    setToggleRefresh(!toggleRefresh)
  }

  return (
    <>
      <Navbar/>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' ,justifyContent: 'center' }}>
      {users && users.map((user , i) => (
         <UserCard firstName={user.firstName} lastName={user.lastName} email={user.email} countryCode={user.countryCode} mobile={user.mobile} country={user.country} state={user.state} city={user.city} address1={user.address1} address2={user.address2} zipCode={user.zipCode} deleteUser={deleteUser} editUser={openEdit} i={i} />
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
           <Form data={user} isEdit={true} editIndex={editIndex} toggleRefresh={toggleRefreshHandler} onClose={handleClose} />
         </Box>
        
      </Modal>
    </div>
    </>
  )
}

export default Users