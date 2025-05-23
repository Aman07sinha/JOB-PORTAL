import React, { useState } from 'react'
import { Label } from '../label'
import { Input } from '@material-tailwind/react'
import { Button } from '../button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.success);
                const companyId = res?.data?.company?.id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    } 
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Your Company Name</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        What would you like to name your company? You can always change this later.
                    </p>
                </div>

                <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                    </Label>
                    <Input
                        type="text"
                        placeholder="e.g. JobHunt, Microsoft, Google..."
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-gray-400"
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    {/* Cancel Button - Light Gray/Black Variant */}
                    <Button className="px-5 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-all duration-200" onClick={() => navigate("admin/companies")}>
                        Cancel
                    </Button>

                    {/* Continue Button - Darker Gray Variant */}
                    <Button className="px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-all duration-200" onClick = {registerNewCompany}>
                        Continue
                    </Button>
                </div>

            </div>
        </div>


    )
}

export default CompanyCreate