import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authslice';
import { Button } from '../button';
import { Loader2 } from 'lucide-react';

// Replace with your actual API endpoint
// const USER_API_END_POINT = 'https://your-backend-url.com/api/v1/user'; 

const USER_API_END_POINT = 'http://localhost:3000/api/v1/user';


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { email, password, role } = input;

    if (!email || !password || !role) {
    toast.error("All fields are required.");
    return;
  }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      
      // console.log(res.data.success);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center py-6">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
          <h1 className="font-bold text-2xl text-center mb-6 text-gray-800">Login</h1>

          <form className="space-y-3" onSubmit={submitHandler}>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={input.email}
                name='email'
                onChange={changeEventHandler}
                placeholder="example@mail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={input.password}
                name='password'
                onChange={changeEventHandler}
                placeholder="Your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Role Selection */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">Role</span>
              <div className="flex gap-5 text-sm">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-blue-500"
                  />
                  Student
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-blue-500"
                  />
                  Recruiter
                </label>
              </div>
            </div>

            {
              loading ? <Button className = 'w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
            >
              Login
            </button> 
            }

            {/* Submit Button */}
            
            

            {/* Signup Redirect */}
            <div className="text-sm text-center mt-3">
              Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
