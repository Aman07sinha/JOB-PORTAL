// import React from 'react';
// import { Button } from './button';
// import { Bookmark } from 'lucide-react';
// import { Badge } from "../../components/ui/badge"; // adjust the path as needed
// import * as Avatar from '@radix-ui/react-avatar'; // Import everything as Avatar
// import { useNavigate } from 'react-router-dom';

// const Job = {(job)} => {
//     const navigate = useNavigate();
//     const jobId = "ckxbckhdcdsncs";
//     return (
//         <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
//             <div className="flex items-center justify-between">
//                 <p className='text-sm text-gray-500'>2 days ago</p>
//                 <Button variant="outline" className="rounded-full" size="icon">
//                     <Bookmark />
//                 </Button>
//             </div>

//             <div className="flex items-center gap-3 my-4">
//                 <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-500">
//                     <Avatar.Image
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyctPnCoCLiVzK4P1iQeV_nL2do3K-fASUww&s"
//                         alt="Company Logo"
//                         className="w-full h-full object-cover"
//                     />
//                 </Avatar.Root>


//                 <div>
//                     <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//                     <p className="text-sm text-gray-500">India</p>
//                 </div>
//             </div>

//             <div>
//                 <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>

//             <div className="flex items-center gap-2 mt-4">
//                 <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
//                     {job?.position} Positions
//                 </span>
//                 <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-[#F83002] font-semibold">
//                     {job?.jobType}
//                 </span>
//                 <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-[#7209b7] font-semibold">
//                     {job?.salary} LPA
//                 </span>
//             </div>


//             <div className='flex items-center gap-4 mt-4'>
//                 <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
//                 <Button className="bg-[#7209b7]">Save for later</Button>
//             </div>
//         </div>
//     );
// };

// export default Job;

import React from 'react';
import { Button } from './button';
import { Bookmark } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => { // ✅ FIX: Destructure job from props
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/ (1000*24*60*60));
    }

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            {/* Top right time and bookmark */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago` }</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 my-4">
                <Avatar.Root className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-blue-500">
                    <Avatar.Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyctPnCoCLiVzK4P1iQeV_nL2do3K-fASUww&s"
                        alt="Company Logo"
                        className="w-full h-full object-cover"
                    />
                </Avatar.Root>

                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name || "Unknown Company"}</h1>
                    <p className="text-sm text-gray-500">{job?.company?.location || "India"}</p> {/* Optional fallback */}
                </div>
            </div>

            {/* Job title and description */}
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
                <p className="text-sm text-gray-600">{job?.description || "No description available."}</p>
            </div>

            {/* Tags - Position, Type, Salary */}
            <div className="flex items-center flex-wrap gap-2 mt-4">
                {job?.position && (
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
                        12 Positions
                    </span>
                )}
                {job?.jobType && (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-[#F83002] font-semibold">
                        {job.jobType}
                    </span>
                )}
                {job?.salary && (
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-[#7209b7] font-semibold">
                        {job.salary} LPA
                    </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white hover:bg-[#5b0894]">
                    Save for later
                </Button>
            </div>
        </div>
    );
};

export default Job;

