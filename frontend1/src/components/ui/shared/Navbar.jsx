import React, { useState } from 'react';
import { LogOut, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Logout failed");
      toast.error(error.response?.data?.message || "Logout failed");
    }
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <header className='bg-white shadow w-full'>
      <nav className='flex items-center justify-between mx-auto max-w-5xl h-16 px-4'>
        {/* Logo */}
        <Link to="/">
          <h1 className='text-2xl font-bold'>
            Job<span className='text-[#F83002]'>Hunt</span>
          </h1>
        </Link>

        <div className='flex items-center gap-12'>
          {/* Navigation Links */}
          <ul className='flex font-medium items-center gap-5'>
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className='hover:text-[#F83002]'>Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className='hover:text-[#F83002]'>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className='hover:text-[#F83002]'>Home</Link>
                </li>
                <li>
                  <Link to="/jobs" className='cursor-pointer hover:text-[#F83002]'>Jobs</Link>
                </li>
                <li>
                  <Link to="/browse" className='cursor-pointer hover:text-[#F83002]'>Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Section */}
          {isLoggedIn ? (
            <div className="relative">
              <div
                className="h-10 w-10 rounded-full overflow-hidden cursor-pointer border border-gray-300"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={user?.profile?.profilePhoto || "/default-avatar.png"}
                  alt="User Avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                  <div className="px-3 py-2 border-b">
                    <p className="font-semibold">{user?.fullname || 'Guest User'}</p>
                    <p className="text-sm text-gray-500">{user?.profile?.bio || 'Developer'}</p>
                  </div>
                  {
                    user && user.role === 'student' && (
                      <Link to="/profile">
                        <Button className="flex items-center w-full gap-2 px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 rounded-md">
                          <UserRound className="h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                    )
                  }

                  <Button
                    onClick={logoutHandler}
                    className="flex items-center w-full gap-2 px-4 py-2 mt-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 rounded-md"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link to="/login">
                <Button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
