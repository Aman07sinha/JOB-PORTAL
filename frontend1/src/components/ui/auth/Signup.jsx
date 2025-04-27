import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'react-toastify';
import axios from 'axios'; // <-- ✅ ADD THIS LINE
import {useSelector, useDispatch } from 'react-redux';
import { setLoading } from '@/redux/authslice';
import { Button } from '../button';
import { Loader2 } from 'lucide-react';

const Signup = () => {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const {loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ye file ke liye nhi aur sb ke liye h, eg: name, no, pass
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {

      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });
      if(res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex justify-center items-center py-6">
        <div onSubmit={submitHandler} className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
          <h1 className="font-bold text-2xl text-center mb-6 text-gray-800">Signup</h1>

          <form className="space-y-3">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={input.fullname}
                name='fullname'
                onChange={changeEventHandler}
                placeholder="John cena"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input

                type="text"
                value={input.email}
                name='email'
                onChange={changeEventHandler}
                placeholder="example@mail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input

                type="Phone No"
                value={input.phoneNumber}
                name='phoneNumber'
                onChange={changeEventHandler}
                placeholder="+91 98765 43210"
                id="phone"
                // placeholder="+91 98765 43210"
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
                placeholder="••••••••"
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
                    checked={input.role == 'student'}
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
                    checked={input.role == 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-blue-500"
                  />
                  Recruiter
                </label>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="flex items-center gap-2 mb-4 ml-6">
              <label className="text-sm font-medium text-gray-700">Profile Picture</label>
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer text-sm border border-gray-300 rounded-md"
              />
            </div>

            {
              loading ? <Button className = 'w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
            >
              Signup
            </Button> 
            }

            {/* Submit Button
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
            >
              Sign Up
            </button> */}

            {/* Already have account */}
            <div className="text-sm text-center mt-3">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
