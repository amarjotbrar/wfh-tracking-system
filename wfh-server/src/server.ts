import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from "./routes/main.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

app.use('/', router)

dotenv.config();

async function connectToMongoDB(connectionString: any){
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB.');
}

try {
    await connectToMongoDB(process.env.URI);
} catch (error) {
    console.log("Error connecting to DB: ", error);
}

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
});