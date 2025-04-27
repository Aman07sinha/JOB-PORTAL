import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Label } from './label';
import { Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'react-toastify';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: Array.isArray(user?.profile?.skills) ? user.profile.skills.join(', ') : '',
    file: null
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated!");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setOpen(false)}>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md px-6 py-8 my-10 max-h-[calc(100vh-5rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center mb-6">Update Profile</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label htmlFor="fullname">Name</Label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone</Label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="e.g., HTML, CSS, React"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="file">Resume (PDF only)</Label>
            <input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-1 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
