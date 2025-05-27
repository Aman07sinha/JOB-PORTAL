import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AdminJobsTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const { allAdminJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();


    useEffect(() => {
        const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchCompanyByText) {
                return true
            };
            return job?.company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterJobs(filteredCompany);
    }, [allAdminJobs, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted Jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !companies || companies.length === 0 ? (<span>You haven't registered any company yet.</span>
                        ) : (
                            <>
                                {
                                    filterJobs?.map((job) => (

                                        <TableRow key={job._id}>
                                            <TableCell>{job?.company?.name}</TableCell>
                                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className="text-left">
                                                <Popover>
                                                    <PopoverTrigger className="cursor-pointer p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-36 p-2 bg-white shadow-md rounded-md pointer-events-auto">
                                                        <button
                                                            onClick={() => navigate(`/admin/companies/${job._id}`)}

                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md bg-transparent hover:bg-gray-100 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-gray-600" />
                                                            <span>Edit</span>
                                                        </button>
                                                    </PopoverContent>
                                                </Popover>


                                            </TableCell>

                                        </TableRow>


                                    ))
                                }

                            </>
                        )
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable