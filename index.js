import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({});
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// More permissive CORS for development and Vercel deployments
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:5174',
            'https://finaljobportal.onrender.com',
            'https://jobportal-3-dsru.onrender.com',
            'https://finaljob-89d2.onrender.com',
            'https://jobportal-2-8nej.onrender.com',
            'https://jobportalfinal.vercel.app',
            'https://frontend-9wy1.vercel.app',
            'https://frontend-8nhq.vercel.app',
            'https://frontend-u5s7.vercel.app',
            process.env.FRONTEND_URL
        ].filter(Boolean);
        
        // In development, be more permissive
        const isDevelopment = process.env.NODE_ENV !== 'production';
        const isProduction = process.env.NODE_ENV === 'production';
        const isRenderOrigin = origin && origin.includes('.onrender.com');
        const isVercelOrigin = origin && origin.includes('.vercel.app');
        
        // Allow all origins in development, and all Vercel/Render in production
        if (!origin || 
            allowedOrigins.includes(origin) || 
            isDevelopment || 
            (isProduction && (isRenderOrigin || isVercelOrigin))) {
            callback(null, true);
        } else {
            console.log('❌ CORS blocked origin:', origin);
            console.log('🔍 Allowed origins:', allowedOrigins);
            console.log('🔧 Environment:', process.env.NODE_ENV);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}

// Alternative: Allow all origins (use this if above doesn't work)
// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Set-Cookie']
// }

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Connect to database first, then start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();