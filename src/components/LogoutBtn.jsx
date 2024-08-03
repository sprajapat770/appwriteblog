import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../services/authManager'
import { logout } from '../store/authSlice' 

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authServices.logout()
        .then(() => dispatch(logout()))
        .catch()
    }
  return (
    <button 
    onClick={logoutHandler}
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn