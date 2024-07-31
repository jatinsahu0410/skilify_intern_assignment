'use client'

import { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, PasswordSharp } from '@mui/icons-material';
import Link from 'next/link';
import { auth } from '@/firebase/config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');


  const router = useRouter();

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    // if (!validatePassword(password)) {
    //   setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
    //   return;
    // }
    // setPasswordError('');

    // create the user 
    try {
      console.log("data: ", email, password);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully:", {res});
      if(res){
        toast.success("User created successfully!");
        router.push('/');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log("Error in SignUp :", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-500">Sign Up</h2>
        <form onSubmit={handleRegister}>
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
            {passwordError && (
              <Typography color="error" className="mt-2">
                {passwordError}
              </Typography>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: '#4ade80', color: '#1e3a8a' }}
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-teal-500 hover:text-[#4ade80] hover:scale-105">
          <Link href="/">
            Already have an Account? Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
