import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        // Debug logging (remove in production if needed)
        if (!token) {
            console.log("❌ No token found in cookies");
            console.log("Cookies received:", req.cookies);
            return res.status(401).json({
                message: "User not authenticated. Please login again.",
                success: false,
            })
        }
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        
        if(!decode){
            console.log("❌ Token decode failed");
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log("❌ Authentication error:", error.message);
        return res.status(401).json({
            message: error.name === 'TokenExpiredError' 
                ? "Session expired. Please login again." 
                : "Invalid token. Please login again.",
            success: false
        });
    }
}
export default isAuthenticated;