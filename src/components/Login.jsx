import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux';
import authServices from '../services/authManager';
import { useForm } from 'react-hook-form';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authServices.login(data);
            if(session) {
                const userData = await authServices.getCurrentUser();
                if(userData) {
                    dispatch(login({ userData }));
                    navigate('/');
                }
            }            
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-100'>
        <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
            <div className='flex justify-center mb-6'>
            <span className='block'>
                <Logo width='100%' />
            </span>
            </div>
            <h2 className='text-2xl font-bold text-center mb-4'>
            Sign in to your account
            </h2>
            <p className='text-center text-gray-600 mb-4'>
            Don't have an account?&nbsp;
            <Link to='/signup' className='text-blue-500 hover:underline'>Sign up</Link>
            </p>
            {error && <p className='text-red-600 mt-4 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-6'>
            <div className='space-y-5'>
                <Input 
                label='Email:'
                type='email'
                placeholder="Enter your email"
                {...register('email', 
                    {
                    required: true,
                    validate: {
                        matchPattern: (value) => 
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be valid'
                    }
                    })
                }
                />
                <Input 
                label='Password'
                type='password'
                placeholder="Enter your password"
                {...register('password', { required: true })}
                />
                <Button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600'>
                Sign in
                </Button>
            </div>
            </form>
        </div>
        </div>

  )
}

export default Login