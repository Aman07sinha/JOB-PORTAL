import { Job } from "../models/job.model.js";
import mongoose from 'mongoose';


// admin post kre ga job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // ✅ Only validate companyId, since position is now a string
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid ObjectId for companyId",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(',').map(item => item.trim()),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position, // ✅ now it's a string
            company: new mongoose.Types.ObjectId(companyId),
            created_by: new mongoose.Types.ObjectId(userId)
        });

        return res.status(200).json({
            message: "new job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", success: false });
    }
};


// student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },

            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const jobs = await Job.findById(jobId);
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitne job create kre h abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found..",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


