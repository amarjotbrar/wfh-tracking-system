import mongoose from "mongoose";

const connectToMongoDb = async (connectionString:string) => {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log("Error connecting to DB", error);
    }
}

export default connectToMongoDb;