// import React, { useState } from 'react'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import { Button } from './button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Label } from '@radix-ui/react-label'
// import AppliedJobTable from './AppliedJobTable'
// import { useSelector } from 'react-redux'
// import UpdateProfileDialog from './UpdateProfileDialog'

// const Profile = () => {
//     const { user } = useSelector((store) => store.auth)
//     const [open, setOpen] = useState(false);



//     // fallback if user or profile is missing
//     const skills = user?.profile?.skills || ["Html", "Css", "Javascript", "Reactjs"]

//     // const skills = Array.isArray(user?.profile?.skills) ? user.profile.skills : ["Html", "Css", "Javascript", "Reactjs"];

//     const resumeLink = user?.profile?.resume || "https://drive.google.com/file/d/1U3SuizQ28AgnhGfF8FMUNFqLSfqeL-CD/view?usp=drivesdk"
//     const resumeName = user?.profile?.resumeOriginalName || "Resume Link"

//     return (
//         <div>
//             <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
//                 <div className="flex justify-between">
//                     <div className="flex items-center gap-4">
//                         <Avatar className="h-24 w-24">
//                             <AvatarImage
//                                 src={user?.profile?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyctPnCoCLiVzK4P1iQeV_nL2do3K-fASUww&s"}
//                                 alt="profile"
//                             />
//                         </Avatar>

//                         <div>
//                             <h1 className="text-2xl font-semibold text-gray-800 tracking-wide  -mt-1">
//                                 {user?.fullname || "Full Name"}
//                             </h1>

//                             <p>{user?.profile?.bio || "Full Stack Developer"}</p>
//                         </div>
//                     </div>

//                     <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
//                         <Pen />
//                     </Button>

//                 </div>

//                 <div className="my-5">
//                     <div className="flex items-center gap-3 my-2">
//                         <Mail />
//                         <span>{user?.email || "example@gmail.com"}</span>
//                     </div>
//                     <div className="flex items-center gap-3 my-2">
//                         <Contact />
//                         <span>{user?.phoneNumber || "0000000000"}</span>
//                     </div>
//                 </div>

//                 <div className="my-5">
//                     <h1 className="font-semibold text-md mb-2">Skills</h1>
//                     <div className="flex flex-wrap gap-2">
//                         {skills && skills.length > 0 ? (
//                             skills.map((item, index) => (
//                                 <span
//                                     key={index}
//                                     className="inline-block px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full"
//                                 >
//                                     {item}
//                                 </span>
//                             ))
//                         ) : (
//                             <span className="text-black-500">NA</span>
//                         )}
//                     </div>
//                 </div>



//                 <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
//                     <Label className="text-md font-bold">Resume</Label>
//                     {
//                         resumeLink ? (
//                             <a
//                                 href={resumeLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 {user?.profile?.resumeOriginalName}
//                             </a>
//                         ) : (
//                             <span>NA</span>
//                         )
//                     }
//                 </div>
//             </div>

//             <div className="max-w-4xl mx-auto bg-white rounded-2xl">
//                 <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
//                 <AppliedJobTable />
//             </div>
//             <UpdateProfileDialog open={open} setOpen={setOpen} />
//         </div>
//     )
// }

// export default Profile

import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import AppliedJobTable from './AppliedJobTable';
import { useSelector } from 'react-redux';
import UpdateProfileDialog from './UpdateProfileDialog';

const Profile = () => {
    const { user } = useSelector((store) => store.auth);
    const [open, setOpen] = useState(false);

    const skills = user?.profile?.skills || ['Html', 'Css', 'Javascript', 'Reactjs'];
    const resumeLink = user?.profile?.resume || '';
    const resumeName = user?.profile?.resumeOriginalName || 'Resume Link';

    return (
        <div>
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src={
                                    user?.profile?.avatar ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyctPnCoCLiVzK4P1iQeV_nL2do3K-fASUww&s'
                                }
                                alt="profile"
                            />
                        </Avatar>

                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 tracking-wide -mt-1">
                                {user?.fullname || 'Full Name'}
                            </h1>
                            <p>{user?.profile?.bio || 'Full Stack Developer'}</p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen />
                    </Button>
                </div>

                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email || 'example@gmail.com'}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber || '0000000000'}</span>
                    </div>
                </div>

                <div className="my-5">
                    <h1 className="font-semibold text-md mb-2">Skills</h1>
                    <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                            skills.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-block px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full"
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <span className="text-black-500">NA</span>
                        )}
                    </div>
                </div>


                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                    <Label className="text-md font-bold">Resume</Label>
                    {resumeLink ? (
                        <a
                            href={resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {resumeName}
                        </a>
                    ) : (
                        <span className="text-gray-500">No resume uploaded</span>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
