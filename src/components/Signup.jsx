import React, { useState } from 'react'
import authServices from '../services/authManager'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { login } from '../store/authSlice';
import { Input, Button, Logo } from './index'
import { useDispatch } from 'react-redux';
function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const create= async(data) => {
        setError('')
        try {
            const userData = await authServices.createAccount(data)
            if(userData) {  
                const userData = await authServices.getCurrentUser();
                if(userData) {
                    dispatch(login({ userData }))
                    navigate('/')
                }
            }
        } catch (e) {
            setError(e.message)
        }

    }
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="mb-4 flex justify-center">
            <span className="inline-block w-24">
                <Logo width="100%" />
            </span>
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Sign up to create an account
            </h2>
            <p className="text-center text-base text-gray-600 mb-6">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-blue-500 transition-colors duration-200 hover:underline"
            >
                Sign In
            </Link>
            </p>
            {error && <p className="text-red-600 text-center mb-6">{error}</p>}
            <form onSubmit={handleSubmit(create)} className="space-y-5">
            <Input
                label="Full Name:"
                placeholder="Enter your full name"
                {...register("name", { required: true })}
            />
            <Input
                label="Email:"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                required: true,
                validate: {
                    matchPattern: (value) => 
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
                })}
            />
            <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
            />
            <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
                Create Account
            </Button>
            </form>
        </div>
    </div>
  )
}

export default Signup