import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../Utils/datauri.js";
import cloudinary from "../Utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    console.log(fullname, email, phoneNumber, password, role);

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing", // ⬅ typo fixed to `message`
        success: false,
      });
    };

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse .secure_url,
      }
    });

    return res.status(201).json({
      message: "Account created successfully..",
      success: true,
    });
  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    // Verify role
    if (role !== user.role) {
      return res.status(403).json({
        message: "Access denied for this role.",
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = {
      userId: user._id,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Prepare user data to return
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    // Send response
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        message: `Welcome back, ${user.fullname}`,
        success: true,
        user: userData,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully..",
      success: true
    })
  } catch (error) {
    console.log(error);

  };
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    const file = req.file;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // ✅ Check if email is changed and unique
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "Email already in use by another account.",
          success: false,
        });
      }
      user.email = email;
    }

    // ✅ Update simple fields
    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills.split(",").map(skill => skill.trim());
    }

    // ✅ Upload resume to Cloudinary if file exists
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: 'resumes',
        resource_type: 'raw', // Very important for PDFs/docs
      });

      if (cloudResponse?.secure_url) {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating the profile.",
      success: false,
    });
  }
};