// 
import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MONGGODB CONNECTED");

    } catch (error){
        console.log("❌ MONGGOBD NOT CONNECTED", error);
        process.exit(1); 
    }
};