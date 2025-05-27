import React, { useEffect, useState } from 'react'
import { Input } from '@material-tailwind/react'
import { Button } from '../button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <div className='max-w-6xl  mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-48 sm:w-64"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick = {() => navigate("/admin/companies/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>

  )
}

export default AdminJobs




