import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../label'
import { Input } from '@material-tailwind/react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        industry: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const chnageFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        formData.append("industry", input.industry);

        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            industry: singleCompany.industry || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 transition-all duration-300">
                {/* Header */}
                <div className="mb-8">
                    <Button onClick={() => navigate("/admin/companies")}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-all"
                        variant="ghost"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </Button>

                    <h1 className="text-3xl font-bold text-gray-800 mt-6">Company Setup</h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Fill out your company details to get started.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label className="text-gray-700 text-sm font-medium mb-1 block">Company Name</Label>
                            <Input
                                type="text"
                                placeholder="e.g. Google"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="w-full text-sm px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700 text-sm font-medium mb-1 block">Industry</Label>
                            <Input
                                type="text"
                                placeholder="e.g. Software, Finance"
                                name="industry"
                                value={input.industry}
                                onChange={changeEventHandler}
                                className="w-full text-sm px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700 text-sm font-medium mb-1 block">Location</Label>
                            <Input
                                type="text"
                                placeholder="e.g. San Francisco, CA"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full text-sm px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700 text-sm font-medium mb-1 block">Website</Label>
                            <Input
                                type="text"
                                placeholder="e.g. https://yourcompany.com"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="w-full text-sm px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium mb-1 block">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={chnageFileHandler}
                                className="w-full text-sm px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-8">
                        <Button
                            type="button"
                            className="px-6 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                        >
                            Cancel
                        </Button>
                        {
                            <Button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </Button>

                        }
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CompanySetup