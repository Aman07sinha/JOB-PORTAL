// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./Utils/db.js";
// import userRoute from "./routes/user.route.js";
// dotenv.config({});
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";



// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());


// app.use(cors({
//     origin: "http://localhost:5173",  // allow your frontend origin
//     credentials: true                // allow cookies (important for auth)
//   }));

// const PORT = process.env.PORT || 3000;

// app.use("/api/v1/user",userRoute);
// app.use("/api/v1/company",companyRoute);
// app.use("/api/v1/job",jobRoute);
// app.use("/api/v1/application",applicationRoute);





// // http://localhost:8000/apiv1/user/register
// // http://localhost:8000/apiv1/user/login
// // http://localhost:8000/apiv1/user/profile/update


// app.listen(PORT,() =>  {
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// }) 


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from 'url';

import connectDB from "./Utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORRECT CORS SETUP
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

