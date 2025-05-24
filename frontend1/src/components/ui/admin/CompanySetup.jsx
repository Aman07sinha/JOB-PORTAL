import React, { useState } from 'react'
import { Button } from '../button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../label'
import { Input } from '@material-tailwind/react'

const CompanySetup = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <form>
                    {/* Back Button and Title */}
                    <div className="mb-6">
                        <Button
                            className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800 transition"
                            variant="ghost"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back</span>
                        </Button>

                        <h1 className="text-2xl font-bold text-gray-800 mt-4">Company Setup</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill out your company details to get started.
                        </p>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Your company name" className="mb-4"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Your company name" className="mb-4"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Your company name" className="mb-4"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Your company name" className="mb-4"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CompanySetup