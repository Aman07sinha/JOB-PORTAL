import React from 'react'
// import { useSelector } from 'react-redux'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Badge } from 'lucide-react';

const AppliedJobTable = () => {
    // const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3, 4, 5].map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>17-04-2024</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right">
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                        Selected
                                    </span>
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable