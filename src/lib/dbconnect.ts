import mongoose from "mongoose"

    


export const MONGODB_URI = process.env.MONGODB_URI || ""
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

             export const dbconnect = async()=>{
             try {
                await mongoose.connect(MONGODB_URI || "")
                console.log("Database connected successfully");
               return "Database connected successfully"
             } catch (error) {
                throw new Error("Database connection failed")
               console.log(error,"database connection error");
                return error
                
                }
            }