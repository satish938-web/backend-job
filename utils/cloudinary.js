import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Only configure Cloudinary if credentials are provided
if (process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET) {
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    });
} else {
    console.log("Cloudinary credentials not found. File uploads will be skipped.");
}

export default cloudinary;