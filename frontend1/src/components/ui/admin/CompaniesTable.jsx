import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
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
                    <TableCell>
                        <div className="w-14 h-14 rounded-full overflow-hidden border shadow transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyctPnCoCLiVzK4P1iQeV_nL2do3K-fASUww&s"
                                alt="Company Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>18-07-2024</TableCell>
                    <TableCell className="text-right">
                        <Popover>
                            <PopoverTrigger className="cursor-pointer p-2 rounded hover:bg-gray-100">
                                <MoreHorizontal className="w-5 h-5" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32 p-2">
                                <div className="flex items-center gap-1 pl-1 pr-2 py-1 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable