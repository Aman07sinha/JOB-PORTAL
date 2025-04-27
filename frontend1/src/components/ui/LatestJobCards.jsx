// import { Badge } from 'lucide-react'
import React from 'react'
// import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    // const navigate = useNavigate();
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
                    12 Positions
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-[#F83002] font-semibold">
                    Part Time
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-[#7209b7] font-semibold">
                    24 LPA
                </span>
            </div>
        </div>
    )
}

export default LatestJobCards