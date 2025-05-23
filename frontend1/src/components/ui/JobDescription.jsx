// import React, { useEffect, useState } from 'react'
// import { Button } from './button'
// import { useParams } from 'react-router-dom';
// // import useGetSingleJob from '@/hooks/useGetSingleJob';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const JobDescription = () => {
//     const {singleJob} = useSelector(store=>store.job);
//     const {user} = useSelector(store=>store.auth);
//     const isInitiallyApplied = singleJob?.applications?.some(application=>application.applicant == user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isInitiallyApplied);

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}` ,{withCredentials:true});
//             console.log(res.data);
//             if(res.data.success) {
//                 // update the local host
//                 setIsApplied(true); 
//                 const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}

//                 // helps us to real time UI update
//                 dispatch(setSingleJob(updatedSingleJob))
//                 toast.success(res.data.success);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }
    
//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
//                 if(res.data.success) {
//                     dispatch(setSingleJob(res.data.jobs));
//                     setIsApplied(res.data.job.applications.some(application=>application.applicant == user?.id))
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob();
//     },[jobId, dispatch, user?.id]);
  

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//                     <div className="flex items-center gap-2 mt-4">
//                         <span className="px-2 py-1 text-sm font-bold text-blue-700 bg-blue-100 rounded-full">
//                         12 Positions
//                         </span>
//                         <span className="px-2 py-1 text-sm font-bold text-[#F83002] bg-red-100 rounded-full">
//                         {singleJob?.jobType}
//                         </span>
//                         <span className="px-2 py-1 text-sm font-bold text-[#7209b7] bg-purple-100 rounded-full">
//                         {singleJob?.salary}LPA
//                         </span>
//                     </div>
//                 </div>

//                 <Button
//                     onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>

//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>

//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>

//                 <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>

//                 <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>

//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>

//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>

//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription

// import React, { useEffect, useState } from 'react';
// import { Button } from './button';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const JobDescription = () => {
//   const { singleJob } = useSelector(store => store.job);
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();
//   const { id: jobId } = useParams();

//   const [isApplied, setIsApplied] = useState(false);

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job)); // ✅ fixed from res.data.jobs
//           const alreadyApplied = res.data.job.applications.some(application => application.applicant === user?._id);
//           setIsApplied(alreadyApplied);
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load job details.");
//       }
//     };

//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
//       if (res.data.success) {
//         setIsApplied(true);
//         const updatedSingleJob = {
//           ...singleJob,
//           applications: [...(singleJob.applications || []), { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updatedSingleJob));
//         toast.success(res.data.success);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className='max-w-7xl mx-auto my-10'>
//       <div className='flex items-center justify-between'>
//         <div>
//           <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//           <div className="flex items-center gap-2 mt-4">
//             <span className="px-2 py-1 text-sm font-bold text-blue-700 bg-blue-100 rounded-full">
//               12 Positions
//             </span>
//             <span className="px-2 py-1 text-sm font-bold text-[#F83002] bg-red-100 rounded-full">
//               {singleJob?.jobType}
//             </span>
//             <span className="px-2 py-1 text-sm font-bold text-[#7209b7] bg-purple-100 rounded-full">
//               {singleJob?.salary} LPA
//             </span>
//           </div>
//         </div>

//         <Button
//           onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//           {isApplied ? 'Already Applied' : 'Apply Now'}
//         </Button>
//       </div>

//       <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//       <div className='my-4 space-y-2'>
//         <h1 className='font-bold'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title || '-'}</span></h1>
//         <h1 className='font-bold'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location || '-'}</span></h1>
//         <h1 className='font-bold'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description || '-'}</span></h1>
//         <h1 className='font-bold'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience || 0} yrs</span></h1>
//         <h1 className='font-bold'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary || '-'} LPA</span></h1>
//         <h1 className='font-bold'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
//         <h1 className='font-bold'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0] || '-'}</span></h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;



import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  useEffect(() => {
    // Check whenever job or user changes
    if (singleJob && user?._id) {
      const alreadyApplied = singleJob.applications?.some(application => {
        return application?.applicant === user._id || application?.applicant?._id === user._id;
      });
      setIsApplied(alreadyApplied);
    }
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.success);
        const updatedApplications = [...(singleJob.applications || []), { applicant: user._id }];
        dispatch(setSingleJob({ ...singleJob, applications: updatedApplications }));
        setIsApplied(true); // ✅ immediately update the state
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <span className="px-2 py-1 text-sm font-bold text-blue-700 bg-blue-100 rounded-full">
              12 Positions
            </span>
            <span className="px-2 py-1 text-sm font-bold text-[#F83002] bg-red-100 rounded-full">
              {singleJob?.jobType}
            </span>
            <span className="px-2 py-1 text-sm font-bold text-[#7209b7] bg-purple-100 rounded-full">
              {singleJob?.salary} LPA
            </span>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4 space-y-2'>
        <h1 className='font-bold'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title || '-'}</span></h1>
        <h1 className='font-bold'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location || '-'}</span></h1>
        <h1 className='font-bold'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description || '-'}</span></h1>
        <h1 className='font-bold'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience || 0} yrs</span></h1>
        <h1 className='font-bold'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary || '-'} LPA</span></h1>
        <h1 className='font-bold'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
        <h1 className='font-bold'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0] || '-'}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
