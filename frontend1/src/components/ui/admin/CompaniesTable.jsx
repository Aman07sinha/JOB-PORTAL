import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();


    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
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
                                    filterCompany?.map((company) => (

                                        <TableRow key={company._id}>
                                            <TableCell>
                                                <div className="w-14 h-14 rounded-full overflow-hidden border shadow transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                                                    <img
                                                        src={company.logo || "https://via.placeholder.com/100"}
                                                        alt="Company Logo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className="text-left">
                                                <Popover>
                                                    <PopoverTrigger className="cursor-pointer p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-36 p-2 bg-white shadow-md rounded-md pointer-events-auto">
                                                        <button
                                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
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

export default CompaniesTable