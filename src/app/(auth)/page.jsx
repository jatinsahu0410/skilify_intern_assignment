"use client"

import { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { auth } from '@/firebase/config';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log("Res : ", res);
            const user = res.user;
            toast.success('Login successful!');
            router.push('/courses');
        } catch (error) {
            console.error('Error logging in:', error.message);
            switch (error.code) {
                case 'auth/invalid-credential':
                    toast.error('Wrong credential');
                    break;
                case 'auth/wrong-password':
                    toast.error('Incorrect password. Please try again.');
                    break;
                case 'auth/invalid-email':
                    toast.error('Invalid email format.');
                    break;
                default:
                    toast.error('Login failed. Please try again.', error.message);
                    console.error('Error logging in:', error);
                    break;
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-teal-500">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email style={{ color: '#4ade80' }} />
                                    </InputAdornment>
                                ),
                            }}
                            value={email}
                            placeholder='Enter your email address'
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                    fontSize: '1.25rem',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4ade80',
                                },
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock style={{ color: '#4ade80' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <Visibility style={{ color: '#4ade80' }} /> : <VisibilityOff style={{ color: '#4ade80' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            value={password}
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                '& .MuiInputBase-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                    fontSize: '1.25rem',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4ade80',
                                },
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{ backgroundColor: '#4ade80', color: '#1e3a8a' }}
                    >
                        Login
                    </Button>
                </form>
                <p className="mt-4 text-center text-teal-500 hover:text-[#4ade80] hover:scale-105">
                    <Link href="/sign-up">
                        Do not have an account? Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
}
