import mongoose from "mongoose"
import { DB_NAME } from "../utils/constants.js"

export const connectToDB = async (req,res) => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DATABASE CONNECTED ! HOST  ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting with database ${error.message}`);
    }

}